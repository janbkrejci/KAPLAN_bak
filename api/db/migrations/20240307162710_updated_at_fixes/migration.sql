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
    "updatedAt" DATETIME
);
INSERT INTO "new_WorkingHoursSchema" ("createdAt", "friday", "holidayIfWeekend", "holidayIfWorkDay", "id", "monday", "name", "saturday", "sunday", "thursday", "tuesday", "updatedAt", "wednesday") SELECT "createdAt", "friday", "holidayIfWeekend", "holidayIfWorkDay", "id", "monday", "name", "saturday", "sunday", "thursday", "tuesday", "updatedAt", "wednesday" FROM "WorkingHoursSchema";
DROP TABLE "WorkingHoursSchema";
ALTER TABLE "new_WorkingHoursSchema" RENAME TO "WorkingHoursSchema";
CREATE TABLE "new_ResourceAvailabilityOverride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dateFrom" DATETIME,
    "dateTo" DATETIME,
    "dailyHoursAvailable" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_ResourceAvailabilityOverride" ("createdAt", "dailyHoursAvailable", "dateFrom", "dateTo", "description", "id", "updatedAt") SELECT "createdAt", "dailyHoursAvailable", "dateFrom", "dateTo", "description", "id", "updatedAt" FROM "ResourceAvailabilityOverride";
DROP TABLE "ResourceAvailabilityOverride";
ALTER TABLE "new_ResourceAvailabilityOverride" RENAME TO "ResourceAvailabilityOverride";
CREATE TABLE "new_ResourceCapability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_ResourceCapability" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ResourceCapability";
DROP TABLE "ResourceCapability";
ALTER TABLE "new_ResourceCapability" RENAME TO "ResourceCapability";
CREATE UNIQUE INDEX "ResourceCapability_name_key" ON "ResourceCapability"("name");
CREATE TABLE "new_ResourceKind" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hourlyCost" REAL NOT NULL,
    "workingHoursSchemaId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "ResourceKind_workingHoursSchemaId_fkey" FOREIGN KEY ("workingHoursSchemaId") REFERENCES "WorkingHoursSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResourceKind" ("createdAt", "hourlyCost", "id", "name", "updatedAt", "workingHoursSchemaId") SELECT "createdAt", "hourlyCost", "id", "name", "updatedAt", "workingHoursSchemaId" FROM "ResourceKind";
DROP TABLE "ResourceKind";
ALTER TABLE "new_ResourceKind" RENAME TO "ResourceKind";
CREATE UNIQUE INDEX "ResourceKind_name_key" ON "ResourceKind"("name");
CREATE TABLE "new_NationalHoliday" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_NationalHoliday" ("createdAt", "day", "id", "month", "name", "updatedAt", "year") SELECT "createdAt", "day", "id", "month", "name", "updatedAt", "year" FROM "NationalHoliday";
DROP TABLE "NationalHoliday";
ALTER TABLE "new_NationalHoliday" RENAME TO "NationalHoliday";
CREATE TABLE "new_ResourceLeave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "firstDayWorkingHours" REAL NOT NULL,
    "lastDayWorkingHours" REAL NOT NULL,
    "resourceId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "ResourceLeave_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResourceLeave" ("createdAt", "description", "firstDayWorkingHours", "from", "id", "lastDayWorkingHours", "resourceId", "to", "updatedAt") SELECT "createdAt", "description", "firstDayWorkingHours", "from", "id", "lastDayWorkingHours", "resourceId", "to", "updatedAt" FROM "ResourceLeave";
DROP TABLE "ResourceLeave";
ALTER TABLE "new_ResourceLeave" RENAME TO "ResourceLeave";
CREATE TABLE "new_OrganizationalUnit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentOrganizationalUnitId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "OrganizationalUnit_parentOrganizationalUnitId_fkey" FOREIGN KEY ("parentOrganizationalUnitId") REFERENCES "OrganizationalUnit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OrganizationalUnit" ("code", "createdAt", "description", "id", "name", "parentOrganizationalUnitId", "updatedAt") SELECT "code", "createdAt", "description", "id", "name", "parentOrganizationalUnitId", "updatedAt" FROM "OrganizationalUnit";
DROP TABLE "OrganizationalUnit";
ALTER TABLE "new_OrganizationalUnit" RENAME TO "OrganizationalUnit";
CREATE UNIQUE INDEX "OrganizationalUnit_code_key" ON "OrganizationalUnit"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
