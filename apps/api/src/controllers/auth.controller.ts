import { AuthActions } from '@/actions/auth.action';
import { Container, Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { Auth } from '@/interfaces/auth.interface';

@Service()
export class AuthControllers {
  authAction = Container.get(AuthActions);

  public registerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newUser = await this.authAction.registerAction(req.body);

      res.status(200).json({
        message: 'Register Success, please check email for verification',
        data: newUser,
      });
    } catch (err) {
      next(err);
    }
  };

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
