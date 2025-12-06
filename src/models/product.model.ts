export interface Books {
    category: "komik" | "novel";
    id: number;
    judul: string;
    penulis: string;
    tahun: number;
    harga: number;
}

export let books: Books[] = [
    // Komik
    { category: "komik", id: 1, judul: "Naruto Vol.1", penulis: "Masashi Kishimoto", tahun: 2000, harga: 50000 },
    { category: "komik", id: 2, judul: "One Piece Vol.1", penulis: "Eiichiro Oda", tahun: 1997, harga: 55000 },
    { category: "komik", id: 3, judul: "Dragon Ball Vol.1", penulis: "Akira Toriyama", tahun: 1984, harga: 60000 },
    { category: "komik", id: 4, judul: "Attack on Titan Vol.1", penulis: "Hajime Isayama", tahun: 2009, harga: 70000 },
    { category: "komik", id: 5, judul: "My Hero Academia Vol.1", penulis: "Kohei Horikoshi", tahun: 2014, harga: 65000 },

    // Novel
    { category: "novel", id: 1, judul: "Laskar Pelangi", penulis: "Andrea Hirata", tahun: 2005, harga: 85000 },
    { category: "novel", id: 2, judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", tahun: 1980, harga: 90000 },
    { category: "novel", id: 3, judul: "Ayat-Ayat Cinta", penulis: "Habiburrahman El Shirazy", tahun: 2004, harga: 80000 },
    { category: "novel", id: 4, judul: "Dilan 1990", penulis: "Pidi Baiq", tahun: 2014, harga: 75000 },
    { category: "novel", id: 5, judul: "5cm", penulis: "Donny Dhirgantoro", tahun: 2005, harga: 70000 }
];
