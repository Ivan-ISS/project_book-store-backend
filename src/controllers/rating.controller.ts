import { Request, Response } from 'express';
import { Controller } from './controller';
import { RatingService } from '../model/services/rating.service';
import { AuthMiddleware } from '../middleware/middleware';
import { IRating } from '@Shared/types';

export class RatingController extends Controller {

    constructor(private ratingService: RatingService) {
        super();

        this.ratingService = ratingService;

        this.bindRoutes([
            {
                routerPath: '/',
                method: 'post',
                fn: this.addRating,
                middleware: [new AuthMiddleware()],
            }
        ]);
    }

    private throwServerError(res: Response, e: Error) {
        console.debug(e.message);
        res.status(500);
        res.send('Something went wrong');
    }

    private async addRating(req: Request<object, object, IRating>, res: Response) {
        try {
            const { status, message } = await this.ratingService.addRating(req.body);

            res.status(status);
            res.send(message);
            return;
        } catch (error) {
            this.throwServerError(res, error as Error);
        }
    }
}