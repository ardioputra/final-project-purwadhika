import { Auth } from '@/interfaces/auth.interface';
import prisma from '@/prisma';

export class AuthQueries {
  public async loginQuery(data: Auth) {
    try {
      let login = await prisma.user.findUnique({
        select: {
          id: true,
          username: true,
          email: true,
          role_id: true,
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
            role_id: true,
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
