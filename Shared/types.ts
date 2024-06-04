export interface IBook {    //
    id: number;
    name: string;
    price: number;
    language: string;
    description: string;
    yearPublished: number;
    categories?: ICategory[];
    authors?: IAuthor[];
    rating?: IRating[];
    users?: IUser[];
    currency?: ICurrency;
    currencyId: number;
}

export interface IUser {        //
    id: number;
    name: string;
    dob: string;
    description: string;
    email: string;
    password: string;
    books?: IBook[];
    rating?: IRating[];
}

export interface ICategory {    //
    id: number;
    name: string;
    books: IBook[];
}

export interface ICurrency {    //
    id: number;
    name: string;
    acronym: string;
    books?: IBook[];
}

export interface IAuthor {      //
    id: number;
    first: string;
    last: string;
    yearsActive: string;
    books: IBook[];
}

export interface IRating {
    id: number;
    value: number;
    userId: number;
    bookId: number;
    book: IBook;
    user: IUser;
}

// ======================

export interface IBookSearchFilter {
    perPage?: number;
    page?: number;
    category?: string[];
}