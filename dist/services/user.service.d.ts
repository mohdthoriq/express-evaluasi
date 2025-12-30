import type { UserRepository } from "../repositories/user.repository.js";
export interface IAuthService {
    register(data: {
        username: string;
        email: string;
        password: string;
        role?: string;
    }): Promise<any>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        user: any;
        token: string;
    }>;
}
export declare class AuthService implements IAuthService {
    private userRepo;
    constructor(userRepo: UserRepository);
    register(data: {
        username: string;
        email: string;
        password: string;
        role?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        email: string;
        password: string;
        role: string;
    }>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            username: string;
            email: string;
            password: string;
            role: string;
        };
        token: string;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map
