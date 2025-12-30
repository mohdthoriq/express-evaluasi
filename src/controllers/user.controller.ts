import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { AuthService } from "../services/user.service"

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body)

    successResponse(res, "Login berhasil", result)
  }

  register = async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body)

    successResponse(res, "Registrasi berhasil", result, null, 201)
  }
}
