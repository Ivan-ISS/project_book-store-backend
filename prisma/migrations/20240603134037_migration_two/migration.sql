/*
  Warnings:

  - You are about to drop the column `currencyId` on the `Book` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `currency_acronym` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `currency_name` on the `Currency` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_currencyId_fkey";

-- DropIndex
DROP INDEX "Book_currencyId_key";

-- DropIndex
DROP INDEX "Book_id_key";

-- DropIndex
DROP INDEX "Currency_id_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "currencyId",
ADD COLUMN     "currency_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "language" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "year_published" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "currency_acronym",
DROP COLUMN "currency_name",
ADD COLUMN     "acronym" VARCHAR(10) NOT NULL DEFAULT '',
ADD COLUMN     "name" VARCHAR(50) NOT NULL DEFAULT '',
ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
