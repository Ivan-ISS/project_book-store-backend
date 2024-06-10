import express, { Express } from 'express';
import { json } from 'body-parser';
// import { BooksRouter } from './api/books-api';                   // --- это первый пример для запуска роутера из папки api
import { BooksController } from './controllers/books.controller';
import { AuthController } from './controllers/auth.controller';
import { CategoriesController } from './controllers/categories.controller';
import { RatingController } from './controllers/rating.controller';

export class App {
    private app: Express;
    private readonly port: number;
    private readonly host: string;
    // private booksRouter: BooksRouter;                            // --- это первый пример для запуска роутера из папки api

    constructor(
            private booksController: BooksController,
            private authController: AuthController,
            private categoriesController: CategoriesController,
            private ratingController: RatingController,
        ) {
        this.app = express();
        this.port = Number(process.env.APP_PORT) || 3000;
        this.host = process.env.APP_HOST || 'localhost';
        // this.booksRouter = new BooksRouter();                    // --- это первый пример для запуска роутера из папки api
        this.booksController = booksController;
        this.authController = authController;
        this.categoriesController = categoriesController;
        this.ratingController = ratingController;
    }

    private configureRoutes() {
        // this.app.use('/api/v1', this.booksRouter.router);        // --- это первый пример для запуска роутера из папки api
        this.app.use('/api/v1/books', this.booksController.router);
        this.app.use('/api/v1/categories', this.categoriesController.router);
        this.app.use('/api/v1/user', this.authController.router);
        this.app.use('/api/v1/rating', this.ratingController.router);
    }

    public async run() {
        this.app.use(json());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        this.configureRoutes();
        this.app.listen(this.port, this.host, () => {
            console.log(`Приложение запущено на порту ${this.port}`);
        });
    }
}