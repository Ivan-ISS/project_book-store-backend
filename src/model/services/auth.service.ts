import { AuthRepository } from '../repositories/auth.repository';

export class AuthService {

    constructor(private authRepository: AuthRepository) {

        this.authRepository = authRepository;
    }

    public async registerUser(): Promise<string> {
        return await this.authRepository.findAll();
    }

    public async loginUser(): Promise<string> {
        return await this.authRepository.findAll();
    }
}