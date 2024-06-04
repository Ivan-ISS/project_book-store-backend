import { Request, Response/* , NextFunction */ } from 'express';
import { Controller } from './controller';
import { BooksService } from '../model/services/books.service';
import { LoggerMiddleware } from '../middleware/middleware';
//import { booksPlaceholder } from '../api/books-api';

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
            }
        ]);
    }

    private async getBooks(req: Request, res: Response/* , next: NextFunction */) {
        res.status(200);
        res.send(await this.booksService.getBooks());
        // res.send(booksPlaceholder);
    }
}