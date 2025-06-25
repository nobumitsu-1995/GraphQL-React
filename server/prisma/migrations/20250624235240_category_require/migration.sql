/*
  Warnings:

  - Made the column `categoryId` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_categoryId_fkey";

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
