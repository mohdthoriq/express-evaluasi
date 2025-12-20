import  multer  from "multer";
import path from "node:path";
import fs from "node:fs"
import type { Request } from "express";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "public/uploads"

    if (file.fieldname === "profileImage") {
      folder = "public/uploads/profile"
    }

    if (file.fieldname === "bookImage") {
      folder = "public/uploads/books"
    }

    fs.mkdirSync(folder, { recursive: true })

    cb(null, folder)
  },

  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, unique + path.extname(file.originalname))
  },
})


const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export const upload = multer({
    storage : storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: fileFilter
})