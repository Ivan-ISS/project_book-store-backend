import { App } from './src/App';
import  * as dotenv from 'dotenv';
import { BooksController } from './src/controllers/books.controller';
import { BooksService } from './src/model/services/books.service';   // --- для внедрения зависимостей через конструктор класса
import { BooksRepository } from './src/model/repositories/books.repository';
import { DBService } from './src/db/dbService';

dotenv.config();

async function bootstrap() {
    const booksController = new BooksController(new BooksService(new BooksRepository(new DBService)));   // --- для внедрения зависимостей через конструктор класса

    const app = new App(booksController);                            // --- для внедрения зависимостей через конструктор класса

    await app.run();
}

bootstrap();
console.log('я работаю!!!');