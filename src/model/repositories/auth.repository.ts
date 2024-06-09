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

    public async getBooks(userId: string | number) {

        const validationId = isNaN(Number(userId));
        if (validationId) {
            return { status: 400, message: `Id ${userId} is not a number` };
        }

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

    public async editUser(userId: string | number, userData: IUser) {

        const validationId = isNaN(Number(userId));
        if (validationId) {
            return { status: 400, message: `Id ${userId} is not a number` };
        }

        const user = await this.dbService.client.user.findUnique({
            where: {
                id: Number(userId),
            },
        });
        
        if (!user) {
            return { status: 404, message: `User with id: ${userId} is not found`, data: null };
        }
    
        await this.dbService.client.user.update({
            where: {
                id: Number(userId),
            },
            data: {
                name: userData.name || user.name,
                description: userData.description || user.description,
            },
        });
    
        return { status: 200, message: 'User details have been updated' };
    }

    public async removeUser(userId: string | number) {

        const validationId = isNaN(Number(userId));
        if (validationId) {
            return {status: 400, message: `Id ${userId} is not a number`, data: null};
        }

        const existingBook = await this.dbService.client.user.findUnique({
            where: { id: Number(userId) },
        });

        if (!existingBook) {
            return { status: 404, message: `Book with id: ${userId} is not found`, data: null };
        }

        await this.dbService.client.user_Books.deleteMany({
            where: { userId: Number(userId) },
        });

        await this.dbService.client.rating.deleteMany({
            where: { userId: Number(userId) },
        });

        await this.dbService.client.user.delete({
            where: { id: Number(userId) },
        });

        return { status: 200, message: `User with id: ${userId} has been deleted` };
    }
}