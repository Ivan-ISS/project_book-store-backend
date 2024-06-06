import { ICategorySearchFilter } from '@Shared/types';


// Config find categories
export const inclusion = (withBooks: boolean) => {
    return ({
        books: {
            include: {
                book: withBooks,
            }
        },
    });
};

export const filters = ({ perPage, page }: ICategorySearchFilter) => {
    return ({
        skip: perPage && page && Number(perPage * (page - 1)),
        take: Number(perPage)
    });
};

export const categoryFindConfig = ({ perPage, page }: ICategorySearchFilter, withAuthors: boolean) => {
    return ({
        include: {...inclusion(withAuthors)},
        ...filters({ perPage, page })
    });
};
