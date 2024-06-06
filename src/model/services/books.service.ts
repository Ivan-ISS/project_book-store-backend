import { BooksRepository } from '../repositories/books.repository';
import { Book } from '@prisma/client';
import { IBookSearchFilter, IBook } from '@Shared/types';
// import { booksPlaceholder } from '../../api/books-api';  // --- ранее, для проверки работоспособности отдельных этапов, здесь возвращался placeholder

export class BooksService { // ЗДесь нужно будет дописать конструкцию async...await + тип возвращаемого значения :Promise<IBook[]>

    constructor(private booksRepository: BooksRepository) {

        this.booksRepository = booksRepository;
    }

    public async getBooks(filter: IBookSearchFilter): Promise<Book[]> {
        return await this.booksRepository.findAll(filter);
        // return booksPlaceholder;                         // --- ранее, для проверки работоспособности отдельных этапов, здесь возвращался placeholder
    }

    public async editBook(bookId: string | number, bookData: IBook) {
        const { status, message, data } = await this.booksRepository.editBook(bookId, bookData);
        return { status, message, data };
    }

    public async removeBook(bookId: string | number) {
        const { status, message } = await this.booksRepository.removeBook(bookId);
        return { status, message };
    }

    public async createBook(bookData: IBook) {
        const { status, message, data } = await this.booksRepository.createBook(bookData);
        return { status, message, data };
        //  return { success: true, book: bookData };
    }
}