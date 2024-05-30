import { App } from './src/App';
import  * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = new App();

    await app.run();
}

bootstrap();
console.log('я работаю!!!');