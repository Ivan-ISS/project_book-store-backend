import { DBService } from '../../db/dbService';
import { Book } from '@prisma/client';
import { IBookSearchFilter, IBook } from '@Shared/types';

export class BooksRepository {
    constructor(private dbService: DBService) {
        this.dbService = dbService;
    }

    public async findAll(
        { perPage = 10, page = 1, category }: IBookSearchFilter,
        withAuthors = true
    ): Promise<Book[]> {

        // Если мы не используем ORM
        // const booksList = await this.dbService.client.$queryRaw`SELECT * from Book`;

        // Если мы используем ORM

        let booksList: Book[];
        if (withAuthors && category) {
            booksList = await this.dbService.client.book.findMany({
                include: {
                    authors: {
                        include: {
                            author: true,
                        }
                    },
                    categories: {
                        include: {
                            category: true,
                        }
                    }
                },
                where: {
                    categories: {
                        some: {
                            category: {
                                name: {
                                    in: category
                                }
                            }
                        }
                    }
                },
                skip: Number(perPage * (page - 1)),
                take: Number(perPage)
            });
            return booksList;
        }
        booksList = await this.dbService.client.book.findMany({
            include: {
                authors: {
                    include: {
                        author: true,
                    }
                },
                categories: {
                    include: {
                        category: true,
                    }
                }
            },
            skip: Number(perPage * (page - 1)),
            take: Number(perPage)
        });
        return booksList;
    }

    // public async findById(bookId: string | number) { ... }

    public async createBook(bookData: IBook) {
        const createdBook = await this.dbService.client.book.create({
            data: {
                name: bookData.name,
                price: bookData.price,
                language: bookData.language,
                description: bookData.description,
                yearPublished: bookData.yearPublished,
                currency: {
                    create: {
                        name: bookData.currency?.name,
                        acronym: bookData.currency?.acronym
                    }
                },
            }
        });

        console.log('createdBook.id: ', createdBook.id);
        return createdBook;
    }
}