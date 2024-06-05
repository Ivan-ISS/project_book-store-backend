import { Currency } from '@prisma/client';
import { IBookSearchFilter, IBook } from '@Shared/types';


// Config find books
export const inclusion = (withAuthors: boolean, withCategories: boolean) => {
    return ({
        authors: {
            include: {
                author: withAuthors,
            }
        },
        categories: {
            include: {
                category: withCategories,
            }
        }
    });
};

export const filters = ({ perPage, page, category }: IBookSearchFilter) => {
    return ({
        where: {
            categories: {
                some: {
                    category: {
                        name: category
                    }
                }
            }
        },
        skip: perPage && page && Number(perPage * (page - 1)),
        take: Number(perPage)
    });
};

export const bookFindConfig = ({ perPage, page, category }: IBookSearchFilter, withAuthors: boolean, withCategories: boolean) => {
    return ({
        include: {...inclusion(withAuthors, withCategories)},
        ...filters({ perPage, page, category })
    });
};

// Config create books
export const bookCreateConfig = (bookData: IBook, existingCurrency: Currency | null) => {
    if (existingCurrency) {
        return ({
            name: bookData.name,
            price: bookData.price,
            language: bookData.language,
            description: bookData.description,
            yearPublished: bookData.yearPublished,
            currency: {
                connect: {
                    id: existingCurrency.id,
                }
            },
        });
    } else {
        return ({
            name: bookData.name,
            price: bookData.price,
            language: bookData.language,
            description: bookData.description,
            yearPublished: bookData.yearPublished,
            currency: {
                create: {
                    name: bookData.currency?.name,
                    acronym: bookData.currency?.acronym,
                }
            },
        });
    }
};