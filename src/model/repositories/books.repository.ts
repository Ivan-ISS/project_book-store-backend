import { DBService } from '../../db/dbService';
import { Book } from '@prisma/client';

export class BooksRepository {
    constructor(private dbService: DBService) {
        this.dbService = dbService;
    }

    public async findAll(): Promise<Book[]> {
        // Если мы не используем ORM
        // const booksList = await this.dbService.query'SELECT * from "BOOKS"';

        // Если мы используем ORM
        const booksList: Book[] = await this.dbService.client.book.findMany();
        return booksList;
    }

    // public async findById(bookId: string | number) { ... }

    // public async create(data: BookData) { ... }
}