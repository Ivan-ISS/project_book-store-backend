export interface IBook {
    id?: number;
    bookName: string;
    authors?: IAuthor[];
    language?: string;
    categories?: ICategory[];
    price?: number;
    currency?: ICurrency;
    yearOfPublishing?: number;
    rating?: number; // будет рассчитываться средний на основе связи таблиц с ретингом - по id
}

export interface IUser {        //
    id: number;
    name: string;
    accountCreationDate: number;
    description: string;
    email: string;
    password: string;
    booksList?: IBook[];
}

export interface ICategory {    //
    id: number;
    categoryName: string;
    // bookId: number[];
}

export interface ICurrency {    //
    id: number;
    currencyName: string;
    currencyAcronym: string;
}

export interface IAuthor {      //
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: number;
    dateOfDeath: number;
    // bookId: number[];
}

export interface IRating {      //
    id: number;
    userId: number;
    bookId: number;
    value: number;
}