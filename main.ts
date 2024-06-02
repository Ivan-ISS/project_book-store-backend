import { App } from './src/App';
import  * as dotenv from 'dotenv';
import { BooksController } from './src/controllers/books.controller';
import { BooksService } from './src/model/services/books.service';

dotenv.config();

async function bootstrap() {
    const booksController = new BooksController(new BooksService);

    const app = new App(booksController);

    await app.run();
}

bootstrap();
console.log('я работаю!!!');