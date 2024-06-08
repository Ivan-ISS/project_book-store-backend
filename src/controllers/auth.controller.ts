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

    private throwServerError(res: Response, e: Error) {
        console.debug(e.message);
        res.status(500);
        res.send('Something went wrong');
    }

    private async register(req: Request<object, object, IAuth>, res: Response) {
        try {
            const { status, message, data } = await this.authService.registerUser(req.body);

            res.status(status);
            data ? res.send(data)
            : message && res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }

    private async login(req: Request<object, object, IAuth>, res: Response) {
        try {
            const { status, message, data } = await this.authService.loginUser(req.body);

            res.status(status);
            data ? res.send(data)
            : message && res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }
}