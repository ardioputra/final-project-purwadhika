import { Auth } from '@/interfaces/auth.interface';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { transporter } from '@/helpers/nodemailer';
import * as handlebars from 'handlebars';
import path from 'path';
import { FE_URL, API_KEY } from '@/config';
import fs from 'fs';
import { sign } from 'jsonwebtoken';

export class AuthQueries {
  private sendRegistrationEmail = async (data: User) => {
    try {
      const payload = {
        email: data.email,
        // isVerified: data.isVerified,
      };
      const token = sign(payload, String(API_KEY), { expiresIn: '1hr' });
      const urlVerify = `${FE_URL}/verify?token=${token}`;
      const templatePath = path.join(
        __dirname,
        '../templates',
        'registrationEmail.hbs',
      );
      console.log(templatePath);
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({
        email: data.email,
        // url: urlVerify,
      });
      console.log('email terkirim!');
      await transporter.sendMail({
        from: 'Cheery Fresh',
        to: data.email,
        subject: 'Please verified before login!',
        html,
      });
    } catch (e) {
      throw e;
    }
  };

  public registerQuery = async (email: string) => {
    try {
      const t = await prisma.$transaction(async (prisma) => {
        try {
          const user = await prisma.user.create({
            data: {
              email,
            },
          });

          await this.sendRegistrationEmail(user);

          return user;
        } catch (err) {
          throw err;
        }
      });

      return t;
    } catch (err) {
      throw err;
    }
  };

  public async loginQuery(data: Auth) {
    try {
      let login = await prisma.user.findUnique({
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
        where: {
          email: data.email,
          password: data.password,
        },
      });

      if (!login) {
        login = await prisma.user.findUnique({
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
          },
          where: {
            username: data.username,
            password: data.password,
          },
        });
      }

      return login;
    } catch (e) {
      throw e;
    }
  }
}
