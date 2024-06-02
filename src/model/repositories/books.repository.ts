/* export class BookRepository {
    constructor() {
        this.dbService = new DatabaseService();
    }

    public async findAll() {
        // Если мы не используем ORM
        const booksList = await this.dbService.query'SELECT * from "BOOKS"';

        // Если мы используем ORM
        const booksList = await this.dbService.findAll('books');
        return booksList;
    }

    public async findById(bookId: string | number) { ... }

    public async create(data: BookData) { ... }
} */