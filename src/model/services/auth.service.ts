import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { AuthRepository } from '../repositories/auth.repository';
import { /* JwtPayload */ IUser } from '@Shared/types';

export class AuthService {

    constructor(private authRepository: AuthRepository) {

        this.authRepository = authRepository;
    }

    public async registerUser(authDate: IUser) {
        const salt = process.env.SALT as string;
        console.log('salt register: ', salt);
        const hash = crypto.pbkdf2Sync(authDate.password, salt, 100000, 512, 'sha512').toString('base64');

        authDate.password = hash;

        let dataToken;
        await jwt.sign({ 
            email: authDate.email,
            password: authDate.password,
            iat: Math.floor(Date.now() / 1000) 
        }, process.env.JWTSECRET as string, (err: unknown, token: unknown) => {
            dataToken = token;
        });

        const { status, message } = await this.authRepository.createUser(authDate);

        // console.log('authData: ', authDate);
        console.log('token register: ', dataToken);

        return { status, message, data: status === 201 ? dataToken : null };
    }

    public async loginUser(authDate: IUser) {
        const salt = process.env.SALT as string;
        console.log('salt login: ', salt);
        const hashedProvidedPassword = crypto.pbkdf2Sync(authDate.password, salt, 100000, 512, 'sha512').toString('base64');
        
        let dataToken;
        await jwt.sign({ 
            email: authDate.email,
            password: authDate.password,
            iat: Math.floor(Date.now() / 1000) 
        }, process.env.JWTSECRET as string, (err: unknown, token: unknown) => {
            dataToken = token;
        });

        const { status, message, data } = await this.authRepository.getUser(authDate);

        console.log('authData: ', authDate);
        console.log('token login: ', dataToken);
        console.log(data?.password === hashedProvidedPassword);

        return { status, message, data: data?.password === hashedProvidedPassword ? dataToken : null };
    }
}