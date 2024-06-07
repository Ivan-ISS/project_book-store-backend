import * as jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/auth.repository';
import { /* JwtPayload */ IAuth } from '@Shared/types';

export class AuthService {

    constructor(private authRepository: AuthRepository) {

        this.authRepository = authRepository;
    }

    public async registerUser(authDate: IAuth) {
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

        console.log('authData: ', authDate);

        const { status, message } = await this.authRepository.loginUser();

        return { status, message, data: dataToken };
    }
}