import { Request, Response/* , NextFunction */ } from 'express';
import { Controller } from './controller';
import { CategoriesService } from '../model/services/categories.service';
import { LoggerMiddleware } from '../middleware/middleware';
import { ICategorySearchFilter } from '@Shared/types';
// import { ParamsDictionary } from 'express-serve-static-core';

export class CategoriesController extends Controller {

    constructor(private categoriesService: CategoriesService) {
        super();

        this.categoriesService = categoriesService;

        this.bindRoutes([
            {
                routerPath: '/categories',
                method: 'get',
                fn: this.getCategories,
                middleware: [new LoggerMiddleware]
            },
        ]);
    }

    private throwServerError(res: Response, e: Error) {
        console.debug(e.message);
        res.status(500);
        res.send('Something went wrong');
    }

    private async getCategories(req: Request<object, object, object, ICategorySearchFilter>, res: Response/* , next: NextFunction */) {
        try {
            const { status, message, data } = await this.categoriesService.getCategories(req.query);

            res.status(status);
            data ? res.send(data)
            : message && res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }
}