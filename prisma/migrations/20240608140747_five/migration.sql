/*
  Warnings:

  - You are about to drop the column `login` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "login",
ADD COLUMN     "email" VARCHAR(20) NOT NULL DEFAULT '';
