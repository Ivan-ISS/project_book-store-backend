import { Router, Request, Response, NextFunction } from 'express';

interface ControllerRouter {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    routerPath: string;
    fn: (req: Request, res: Response, next: NextFunction) => void;
}

export class Controller {
    private _router: Router;

    constructor() {
        this._router = Router();
    }

    protected bindRoutes(routes: ControllerRouter[]) {
        routes.forEach((route) => {
            const ctxHandler = route.fn.bind(this);

            this._router[route.method ?? 'get'](route.routerPath, ctxHandler);
        });
    }

    get router() {
        return this._router;
    }
}