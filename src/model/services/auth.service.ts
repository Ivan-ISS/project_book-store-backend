import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { AuthRepository } from '../repositories/auth.repository';
import { /* JwtPayload */ IUser, BookAddToCart } from '@Shared/types';

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

        const { status, message, data } = await this.authRepository.createUser(authDate);

        // console.log('authData: ', authDate);
        console.log('token register: ', dataToken);

        return { status, message, data: status === 201 ? { ...data, token: dataToken } : null };
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

        if (status === 404) {
            return { status, message, data };
        }

        if (data?.password !== hashedProvidedPassword) {
            return { status: 401, message:'Incorrect password entered', data: null };
        }
        return { status, message, data: { ...data, token: dataToken } };
    }

    public async addToCart(bookData: BookAddToCart) {
        const { status, message } = await this.authRepository.addToCart(bookData);
        return { status, message };
    }

    public async getBooks(userId: string | number) {
        const { status, message, data } = await this.authRepository.getBooks(userId);
        return { status, message, data };
    }

    public async editUser(userId: string | number, userData: IUser) {
        const { status, message } = await this.authRepository.editUser(userId, userData);
        return { status, message };
    }

    public async removeUser(userId: string | number) {
        const { status, message } = await this.authRepository.removeUser(userId);
        return { status, message };
    }
}