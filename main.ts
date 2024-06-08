import { App } from './src/App';
import  * as dotenv from 'dotenv';
// import * as crypto from 'crypto';
import { BooksController } from './src/controllers/books.controller';
import { BooksService } from './src/model/services/books.service';   // --- для внедрения зависимостей через конструктор класса
import { BooksRepository } from './src/model/repositories/books.repository';
import { AuthController } from './src/controllers/auth.controller';
import { AuthService } from './src/model/services/auth.service';   // --- для внедрения зависимостей через конструктор класса
import { AuthRepository } from './src/model/repositories/auth.repository';
import { CategoriesController } from './src/controllers/categories.controller';
import { CategoriesService } from './src/model/services/categories.service';   // --- для внедрения зависимостей через конструктор класса
import { CategoriesRepository } from './src/model/repositories/categories.repository';
import { DBService } from './src/db/dbService';

dotenv.config();

// const salt = crypto.randomBytes(16).toString('base64'); // создаем соль
const salt = 'SKqFOU1OgHCWBNEieU6TxQ==';
process.env.SALT = salt;                                // записали ее в переменные окружения

async function bootstrap() {
    const booksController = new BooksController(new BooksService(new BooksRepository(new DBService)));   // --- для внедрения зависимостей через конструктор класса
    const authController = new AuthController(new AuthService(new AuthRepository(new DBService)));
    const categoriesController = new CategoriesController(new CategoriesService(new CategoriesRepository(new DBService)));

    const app = new App(booksController, authController, categoriesController);                            // --- для внедрения зависимостей через конструктор класса

    await app.run();
}

bootstrap();
console.log('я работаю!!!');