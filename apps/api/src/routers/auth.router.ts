import { AuthControllers } from '@/controllers/auth.controller';
import { Container, Service } from 'typedi';
import { Router } from 'express';

@Service()
export class AuthRouter {
  authController = Container.get(AuthControllers);

  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.authController.registerController);
    this.router.post('/login', this.authController.loginController);
  }

  getRouter(): Router {
    return this.router;
  }
}
