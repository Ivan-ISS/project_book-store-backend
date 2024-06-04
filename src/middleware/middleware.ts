import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../controllers/controller';

export abstract class Middleware implements IMiddleware {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public handle(req: Request, res: Response, next: NextFunction) { }
}

export class LoggerMiddleware extends Middleware {
    constructor() {
        super();
    }

    public handle(req: Request, res: Response, next: NextFunction) {
        console.log('Method: ', req.method, ' Path: ', req.path);

        next();
    }
}