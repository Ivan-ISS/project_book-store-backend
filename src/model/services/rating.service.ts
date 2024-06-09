import { RatingRepository } from '../repositories/rating.repository';
import { IRating } from '@Shared/types';

export class RatingService {

    constructor(private ratingRepository: RatingRepository) {

        this.ratingRepository = ratingRepository;
    }

    public async addRating(dataRating: IRating) {
        const { status, message } = await this.ratingRepository.addRating(dataRating);
        return { status, message };
    }
}