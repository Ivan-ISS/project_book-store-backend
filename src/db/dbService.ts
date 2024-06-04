import { PrismaClient } from '@prisma/client';

export class DBService {
    private _client: PrismaClient;

    constructor() {
        this._client = new PrismaClient();
    }

    get client() {
        return this._client;
    }
}