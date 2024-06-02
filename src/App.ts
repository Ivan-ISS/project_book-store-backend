import express, { Express } from 'express';
import { json } from 'body-parser';
import { BooksRouter } from './api/books-api';
import { BooksController } from './controllers/books.controller';

export class App {
    private app: Express;
    private readonly port: number;
    private readonly host: string;
    private booksRouter: BooksRouter;

    constructor(private booksController: BooksController) {
        this.app = express();
        this.port = Number(process.env.APP_PORT) || 3000;
        this.host = process.env.APP_HOST || 'localhost';
        this.booksRouter = new BooksRouter();
        this.booksController = booksController;
    }

    private configureRoutes() {
        //this.app.use('/api/v1', this.booksRouter.router);
        this.app.use('/api/v1', this.booksController.router);
    }

    public async run() {
        this.app.use(json());
        this.configureRoutes();
        this.app.listen(this.port, this.host, () => {
            console.log(`Приложение запущено на порту ${this.port}`);
        });
    }
}