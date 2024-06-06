import { Request, Response/* , NextFunction */ } from 'express';
// import { Book } from '@prisma/client';
import { Controller } from './controller';
import { BooksService } from '../model/services/books.service';
import { LoggerMiddleware } from '../middleware/middleware';
import { IBookSearchFilter, IBook } from '@Shared/types';
//import { booksPlaceholder } from '../api/books-api';
import { ParamsDictionary } from 'express-serve-static-core';

export class BooksController extends Controller {

    constructor(private booksService: BooksService) {
        super();

        this.booksService = booksService;

        this.bindRoutes([
            {
                routerPath: '/books',
                method: 'get',
                fn: this.getBooks,
                middleware: [new LoggerMiddleware]
            },
            {
                routerPath: '/books',
                method: 'post',
                fn: this.createBook,
                middleware: [new LoggerMiddleware]
            },
            {
                routerPath: '/books/:id',
                method: 'put',
                fn: this.editBook,
                middleware: [new LoggerMiddleware]
            },
        ]);
    }

    private throwServerError(res: Response, e: Error) {
        console.debug(e.message);
        res.status(500);
        res.send('Something went wrong');
    }

    private async getBooks(req: Request<object, object, object, IBookSearchFilter>, res: Response/* , next: NextFunction */) {
        try {
            res.status(200);
            res.send(await this.booksService.getBooks(req.query));
            // res.send(booksPlaceholder);
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }

    private async createBook(req: Request<object, object, IBook>, res: Response/* , next: NextFunction */) {
        
        try {
            const { status, message, data } = await this.booksService.createBook(req.body);

            res.status(status);
            data ? res.send(data)
            : message && res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }

    private async editBook(req: Request<ParamsDictionary, object, IBook>, res: Response/* , next: NextFunction */) {
        
        try {
            const { status, message, data } = await this.booksService.editBook(req.params.id, req.body);

            res.status(status);
            data ? res.send(data)
            : message && res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }
}