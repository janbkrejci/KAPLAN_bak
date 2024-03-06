/*
  Warnings:

  - You are about to alter the column `friday` on the `WorkingHoursSchema` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `holidayIfWeekend` on the `WorkingHoursSchema` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `holidayIfWorkDay` on the `WorkingHoursSchema` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `monday` on the `WorkingHoursSchema` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `saturday` on the `WorkingHoursSchema` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `sunday` on the `WorkingHoursSchema` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `thursday` on the `WorkingHoursSchema` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `tuesday` on the `WorkingHoursSchema` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `wednesday` on the `WorkingHoursSchema` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `firstDayHours` on the `ResourceLeave` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `lastDayHours` on the `ResourceLeave` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `dailyHoursAvailable` on the `ResourceAvailabilityOverride` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkingHoursSchema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "monday" REAL NOT NULL DEFAULT 8,
    "tuesday" REAL NOT NULL DEFAULT 8,
    "wednesday" REAL NOT NULL DEFAULT 8,
    "thursday" REAL NOT NULL DEFAULT 8,
    "friday" REAL NOT NULL DEFAULT 8,
    "saturday" REAL NOT NULL DEFAULT 0,
    "sunday" REAL NOT NULL DEFAULT 0,
    "holidayIfWorkDay" REAL NOT NULL DEFAULT 0,
    "holidayIfWeekend" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_WorkingHoursSchema" ("createdAt", "friday", "holidayIfWeekend", "holidayIfWorkDay", "id", "monday", "name", "saturday", "sunday", "thursday", "tuesday", "updatedAt", "wednesday") SELECT "createdAt", "friday", "holidayIfWeekend", "holidayIfWorkDay", "id", "monday", "name", "saturday", "sunday", "thursday", "tuesday", "updatedAt", "wednesday" FROM "WorkingHoursSchema";
DROP TABLE "WorkingHoursSchema";
ALTER TABLE "new_WorkingHoursSchema" RENAME TO "WorkingHoursSchema";
CREATE TABLE "new_ResourceLeave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "firstDayHours" REAL NOT NULL,
    "lastDayHours" REAL NOT NULL,
    "resourceLeaveApprovalStateId" TEXT NOT NULL,
    "resourceLeaveTypeId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ResourceLeave_resourceLeaveTypeId_fkey" FOREIGN KEY ("resourceLeaveTypeId") REFERENCES "ResourceLeaveType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ResourceLeave_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResourceLeave" ("createdAt", "description", "firstDayHours", "from", "id", "lastDayHours", "resourceId", "resourceLeaveApprovalStateId", "resourceLeaveTypeId", "to", "updatedAt") SELECT "createdAt", "description", "firstDayHours", "from", "id", "lastDayHours", "resourceId", "resourceLeaveApprovalStateId", "resourceLeaveTypeId", "to", "updatedAt" FROM "ResourceLeave";
DROP TABLE "ResourceLeave";
ALTER TABLE "new_ResourceLeave" RENAME TO "ResourceLeave";
CREATE TABLE "new_ResourceAvailabilityOverride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dateFrom" DATETIME,
    "dateTo" DATETIME,
    "dailyHoursAvailable" REAL NOT NULL
);
INSERT INTO "new_ResourceAvailabilityOverride" ("dailyHoursAvailable", "dateFrom", "dateTo", "description", "id") SELECT "dailyHoursAvailable", "dateFrom", "dateTo", "description", "id" FROM "ResourceAvailabilityOverride";
DROP TABLE "ResourceAvailabilityOverride";
ALTER TABLE "new_ResourceAvailabilityOverride" RENAME TO "ResourceAvailabilityOverride";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
