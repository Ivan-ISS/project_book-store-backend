import { Router, Request, Response } from 'express';
import { IBook } from '@Shared/types';

const booksPlaceholder: IBook[] = [
    {
        name: 'myBook',
    },
    {
        name: 'yourBook',
    }
];

export class BooksRouter {
    private _router: Router;

    constructor() {
        this._router = Router();

        this._router.get('/books', (req: Request, res: Response) => {
            res.send(booksPlaceholder);
        });
    }

    get router() {
        return this._router;
    }
}