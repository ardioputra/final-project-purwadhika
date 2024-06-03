import { Container, Service } from 'typedi';
import { AuthQueries } from '@/queries/auth.query';
import { UserQueries } from '@/queries/user.query';
import { Auth } from '@/interfaces/auth.interface';
import { httpException } from '@/exceptions/http.exception';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { API_KEY } from '@/config';

@Service()
export class AuthActions {
  authQuery = Container.get(AuthQueries);
  userQuery = Container.get(UserQueries);

  public loginAction = async (data: Auth) => {
    try {
      const user = await this.userQuery.getUserByEmailOrUsername(
        data.email,
        data.username,
      );
      if (!user)
        throw new httpException(500, "Email or Username doesn't exist!");

      const isValid = await compare(data.password, user.password);
      if (!isValid) throw new httpException(500, 'Password incorrect!');

      if (!user.verified)
        throw new httpException(
          500,
          "Your account isn't verified yet, Please check your email!",
        );

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: user.role_id,
      };

      const token = sign(payload, String(API_KEY), { expiresIn: '1h' });
      return { user, token };
    } catch (e) {
      throw e;
    }
  };
}
