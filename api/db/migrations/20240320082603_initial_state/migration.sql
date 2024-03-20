-- CreateTable
CREATE TABLE "Resource" (
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

-- CreateTable
CREATE TABLE "ResourceKind" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hourlyCost" REAL NOT NULL,
    "workingHoursSchemaId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "ResourceKind_workingHoursSchemaId_fkey" FOREIGN KEY ("workingHoursSchemaId") REFERENCES "WorkingHoursSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ResourceCapability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "WorkingHoursSchema" (
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

-- CreateTable
CREATE TABLE "ResourceLeave" (
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

-- CreateTable
CREATE TABLE "NationalHoliday" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "ResourceAvailabilityOverride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dateFrom" DATETIME,
    "dateTo" DATETIME,
    "dailyHoursAvailable" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "OrganizationalUnit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentOrganizationalUnitId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "OrganizationalUnit_parentOrganizationalUnitId_fkey" FOREIGN KEY ("parentOrganizationalUnitId") REFERENCES "OrganizationalUnit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ResourceToResourceCapability" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ResourceToResourceCapability_A_fkey" FOREIGN KEY ("A") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResourceToResourceCapability_B_fkey" FOREIGN KEY ("B") REFERENCES "ResourceCapability" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ResourceToResourceAvailabilityOverride" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ResourceToResourceAvailabilityOverride_A_fkey" FOREIGN KEY ("A") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResourceToResourceAvailabilityOverride_B_fkey" FOREIGN KEY ("B") REFERENCES "ResourceAvailabilityOverride" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceKind_name_key" ON "ResourceKind"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceCapability_name_key" ON "ResourceCapability"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WorkingHoursSchema_name_key" ON "WorkingHoursSchema"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NationalHoliday_name_key" ON "NationalHoliday"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationalUnit_code_key" ON "OrganizationalUnit"("code");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationalUnit_name_key" ON "OrganizationalUnit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToResourceCapability_AB_unique" ON "_ResourceToResourceCapability"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToResourceCapability_B_index" ON "_ResourceToResourceCapability"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToResourceAvailabilityOverride_AB_unique" ON "_ResourceToResourceAvailabilityOverride"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToResourceAvailabilityOverride_B_index" ON "_ResourceToResourceAvailabilityOverride"("B");
