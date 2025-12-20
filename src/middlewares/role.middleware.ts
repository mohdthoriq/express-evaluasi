import type { Request, Response, NextFunction } from "express"

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new Error("User tidak ditemukan")
  }

  if (req.user.role !== "ADMIN") {
    throw new Error("Akses khusus admin")
  }

  next()
}

export const memberOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new Error("User tidak ditemukan")
  }

  if (req.user.role !== "MEMBER") {
    throw new Error("Akses khusus member")
  }

  next()
}
