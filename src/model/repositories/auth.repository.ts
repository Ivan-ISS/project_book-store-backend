import { DBService } from '../../db/dbService';
import { IUser } from '@Shared/types';

export class AuthRepository {
    constructor(private dbService: DBService) {
        this.dbService = dbService;
    }

    public async createUser(authDate: IUser) {

        const user = await this.dbService.client.user.findFirst({
            where: {
                email: authDate.email,
            },
        });

        if (user) {
            return { status: 400, message: `A user with this login: ${authDate.email} already exists`, data: null };
        }

        await this.dbService.client.user.create({
            data: {
                email: authDate.email,
                password: authDate.password,
            }
        });

        return { status: 201, message: null };
    }

    public async getUser(authDate: IUser) {

        const user = await this.dbService.client.user.findFirst({
            where: {
                email: authDate.email,
            },
        });

        if (!user) {
            return { status: 404, message: `Currency with name: ${authDate.email} is not found in database`, data: null };
        }

        return { status: 200, message: null, data: { password: user.password, email: user.email } };
    }
}