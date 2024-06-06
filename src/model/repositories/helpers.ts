import { IBook, ICategory, ICurrency, IAuthor } from '@Shared/types';

export const validateBook = (book: IBook): string | null => {
    if (!book || Object.keys(book).length === 0) {
        return 'Book is absent or empty';
    }

    const requiredFields = new Set<keyof IBook>([ 
        'name', 'price', 'language', 'description', 'yearPublished', 'currency', 'categories', 'authors'
    ]);

    let wrongFieldName;

    requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(book, field) || book[field] === '' || (book[field] as unknown[]).length === 0) {
            wrongFieldName = field;
            return;
        }
    });

    if (wrongFieldName) {
        return `Field ${wrongFieldName} is absent`;
    }

    wrongFieldName = [];

    if (book.categories && book.categories.length > 0) {
        wrongFieldName.push(validateCategories(book.categories));
    }

    if (book.currency && Object.keys(book.currency).length > 0) {
        wrongFieldName.push(validateCurrency(book.currency));
    }

    if (book.authors && book.authors.length > 0) {
        wrongFieldName.push(validateAuthors(book.authors));
    }

    wrongFieldName = wrongFieldName.filter((field) => field);

    if (wrongFieldName.length) {
        return `Field ${wrongFieldName.join(' and ')} is absent or invalid`;
    }

    return null;
};

const validateCategories = (categories: ICategory[]): string | null => {
    let wrongFieldName: string | null = null;
    const requiredFields = new Set<keyof ICategory>(['name']);
    categories.forEach((category) => {
        requiredFields.forEach((field) => {
            if (!Object.prototype.hasOwnProperty.call(category, field) || category[field] === '') {
                wrongFieldName = `'${field}' in category`;
                return;
            }
        });
    });
  
    return wrongFieldName;
};

const validateCurrency = (currency: ICurrency): string | null => {
    let wrongFieldName: string | null = null;
    const requiredFields = new Set<keyof ICurrency>(['name', 'acronym']);
    requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(currency, field) || currency[field] === '') {
            wrongFieldName = `'${field}' in currency`;
            return;
        }
    });
  
    return wrongFieldName;
};

const validateAuthors = (authors: IAuthor[]): string | null => {
    let wrongFieldName: string | null = null;
    const requiredFields = new Set<keyof IAuthor>(['firstName', 'lastName', 'yearsActive']);
    authors.forEach((author) => {
        requiredFields.forEach((field) => {
            if (!Object.prototype.hasOwnProperty.call(author, field) || author[field] === '') {
                wrongFieldName = `'${field}' author's`;
                return;
            }
        });
    });
  
    return wrongFieldName;
};