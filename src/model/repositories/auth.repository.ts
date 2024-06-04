import { DBService } from '../../db/dbService';

export class AuthRepository {
    constructor(private dbService: DBService) {
        this.dbService = dbService;
    }

    public async findAll(): Promise<string> {
        return 'token';
    }
}