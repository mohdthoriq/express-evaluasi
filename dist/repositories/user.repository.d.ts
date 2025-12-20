export declare const findByEmail: (email: string) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password: string;
    role: string;
} | null>;
export declare const findById: (id: number) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password: string;
    role: string;
} | null>;
export declare const create: (data: {
    username: string;
    email: string;
    password: string;
    role?: string;
}) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password: string;
    role: string;
}>;
//# sourceMappingURL=user.repository.d.ts.map