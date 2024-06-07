import { DBService } from '../../db/dbService';

export class AuthRepository {
    constructor(private dbService: DBService) {
        this.dbService = dbService;
    }

    public async registerUser() {
        return { status: 200, message: null};
    }

    public async loginUser() {
        return { status: 200, message: null};
    }
}