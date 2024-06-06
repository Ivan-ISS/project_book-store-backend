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
}