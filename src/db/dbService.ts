import { PrismaClient } from '@prisma/client';

export class DBService {
    private _client: PrismaClient;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $queryRaw: any;

    constructor() {
        this._client = new PrismaClient();
    }

    get client() {
        return this._client;
    }
}