import { Request, Response } from 'express';
import { Controller } from './controller';
import { AuthService } from '../model/services/auth.service';
import { ValidateMiddleware } from '../middleware/middleware';
import { IAuth } from '@Shared/types';

export class AuthController extends Controller {

    constructor(private authService: AuthService) {
        super();

        this.authService = authService;

        this.bindRoutes([
            {
                routerPath: '/register',
                method: 'post',
                fn: this.register,
                middleware: [new ValidateMiddleware()],
            },
            {
                routerPath: '/login',
                method: 'post',
                fn: this.login,
                middleware: [new ValidateMiddleware()],
            }
        ]);
    }

    private async register(req: Request<object, object, IAuth>, res: Response) {
        res.send(await this.authService.registerUser(req.body));
    }

    private async login(req: Request<object, object, IAuth>, res: Response) {
        res.send(await this.authService.loginUser(req.body));
    }
}