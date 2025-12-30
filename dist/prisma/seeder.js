// prisma/seed.ts
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { PrismaInstance } from "../database.js";
const prisma = PrismaInstance;
async function main() {
    console.log("\uD83C\uDF31 Mulai seeding database...");
    // Hapus data lama (optional)
    await prisma.book.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    console.log("\uD83D\uDDD1\uFE0F  Data lama dihapus");
    // 1. Buat Users (100 users)
    console.log("\uD83D\uDC65 Membuat users...");
    const users = [];
    const roles = ["USER", "ADMIN", "MODERATOR"];
    // Buat admin default
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.create({
        data: {
            username: "admin",
            email: "admin@example.com",
            password: adminPassword,
            role: "ADMIN",
            createdAt: faker.date.past({ years: 2 }),
            updatedAt: faker.date.recent({ days: 30 }),
        },
    });
    users.push(admin);
    // Buat 99 user lainnya
    for (let i = 0; i < 99; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const username = faker.internet.username({ firstName, lastName }).toLowerCase();
        const hashedPassword = await bcrypt.hash("password123", 10);
        const user = await prisma.user.create({
            data: {
                username: username + i, // Tambah angka untuk ensure unique
                email: faker.internet.email({ firstName, lastName }).toLowerCase(),
                password: hashedPassword,
                role: faker.helpers.arrayElement(roles),
                createdAt: faker.date.past({ years: 2 }),
                updatedAt: faker.date.recent({ days: 60 }),
                // 5% user soft deleted
                deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent({ days: 30 }) : null,
            },
        });
        users.push(user);
    }
    console.log(`✅ ${users.length} users dibuat`);
    // 2. Buat Categories (20 kategori buku)
    console.log("\uD83D\uDCDA Membuat categories...");
    const categories = [];
    const categoryNames = [
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Thriller",
        "Romance",
        "Horror",
        "Biography",
        "History",
        "Science",
        "Technology",
        "Business",
        "Self-Help",
        "Philosophy",
        "Poetry",
        "Drama",
        "Adventure",
        "Children",
        "Young Adult",
    ];
    for (const name of categoryNames) {
        const category = await prisma.category.create({
            data: {
                name,
                createdAt: faker.date.past({ years: 2 }),
                updatedAt: faker.date.recent({ days: 30 }),
                // 5% kategori soft deleted
                deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent({ days: 15 }) : null,
            },
        });
        categories.push(category);
    }
    console.log(`✅ ${categories.length} categories dibuat`);
    // 3. Buat Books (300 buku)
    console.log("\uD83D\uDCD6 Membuat books...");
    const books = [];
    // Daftar penulis terkenal untuk variasi
    const authors = [
        "J.K. Rowling",
        "Stephen King",
        "Agatha Christie",
        "Dan Brown",
        "Ernest Hemingway",
        "Jane Austen",
        "Mark Twain",
        "George Orwell",
        "J.R.R. Tolkien",
        "Harper Lee",
        "F. Scott Fitzgerald",
        "Charles Dickens",
        "Leo Tolstoy",
        "Gabriel Garcia Marquez",
        "Toni Morrison",
        "Margaret Atwood",
        "Haruki Murakami",
        "Paulo Coelho",
        "Isaac Asimov",
        "Yuval Noah Harari",
    ];
    for (let i = 0; i < 300; i++) {
        // Pilih kategori yang tidak soft deleted untuk buku aktif
        const activeCategories = categories.filter(c => !c.deletedAt);
        const category = faker.helpers.arrayElement(faker.datatype.boolean(0.9) ? activeCategories : categories);
        // Generate title yang menarik
        const titleTemplates = [
            () => `The ${faker.word.adjective()} ${faker.word.noun()}`,
            () => `${faker.word.noun()} of ${faker.word.noun()}`,
            () => `The ${faker.word.adjective()} ${faker.word.adjective()} ${faker.word.noun()}`,
            () => `${faker.person.firstName()}'s ${faker.word.noun()}`,
            () => `A ${faker.word.noun()} in ${faker.location.city()}`,
        ];
        const titleGenerator = faker.helpers.arrayElement(titleTemplates);
        const title = titleGenerator();
        const book = await prisma.book.create({
            data: {
                title: title.charAt(0).toUpperCase() + title.slice(1),
                author: faker.datatype.boolean(0.7)
                    ? faker.helpers.arrayElement(authors)
                    : faker.person.fullName(),
                year: faker.number.int({ min: 1950, max: 2024 }),
                price: faker.number.int({ min: 50000, max: 500000 }),
                image: faker.image.url(),
                categoryId: category.id,
                createdAt: faker.date.past({ years: 1 }),
                updatedAt: faker.date.recent({ days: 60 }),
                // 8% buku soft deleted
                deletedAt: faker.datatype.boolean(0.08) ? faker.date.recent({ days: 30 }) : null,
            },
        });
        books.push(book);
    }
    console.log(`✅ ${books.length} books dibuat`);
    // Tampilkan summary
    console.log("\n\uD83D\uDCCA Summary:");
    console.log(`   Users: ${users.length}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Books: ${books.length}`);
    // Detail per role
    const roleCount = await prisma.user.groupBy({
        by: ["role"],
        _count: { role: true },
    });
    console.log("\n\uD83D\uDC64 Users by Role:");
    roleCount.forEach(r => console.log(`   ${r.role}: ${r._count.role}`));
    // Detail kategori dengan jumlah buku
    const categoryWithBooks = await prisma.category.findMany({
        include: {
            _count: {
                select: { books: true },
            },
        },
        orderBy: {
            books: {
                _count: "desc",
            },
        },
        take: 5,
    });
    console.log("\n\uD83D\uDCDA Top 5 Categories:");
    categoryWithBooks.forEach(c => {
        console.log(`   ${c.name}: ${c._count.books} books`);
    });
    console.log("\n\u2728 Seeding selesai!");
}
main()
    .catch((e) => {
    console.error("\u274C Error saat seeding:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seeder.js.map
