/*
  Warnings:

  - You are about to drop the `NationalHolidays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "NationalHolidays";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "NationalHoliday" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER
);
