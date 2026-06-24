/*
  Warnings:

  - You are about to drop the column `ProfilePhoto` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "ProfilePhoto",
ADD COLUMN     "profile_photo" TEXT;
