import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IMiddleware } from '../controllers/controller';
// import { JwtPayload } from '@Shared/types';

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

        const isEmailValid = username.includes('@');
        const isPasswordValid = password.length >= 6;

        if (!username || !password) {
            res.status(422).send({ error: 'No username or password' });
            return;
        } else if (!isEmailValid) {
            res.status(422).send({ error: 'Email is not valid' });
            return;
        } else if (!isPasswordValid) {
            res.status(422).send({ error: 'Your password must be at least 6 characters long' });
            return;
        }

        next();
    }
}

export class AuthMiddleware extends Middleware {
    public handle(req: Request, res: Response, next: NextFunction) {
        let token;
        if (typeof req.headers.Authorization === 'string') {
            token = req.headers.Authorization.split(' ')[1];
        }
        if (token && process.env.JWTSECRET) {
            verify(token, process.env.JWTSECRET, (err: unknown, payload: unknown) => {
                if (err) {
                    res.status(401).send({ error: true });
                } else {
                    req.body.jwtPayload = payload;
                    next();
                }
            });
        } else {
            res.status(401).send({ error: true });
        }
    }
}