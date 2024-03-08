/*
  Warnings:

  - You are about to drop the `ResourceLeaveType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ResourceKindToResourceLeaveType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `managerId` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `resourceLeaveApprovalStateId` on the `ResourceLeave` table. All the data in the column will be lost.
  - You are about to drop the column `resourceLeaveTypeId` on the `ResourceLeave` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `OrganizationalUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ResourceAvailabilityOverride` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `ResourceLeave` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `NationalHoliday` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ResourceLeaveType_name_key";

-- DropIndex
DROP INDEX "_ResourceKindToResourceLeaveType_B_index";

-- DropIndex
DROP INDEX "_ResourceKindToResourceLeaveType_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ResourceLeaveType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ResourceKindToResourceLeaveType";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrganizationalUnit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentOrganizationalUnitId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OrganizationalUnit_parentOrganizationalUnitId_fkey" FOREIGN KEY ("parentOrganizationalUnitId") REFERENCES "OrganizationalUnit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OrganizationalUnit" ("code", "description", "id", "name", "parentOrganizationalUnitId") SELECT "code", "description", "id", "name", "parentOrganizationalUnitId" FROM "OrganizationalUnit";
DROP TABLE "OrganizationalUnit";
ALTER TABLE "new_OrganizationalUnit" RENAME TO "OrganizationalUnit";
CREATE UNIQUE INDEX "OrganizationalUnit_code_key" ON "OrganizationalUnit"("code");
CREATE TABLE "new_ResourceAvailabilityOverride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dateFrom" DATETIME,
    "dateTo" DATETIME,
    "dailyHoursAvailable" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ResourceAvailabilityOverride" ("dailyHoursAvailable", "dateFrom", "dateTo", "description", "id") SELECT "dailyHoursAvailable", "dateFrom", "dateTo", "description", "id" FROM "ResourceAvailabilityOverride";
DROP TABLE "ResourceAvailabilityOverride";
ALTER TABLE "new_ResourceAvailabilityOverride" RENAME TO "ResourceAvailabilityOverride";
CREATE TABLE "new_Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "resourceKindId" TEXT NOT NULL,
    "activeSince" DATETIME NOT NULL,
    "activeUntil" DATETIME,
    "organizationalUnitId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Resource_resourceKindId_fkey" FOREIGN KEY ("resourceKindId") REFERENCES "ResourceKind" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_organizationalUnitId_fkey" FOREIGN KEY ("organizationalUnitId") REFERENCES "OrganizationalUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("activeSince", "activeUntil", "createdAt", "id", "name", "organizationalUnitId", "resourceKindId", "updatedAt") SELECT "activeSince", "activeUntil", "createdAt", "id", "name", "organizationalUnitId", "resourceKindId", "updatedAt" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE TABLE "new_ResourceLeave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "firstDayWorkingHours" REAL NOT NULL,
    "lastDayWorkingHours" REAL NOT NULL,
    "resourceId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ResourceLeave_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResourceLeave" ("createdAt", "description", "firstDayWorkingHours", "from", "id", "lastDayWorkingHours", "resourceId", "to", "updatedAt") SELECT "createdAt", "description", "firstDayWorkingHours", "from", "id", "lastDayWorkingHours", "resourceId", "to", "updatedAt" FROM "ResourceLeave";
DROP TABLE "ResourceLeave";
ALTER TABLE "new_ResourceLeave" RENAME TO "ResourceLeave";
CREATE TABLE "new_NationalHoliday" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_NationalHoliday" ("day", "id", "month", "name", "year") SELECT "day", "id", "month", "name", "year" FROM "NationalHoliday";
DROP TABLE "NationalHoliday";
ALTER TABLE "new_NationalHoliday" RENAME TO "NationalHoliday";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
