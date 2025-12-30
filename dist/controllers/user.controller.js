import { successResponse } from "../utils/response.js";
export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    login = async (req, res) => {
        const result = await this.authService.login(req.body);
        successResponse(res, "Login berhasil", result);
    };
    register = async (req, res) => {
        const result = await this.authService.register(req.body);
        successResponse(res, "Registrasi berhasil", result, null, 201);
    };
}
//# sourceMappingURL=user.controller.js.map
