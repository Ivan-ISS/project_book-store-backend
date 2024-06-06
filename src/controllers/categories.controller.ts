import { Request, Response } from 'express';
import { Controller } from './controller';
import { CategoriesService } from '../model/services/categories.service';
import { LoggerMiddleware } from '../middleware/middleware';
import { ICategorySearchFilter, ICategory } from '@Shared/types';
import { ParamsDictionary } from 'express-serve-static-core';

export class CategoriesController extends Controller {

    constructor(private categoriesService: CategoriesService) {
        super();

        this.categoriesService = categoriesService;

        this.bindRoutes([
            {
                routerPath: '/',
                method: 'get',
                fn: this.getCategories,
                middleware: [new LoggerMiddleware]
            },
            {
                routerPath: '/',
                method: 'post',
                fn: this.createCategory,
                middleware: [new LoggerMiddleware]
            },
            {
                routerPath: '/:id',
                method: 'put',
                fn: this.editCategory,
                middleware: [new LoggerMiddleware]
            },
            {
                routerPath: '/:id',
                method: 'delete',
                fn: this.removeCategory,
                middleware: [new LoggerMiddleware]
            },
        ]);
    }

    private throwServerError(res: Response, e: Error) {
        console.debug(e.message);
        res.status(500);
        res.send('Something went wrong');
    }

    private async getCategories(req: Request<object, object, object, ICategorySearchFilter>, res: Response) {
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

    private async createCategory(req: Request<object, object, ICategory>, res: Response) {
        
        try {
            const { status, message, data } = await this.categoriesService.createCategory(req.body);

            res.status(status);
            data ? res.send(data)
            : message && res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }

    private async editCategory(req: Request<ParamsDictionary, object, ICategory>, res: Response) {
        
        try {
            const { status, message, data } = await this.categoriesService.editCategory(req.params.id, req.body);

            res.status(status);
            data ? res.send(data)
            : message && res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }

    private async removeCategory(req: Request<ParamsDictionary>, res: Response) {

        try {
            const { status, message } = await this.categoriesService.removeCategory(req.params.id);

            res.status(status);
            res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }
}