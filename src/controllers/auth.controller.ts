import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Controller } from './controller';
import { AuthService } from '../model/services/auth.service';
import { ValidateMiddleware, LoggerMiddleware } from '../middleware/middleware';
import { IUser, BookAddToCart } from '@Shared/types';

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
            },
            {
                routerPath: '/add-to-cart',
                method: 'post',
                fn: this.addToCart,
                middleware: [new LoggerMiddleware()],
            },
            {
                routerPath: '/books/:id',
                method: 'get',
                fn: this.getBooks,
                middleware: [new LoggerMiddleware()],
            },
            {
                routerPath: '/:id',
                method: 'put',
                fn: this.editUser,
                middleware: [new LoggerMiddleware()],
            },
            {
                routerPath: '/:id',
                method: 'delete',
                fn: this.removeUser,
                middleware: [new LoggerMiddleware()],
            }
        ]);
    }

    private throwServerError(res: Response, e: Error) {
        console.debug(e.message);
        res.status(500);
        res.send('Something went wrong');
    }

    private async register(req: Request<object, object, IUser>, res: Response) {
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

    private async login(req: Request<object, object, IUser>, res: Response) {
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

    private async addToCart(req: Request<object, object, BookAddToCart>, res: Response) {
        try {

            const { status, message } = await this.authService.addToCart(req.body);

            res.status(status);
            res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }

    private async getBooks(req: Request<ParamsDictionary>, res: Response) {
        try {

            const { status, message, data } = await this.authService.getBooks(req.params.id);

            res.status(status);
            data ? res.send(data)
            : message && res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }

    private async editUser(req: Request<ParamsDictionary, object, IUser>, res: Response) {
        try {

            const { status, message } = await this.authService.editUser(req.params.id, req.body);

            res.status(status);
            res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }

    private async removeUser(req: Request<ParamsDictionary>, res: Response) {

        try {
            const { status, message } = await this.authService.removeUser(req.params.id);

            res.status(status);
            res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }
}