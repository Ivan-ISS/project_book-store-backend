import { DBService } from '../../db/dbService';
import { IUser, BookAddToCart } from '@Shared/types';

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
            return { status: 400, message: `A user with this email: ${authDate.email} already exists`, data: null };
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
            include: {
                books: {
                    include: {
                        book: true
                    }
                }
            },
            where: {
                email: authDate.email,
            },
        });

        if (!user) {
            return { status: 404, message: `User with email: ${authDate.email} does not exist`, data: null };
        }

        return { status: 200, message: null, data: user };
    }

    public async addToCart(bookData: BookAddToCart) {

        await this.dbService.client.user_Books.create({
            data: {
                bookId: bookData[0],
                userId: bookData[1],
            },
        });

        return { status: 201, message: 'Book has been added to cart' };
    }

    public async getBooks(userId: string) {
        const user = await this.dbService.client.user_Books.findMany({
            include: {
                book: {
                    include: {
                        currency: true,
                    }
                },
            },
            where: {
                userId: Number(userId),
            },
        });

        return {status: 201, message: null, data: user};
    }
}