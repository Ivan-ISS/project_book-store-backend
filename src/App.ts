import express, { Express } from 'express';
import { json } from 'body-parser';

export class App {
    private app: Express;
    private readonly port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.APP_PORT) || 3000;
    }

    public async run() {
        this.app.use(json());
        this.app.listen(this.port, () => {
            console.log(`Приложение запущено на порту ${this.port}`);
        })
    }
}