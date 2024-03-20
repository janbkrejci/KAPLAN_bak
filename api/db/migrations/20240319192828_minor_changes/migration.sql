/*
  Warnings:

  - You are about to drop the column `from` on the `ResourceLeave` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `ResourceLeave` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `NationalHoliday` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `OrganizationalUnit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `WorkingHoursSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateFrom` to the `ResourceLeave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTo` to the `ResourceLeave` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResourceLeave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dateFrom" DATETIME NOT NULL,
    "dateTo" DATETIME NOT NULL,
    "firstDayWorkingHours" REAL NOT NULL,
    "lastDayWorkingHours" REAL NOT NULL,
    "resourceId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "ResourceLeave_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResourceLeave" ("createdAt", "description", "firstDayWorkingHours", "id", "lastDayWorkingHours", "resourceId", "updatedAt") SELECT "createdAt", "description", "firstDayWorkingHours", "id", "lastDayWorkingHours", "resourceId", "updatedAt" FROM "ResourceLeave";
DROP TABLE "ResourceLeave";
ALTER TABLE "new_ResourceLeave" RENAME TO "ResourceLeave";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "NationalHoliday_name_key" ON "NationalHoliday"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationalUnit_name_key" ON "OrganizationalUnit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WorkingHoursSchema_name_key" ON "WorkingHoursSchema"("name");
