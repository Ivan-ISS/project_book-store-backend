import { DBService } from '../../db/dbService';
// import { Category } from '@prisma/client';
import { ICategorySearchFilter } from '@Shared/types';
import { categoryFindConfig } from './config/categoryConfig';

export class CategoriesRepository {
    constructor(private dbService: DBService) {
        this.dbService = dbService;
    }

    public async getCategories({ perPage = 6, page = 1 }: ICategorySearchFilter, withBooks = true) {

        const categoriesList = await this.dbService.client.category.findMany(
            categoryFindConfig({ perPage, page }, withBooks)
        );
        return {status: 200, message: ` ${ perPage } and ${ page }`, data: categoriesList};
    }
}