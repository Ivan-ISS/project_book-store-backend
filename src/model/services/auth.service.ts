import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { AuthRepository } from '../repositories/auth.repository';
import { /* JwtPayload */ IAuth } from '@Shared/types';

export class AuthService {

    constructor(private authRepository: AuthRepository) {

        this.authRepository = authRepository;
    }

    public async registerUser(authDate: IAuth) {
        const salt = process.env.SALT as string;
        const hash = crypto.pbkdf2Sync(authDate.password, salt, 100000, 512, 'sha512').toString('base64');
        authDate.password = hash;

        let dataToken;
        await jwt.sign({ 
            email: authDate.username,
            password: authDate.password,
            iat: Math.floor(Date.now() / 1000) 
        }, process.env.JWTSECRET as string, (err: unknown, token: unknown) => {
            dataToken = token;
        });

        console.log('authData: ', authDate);
        console.log('token out: ', dataToken);

        const { status, message } = await this.authRepository.registerUser();

        return { status, message, data: dataToken };
    }

    public async loginUser(authDate: IAuth) {
        const salt = process.env.SALT as string;
        const hashedProvidedPassword = crypto.pbkdf2Sync(authDate.password, salt, 10000, 512, 'sha512').toString('base64');

        const { status, message, data } = await this.authRepository.loginUser();
        
        let dataToken;
        if (data.password === hashedProvidedPassword) {
            await jwt.sign({ 
                email: authDate.username,
                password: authDate.password,
                iat: Math.floor(Date.now() / 1000) 
            }, process.env.JWTSECRET as string, (err: unknown, token: unknown) => {
                dataToken = token;
            });
        }

        console.log('authData: ', authDate);
        console.log('token out: ', dataToken);

        return { status, message, data: dataToken };
    }
}