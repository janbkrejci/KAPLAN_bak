-- CreateTable
CREATE TABLE "NationalHolidays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER
);

-- CreateTable
CREATE TABLE "ResourceAvailabiliyOverride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dateFrom" DATETIME,
    "dateTo" DATETIME,
    "dailyHoursAvailable" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ResourceToResourceAvailabiliyOverride" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ResourceToResourceAvailabiliyOverride_A_fkey" FOREIGN KEY ("A") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResourceToResourceAvailabiliyOverride_B_fkey" FOREIGN KEY ("B") REFERENCES "ResourceAvailabiliyOverride" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToResourceAvailabiliyOverride_AB_unique" ON "_ResourceToResourceAvailabiliyOverride"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToResourceAvailabiliyOverride_B_index" ON "_ResourceToResourceAvailabiliyOverride"("B");
