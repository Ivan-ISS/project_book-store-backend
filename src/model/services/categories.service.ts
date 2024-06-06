import { CategoriesRepository } from '../repositories/categories.repository';
// import { Category } from '@prisma/client';
import { ICategory, ICategorySearchFilter } from '@Shared/types';

export class CategoriesService {

    constructor(private categoriesRepository: CategoriesRepository) {

        this.categoriesRepository = categoriesRepository;
    }

    public async getCategories(filter: ICategorySearchFilter) {
        const { status, message, data } = await this.categoriesRepository.getCategories(filter);
        return { status, message, data };
    }

    public async createCategory(categoryData: ICategory) {
        const { status, message, data } = await this.categoriesRepository.createCategory(categoryData);
        return { status, message, data };
    }

    public async editCategory(categoryId: string | number, categoryData: ICategory) {
        const { status, message, data } = await this.categoriesRepository.editCategory(categoryId, categoryData);
        return { status, message, data };
    }

    public async removeCategory(categoryId: string | number) {
        const { status, message } = await this.categoriesRepository.removeCategory(categoryId);
        return { status, message };
    }
}