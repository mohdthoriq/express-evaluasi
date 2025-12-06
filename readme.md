jawaban soal pilihan ganda :
1. Peran utama Backend → b) Mengelola data, logika bisnis, dan komunikasi database

2. HTTP Method POST untuk CRUD → c) Create

3. HTTP Status Code 201 Created → b) Data baru berhasil dibuat

4. Node.js → c) Runtime environment untuk menjalankan JavaScript di luar browser

5. Engine JavaScript Node.js → c) V8

6. Middleware express.json() → b) Memparsing body request dalam format JSON

7. Perbedaan Route Params dan Query String → b) Route Params untuk identifikasi resource, Query String untuk filter/sorting

8. Fungsi Global Error Handler → c) Menangkap semua error yang terjadi di aplikasi dan mengirim respons yang konsisten

9. Manfaat pemisahan Controller, Service, Route → b) Meningkatkan keterbacaan, pemeliharaan, dan skalabilitas kode

10. Tanggung jawab Controller → c) Menerima request HTTP, mengambil data, dan menyuruh Service untuk logika bisnis, lalu mengirim respons


# Dokumentasi API Buku

## Base URL
http://localhost:5000/:user/api/books

yaml
Copy code

---

## 1. Struktur Folder
- `routes/` → Semua endpoint
- `controllers/` → Logika handling request
- `services/` → Logika bisnis / helper
- `data/` → Data dummy / in-memory
- `middlewares/` → Validasi, auth, error handling
- `utils/response.ts` → Helper response standar

---

## 2. Endpoints

| Method | Endpoint | Deskripsi | Params / Body | Response |
|--------|----------|-----------|---------------|----------|
| GET | /books | Ambil semua buku | — | Array buku |
| GET | /books/:category | Ambil semua buku per kategori | path: `category` | Array buku |
| GET | /books/:category/:id | Ambil buku spesifik berdasarkan id di kategori | path: `category`, `id` | Buku tertentu |
| POST | /books | Tambah buku baru | body JSON: `{ "judul": "", "penulis": "", "tahun": 2023, "harga": 100000, "category": "" }` | Buku baru |
| PUT | /books/:category/:id | Update buku | path: `category`, `id`, body JSON `{ ... }` | Buku updated |
| DELETE | /books/:category/:id | Hapus buku | path: `category`, `id` | Success message |

---

## 3. Request Body Contoh

**POST /books**  

```js
{
  "judul": "Fantasi Baru",
  "penulis": "Rick",
  "tahun": 2025,
  "harga": 75000,
  "category": "fantasi"
}

``
PUT /books/fantasi/1

```json
Copy code
{
  "judul": "Fantasi Baru Vol.2",
  "penulis": "Rick",
  "tahun": 2025,
  "harga": 80000
}

```
4. Validasi
category bebas string, bisa nambah category baru dari Postman

Duplikat dicek berdasarkan judul + category

tahun harus 4 digit angka

harga harus angka

5. Response Format
Success
json
Copy code

```json
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": { ... },
  "errors": null
}

```
Error


```json
Copy code
{
  "success": false,
  "message": "Kategori tidak valid",
  "data": null,
  "errors": { ... }
}
```

6. Error Handling
Status Code	Keterangan

```json
400	Bad Request → input invalid / duplikat
404	Not Found → buku atau kategori tidak ada
500	Server Error → kesalahan server

```

7. Catatan Penting

```json

Middleware express.json() wajib untuk parsing JSON body

Route /books/:category harus diletakkan sebelum /books/:category/:id agar tidak bentrok

ID buku harus unik per category (otomatis generate di service)

Semua category baru bisa langsung ditambahkan dari Postman

```

8. Contoh Response
GET /books/fantasi

```json
Copy code
{
  "success": true,
  "message": "Semua buku kategori 'fantasi'",
  "data": [
    {
      "id": 1,
      "judul": "Fantasi Baru",
      "penulis": "Rick",
      "tahun": 2025,
      "harga": 75000,
      "category": "fantasi"
    }
  ]
}

```
GET /books/fantasi/1

```json
Copy code
{
  "success": true,
  "message": "Buku ditemukan",
  "data": {
    "id": 1,
    "judul": "Fantasi Baru",
    "penulis": "Rick",
    "tahun": 2025,
    "harga": 75000,
    "category": "fantasi"
  }
}
```
POST /books (duplikat)

```json
Copy code
{
  "success": false,
  "message": "Buku dengan judul 'Fantasi Baru' di kategori 'fantasi' sudah ada",
  "data": null
}
```
9. Tips Testing
Gunakan Postman atau Insomnia

Selalu cek category baru sebelum GET /books/:category

POST dengan body JSON valid

PUT & DELETE pakai path /books/:category/:id

swift
Copy code

---

## 2️⃣ Postman Collection Lengkap

```json
{
  "info": {
    "name": "API Buku Lengkap",
    "_postman_id": "abcdef12-3456-7890-abcd-ef1234567890",
    "description": "Collection lengkap untuk testing API Buku",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "GET Semua Buku",
      "request": {
        "method": "GET",
        "header": [],
        "url": { "raw": "http://localhost:5000/:user/api/books", "host": ["http://localhost:5000"], "path": [":user","api","books"] }
      }
    },
    {
      "name": "GET Buku per Category",
      "request": {
        "method": "GET",
        "header": [],
        "url": { "raw": "http://localhost:5000/:user/api/books/komik", "host": ["http://localhost:5000"], "path": [":user","api","books","komik"] }
      }
    },
    {
      "name": "GET Buku per Category & ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": { "raw": "http://localhost:5000/:user/api/books/komik/1", "host": ["http://localhost:5000"], "path": [":user","api","books","komik","1"] }
      }
    },
    {
      "name": "POST Tambah Buku",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"judul\": \"Fantasi Baru\",\n  \"penulis\": \"Rick\",\n  \"tahun\": 2025,\n  \"harga\": 75000,\n  \"category\": \"fantasi\"\n}"
        },
        "url": { "raw": "http://localhost:5000/:user/api/books", "host": ["http://localhost:5000"], "path": [":user","api","books"] }
      }
    },
    {
      "name": "PUT Update Buku",
      "request": {
        "method": "PUT",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"judul\": \"Fantasi Baru Vol.2\",\n  \"penulis\": \"Rick\",\n  \"tahun\": 2025,\n  \"harga\": 80000\n}"
        },
        "url": { "raw": "http://localhost:5000/:user/api/books/fantasi/1", "host": ["http://localhost:5000"], "path": [":user","api","books","fantasi","1"] }
      }
    },
    {
      "name": "DELETE Buku",
      "request": {
        "method": "DELETE",
        "header": [],
        "url": { "raw": "http://localhost:5000/:user/api/books/fantasi/1", "host": ["http://localhost:5000"], "path": [":user","api","books","fantasi","1"] }
      }
    }
  ]
}
```