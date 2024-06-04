import { Router, Request, Response, NextFunction } from 'express';

export interface IMiddleware {
    handle: (req: Request, res: Response, next: NextFunction) => void
}

interface ControllerRouter {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    routerPath: string;
    fn: (req: Request, res: Response, next: NextFunction) => void;
    middleware: IMiddleware[];
}

export class Controller {
    private _router: Router;

    constructor() {
        this._router = Router();
    }

    protected bindRoutes(routes: ControllerRouter[]) {
        routes.forEach((route) => {
            const ctxHandler = route.fn.bind(this);

            const routeHandlers = route.middleware && [...route.middleware.map((m) => m.handle), ctxHandler];

            this._router[route.method ?? 'get'](route.routerPath, routeHandlers);
        });
    }

    get router() {
        return this._router;
    }
}