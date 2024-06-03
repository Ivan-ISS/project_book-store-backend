// import { IBook } from '@Shared/types';
import { BooksRepository } from '../repositories/books.repository';
import { Book } from '@prisma/client';
// import { booksPlaceholder } from '../../api/books-api';  // --- ранее, для проверки работоспособности отдельных этапов, здесь возвращался placeholder

export class BooksService { // ЗДесь нужно будет дописать конструкцию async...await + тип возвращаемого значения :Promise<IBook[]>

    constructor(private booksRepository: BooksRepository) {

        this.booksRepository = booksRepository;
    }

    public async getBooks(): Promise<Book[]> {
        return await this.booksRepository.findAll();
        // return booksPlaceholder;                         // --- ранее, для проверки работоспособности отдельных этапов, здесь возвращался placeholder
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