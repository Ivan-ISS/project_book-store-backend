import { DBService } from '../../db/dbService';
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

    public async editCategory(categoryId: string | number,categoryData: ICategory) {

        const validationId = isNaN(Number(categoryId));
        if (validationId) {
            return {status: 400, message: `Id ${categoryId} is not a number`, data: null};
        }

        const existingCategory = await this.dbService.client.category.findUnique({
            where: { id: Number(categoryId) }
        });

        if (!existingCategory) {
            return {status: 404, message: `Category with id: ${categoryId} is not found`, data: null};
        }

        const validationResult = validateCategories([categoryData]);

        if (validationResult) {
            return {status: 400, message: `Field ${validationResult} is absent or invalid`, data: null};
        }

        const updatedCategory = await this.dbService.client.category.update({
            where: { id: Number(categoryId) },
            data: {
                name: categoryData.name
            }
        });

        return {status: 201, message: null, data: updatedCategory};
    }

    public async removeCategory(categoryId: string | number) {

        const validationId = isNaN(Number(categoryId));
        if (validationId) {
            return {status: 400, message: `Id ${categoryId} is not a number`, data: null};
        }

        const existingCategory = await this.dbService.client.category.findUnique({
            where: { id: Number(categoryId) }
        });

        if (!existingCategory) {
            return {status: 404, message: `Category with id: ${categoryId} is not found`, data: null};
        }

        await this.dbService.client.book_Categories.deleteMany({
            where: { categoryId: Number(categoryId) },
        });

        await this.dbService.client.category.delete({
            where: { id: Number(categoryId) },
        });

        return { status: 200, message: `Category with id: ${categoryId} has been deleted` };
    }
}