import { AuthActions } from '@/actions/auth.action';
import { Container, Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';

@Service()
export class AuthControllers {
  authAction = Container.get(AuthActions);

  public loginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.authAction.loginAction(req.body);
      res.status(200).json({
        message: `Login success!, Welcome ${data.user.name}`,
        data: data,
      });
    } catch (e) {
      next(e);
    }
  };
}
