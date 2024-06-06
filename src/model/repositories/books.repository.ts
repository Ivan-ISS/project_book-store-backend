import { DBService } from '../../db/dbService';
import { Book, Author } from '@prisma/client';
import { IBookSearchFilter, IBook } from '@Shared/types';
import { bookFindConfig, bookCreateConfig } from './config/bookConfig';
import { validateBook } from './helpers';

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
        /* try { */

            const validationResult = validateBook(bookData);
            if (validationResult) {
                return {status: 400, message: validationResult, data: null};
            }

            const existingCategories = await this.dbService.client.category.findMany({   // Проверка наличия категорий в БД
                where: {
                    name: {
                        in: bookData.categories?.map(category => category.name),
                    },
                },
            });

            const categories = bookData.categories?.filter(category =>                   // Фильтр по не найденным в БД категориям
                !existingCategories.some(existingCategory => 
                    existingCategory.name === category.name
                )
            );
            
            const existingCurrency = await this.dbService.client.currency.findFirst({   // Проверка наличия валют в БД
                where: {
                    acronym: bookData.currency?.acronym.toUpperCase().trim(),
                }
            });

            if (!existingCurrency) {
                return {status: 404, message: `Currency with name: ${bookData.currency?.acronym} is not found in database`, data: null};
            }

            if (categories?.length) {
                return {status: 404, message: `Categories with names: ${categories.map(cat => cat.name).join(', ')} is not found in database`, data: null};
            }

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

            const createdBook = await this.dbService.client.book.create({                   // Добавление книги в БД
                data: bookCreateConfig(bookData, existingCurrency)
            });

            if (bookData.authors?.length) {
                await this.dbService.client.book_Authors.createMany({                       // Заполнение таблиц связей в БД Books_Authors
                    data: [...existingAuthors, ...createdAuthors].map(author => ({
                        bookId: createdBook.id,
                        authorId: author.id,
                    })),
                });
            }

            if (bookData.categories?.length) {
                await this.dbService.client.book_Categories.createMany({                    // Заполнение таблиц связей в БД Books_Categories
                    data: existingCategories.map(category => ({
                        bookId: createdBook.id,
                        categoryId: category.id,
                    })),
                });
            }

            console.log('createdBook.id: ', createdBook.id);
            return {status: 201, message: null, data: createdBook};
        /* } catch (error) {
            console.log(error);
            return null;
        } */
    }
}