import { DBService } from '../../db/dbService';
import { IRating } from '@Shared/types';

export class RatingRepository {
    constructor(private dbService: DBService) {
        this.dbService = dbService;
    }

    public async addRating(dataRating: IRating) {

        await this.dbService.client.rating.create({
            data: {
                userId: dataRating.userId,
                bookId: dataRating.bookId,
                value: dataRating.value,
            },
        });
        return { status: 201, message: 'The rating has been set' };
    }
}