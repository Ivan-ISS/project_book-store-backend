import { Request, Response, NextFunction } from 'express';
/* import { verify } from 'jsonwebtoken'; */
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

export class ValidateMiddleware extends Middleware {
    public handle(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(422).send({ error: 'No username or password' });
        }

        next();
    }
}

/* export class AuthMiddleware extends Middleware {
    public handle(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.Authorization.split(' ')[1];
        verify(token, process.env.JWTSECRET, (err, payload) => {
            if (err) {
                res.status(401).send({ error: true });
            } else {
                req.jwtPayload = payload;
                next();
            }
        });
    }
} */