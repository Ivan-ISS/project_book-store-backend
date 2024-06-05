import { DBService } from '../../db/dbService';
import { Book, Author } from '@prisma/client';
import { IBookSearchFilter, IBook } from '@Shared/types';
import { bookFindConfig, bookCreateConfig } from './config/bookConfig';

export class BooksRepository {
    constructor(private dbService: DBService) {
        this.dbService = dbService;
    }

    public async findAll(
        { perPage = 6, page = 1, category }: IBookSearchFilter,
        withAuthors = true,
        withCategories = true,
    ): Promise<Book[]> {

        // Если мы не используем ORM
        // const booksList = await this.dbService.client.$queryRaw`SELECT * from Book`;

        // Если мы используем ORM
        const booksList = await this.dbService.client.book.findMany(
            bookFindConfig({ perPage, page, category }, withAuthors, withCategories)
        );
        return booksList;
    }

    // public async findById(bookId: string | number) { ... }

    public async createBook(bookData: IBook) {

        const existingAuthors = await this.dbService.client.author.findMany({       // Проверка наличия автора в БД
            where: {
                firstName: {
                    in: bookData.authors?.map(author => author.firstName),
                },
                lastName: {
                    in: bookData.authors?.map(author => author.lastName),
                },
            },
        });

        const newAuthors = bookData.authors?.filter(author =>                       // Фильтр только по новым авторам
            !existingAuthors.some(existingAuthor => 
                existingAuthor.firstName === author.firstName && existingAuthor.lastName === author.lastName
            )
        );

        const createdAuthors: Author[] = [];                                        // Добавление новых авторов в БД
        if (newAuthors) {
            for (const newAuthor of newAuthors) {
                createdAuthors.push(await this.dbService.client.author.create({
                    data: {
                        firstName: newAuthor.firstName,
                        lastName: newAuthor.lastName,
                        yearsActive: newAuthor.yearsActive,
                    },
                }));
            }
        }

        const existingCutegories = await this.dbService.client.category.findMany({   // Проверка наличия категорий в БД
            where: {
                name: {
                    in: bookData.categories?.map(category => category.name),
                },
            },
        });
        
        const existingCurrency = await this.dbService.client.currency.findFirst({   // Проверка наличия валют в БД
            where: {
                acronym: bookData.currency?.acronym.toUpperCase().trim(),
            }
        });

        const createdBook = await this.dbService.client.book.create({               // Добавление книги в БД
            data: bookCreateConfig(bookData, existingCurrency)
        });

        await this.dbService.client.book_Authors.createMany({                       // Заполнение таблиц связей в БД Books_Authors
            data: [...existingAuthors, ...createdAuthors].map(author => ({
                bookId: createdBook.id,
                authorId: author.id,
            })),
        });

        await this.dbService.client.book_Categories.createMany({                    // Заполнение таблиц связей в БД Books_Categories
            data: existingCutegories.map(category => ({
                bookId: createdBook.id,
                categoryId: category.id,
            })),
        });

        console.log('createdBook.id: ', createdBook.id);
        return createdBook;
    }
}