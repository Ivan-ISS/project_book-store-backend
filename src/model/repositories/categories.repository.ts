import { DBService } from '../../db/dbService';
// import { Category } from '@prisma/client';
import { ICategorySearchFilter, ICategory } from '@Shared/types';
import { categoryFindConfig } from './config/categoryConfig';
import { validateCategories } from './helpers';

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

    public async createCategory(categoryData: ICategory) {

        const validationResult = validateCategories([categoryData]);

        if (validationResult) {
            return {status: 400, message: `Field ${validationResult} is absent or invalid`, data: null};
        }

        const createdCategory = await this.dbService.client.category.create({
            data: {
                name: categoryData.name,
            }
        });

        return {status: 201, message: null, data: createdCategory};
    }
}