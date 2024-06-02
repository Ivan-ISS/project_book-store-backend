// import { IBook } from '@Shared/types';
import { booksPlaceholder } from '../../api/books-api';

export class BooksService { // ЗДесь нужно будет дописать конструкцию asyync...await + тип возвращаемого значения :Promise<IBook[]>
    public getBooks() {
        return booksPlaceholder;
    }

    /* public editBook(bookId: string | number) {
        return { success: true, book: {} };
    }

    public removeBook(bookId: string | number) {
        return { success: true };
    }

    public createBook(bookData: IBook) {
        const book = new BookModel();
        book.setName(bookData.name);

        return { success: true, book: bookData };
    } */
}