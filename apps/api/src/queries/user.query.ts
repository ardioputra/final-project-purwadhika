import { User } from '@/interfaces/user.interface';
import prisma from '@/prisma';

export class UserQueries {
  async getUserByEmailOrUsername(username: string, email: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email },
            {
              username: username,
            },
          ],
        },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  public getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (e) {
      throw e;
    }
  };
}
