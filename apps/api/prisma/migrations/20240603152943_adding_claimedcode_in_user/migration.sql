/*
  Warnings:

  - Added the required column `claimedCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `claimedCode` VARCHAR(191) NOT NULL;
