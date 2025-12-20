-- CreateTable
CREATE TABLE "BorrowItem" (
    "id" SERIAL NOT NULL,
    "borrowRecordId" INTEGER NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "BorrowItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowRecord" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'BORROWED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BorrowRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowItem" ADD CONSTRAINT "BorrowItem_borrowRecordId_fkey" FOREIGN KEY ("borrowRecordId") REFERENCES "BorrowRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowItem" ADD CONSTRAINT "BorrowItem_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowRecord" ADD CONSTRAINT "BorrowRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
