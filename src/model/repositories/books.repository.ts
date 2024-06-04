import { DBService } from '../../db/dbService';
import { Book } from '@prisma/client';

export class BooksRepository {
    constructor(private dbService: DBService) {
        this.dbService = dbService;
    }

    public async findAll(withAuthors = true): Promise<Book[]> {
        // Если мы не используем ORM
        // const booksList = await this.dbService.client.$queryRaw`SELECT * from Book`;

        // Если мы используем ORM
        let booksList: Book[];
        if (withAuthors) {
            booksList = await this.dbService.client.book.findMany({
                include: {
                    authors: {
                        include: {
                            author: true,
                        }
                    }
                }
            });
            return booksList;
        }
        booksList = await this.dbService.client.book.findMany();
        return booksList;
    }

    // public async findById(bookId: string | number) { ... }

    // public async create(data: BookData) { ... }
}