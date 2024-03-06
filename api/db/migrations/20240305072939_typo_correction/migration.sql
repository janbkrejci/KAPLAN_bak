/*
  Warnings:

  - You are about to drop the `ResourceAvailabiliyOverride` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ResourceToResourceAvailabiliyOverride` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ResourceAvailabiliyOverride";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ResourceToResourceAvailabiliyOverride";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ResourceAvailabilityOverride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dateFrom" DATETIME,
    "dateTo" DATETIME,
    "dailyHoursAvailable" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ResourceToResourceAvailabilityOverride" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ResourceToResourceAvailabilityOverride_A_fkey" FOREIGN KEY ("A") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResourceToResourceAvailabilityOverride_B_fkey" FOREIGN KEY ("B") REFERENCES "ResourceAvailabilityOverride" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToResourceAvailabilityOverride_AB_unique" ON "_ResourceToResourceAvailabilityOverride"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToResourceAvailabilityOverride_B_index" ON "_ResourceToResourceAvailabilityOverride"("B");
