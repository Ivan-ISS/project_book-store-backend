import { Router, Request, Response } from 'express';
import { IBook } from '@Shared/types';

export const booksPlaceholder: IBook[] = [
    /* {
        bookName: 'myBook',
    },
    {
        bookName: 'yourBook',
    } */
];

export class BooksRouter {
    private _router: Router;

    constructor() {
        this._router = Router();

        this._router.get('/books', (req: Request, res: Response) => {
            res.send(booksPlaceholder);
        });

        /* this._router.get('/books/1', (req: Request, res: Response) => {  // По сути код из юнита 5 "ControllerRoute" делает именно такую развертку у себя внутри из принятых роутов
            res.send('booksPlaceholder1');                                  // bind(this) нужен чтобы отвязать внутренний this передаваемого роутера и привязать его к классу в который
        });                                                                 // он передается, т.к. роут тоже является классом и внутри у него тоже this и он обращается к своему объекту

        this._router.get('/books/2', (req: Request, res: Response) => {     // Эта конструкция аналогичная этой this._router[route.method ?? 'get'](route.path, ctxHandler)
            res.send('booksPlaceholder2');                                  // [...](...) - аналогично этому this._router.get('...')
        }); */
    }

    get router() {
        return this._router;
    }
}