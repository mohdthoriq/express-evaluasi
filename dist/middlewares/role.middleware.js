export const adminOnly = (req, res, next) => {
    if (!req.user) {
        throw new Error("User tidak ditemukan");
    }
    if (req.user.role !== "ADMIN") {
        throw new Error("Akses khusus admin");
    }
    next();
};
export const memberOnly = (req, res, next) => {
    if (!req.user) {
        throw new Error("User tidak ditemukan");
    }
    if (req.user.role !== "MEMBER") {
        throw new Error("Akses khusus member");
    }
    next();
};
//# sourceMappingURL=role.middleware.js.map