/*
  Warnings:

  - You are about to drop the column `kindId` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `activeSince` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceKindId` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workingHoursSchemaId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "WorkingHoursSchema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "monday" INTEGER NOT NULL DEFAULT 8,
    "tuesday" INTEGER NOT NULL DEFAULT 8,
    "wednesday" INTEGER NOT NULL DEFAULT 8,
    "thursday" INTEGER NOT NULL DEFAULT 8,
    "friday" INTEGER NOT NULL DEFAULT 8,
    "saturday" INTEGER NOT NULL DEFAULT 0,
    "sunday" INTEGER NOT NULL DEFAULT 0,
    "holiday" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ResourceLeave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "firstDayHours" INTEGER NOT NULL,
    "lastDayHours" INTEGER NOT NULL,
    "resourceLeaveApprovalStateId" TEXT NOT NULL,
    "resourceLeaveTypeId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ResourceLeave_resourceLeaveApprovalStateId_fkey" FOREIGN KEY ("resourceLeaveApprovalStateId") REFERENCES "ResourceLeaveApprovalState" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ResourceLeave_resourceLeaveTypeId_fkey" FOREIGN KEY ("resourceLeaveTypeId") REFERENCES "ResourceLeaveType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ResourceLeave_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ResourceLeaveApprovalState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ResourceLeaveType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "resourceKindId" TEXT NOT NULL,
    "activeSince" DATETIME NOT NULL,
    "activeUntil" DATETIME,
    "workingHoursSchemaId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Resource_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Resource" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Resource_resourceKindId_fkey" FOREIGN KEY ("resourceKindId") REFERENCES "ResourceKind" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_workingHoursSchemaId_fkey" FOREIGN KEY ("workingHoursSchemaId") REFERENCES "WorkingHoursSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("createdAt", "id", "name", "parentId", "updatedAt") SELECT "createdAt", "id", "name", "parentId", "updatedAt" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ResourceLeaveApprovalState_order_key" ON "ResourceLeaveApprovalState"("order");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceLeaveApprovalState_name_key" ON "ResourceLeaveApprovalState"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceLeaveType_name_key" ON "ResourceLeaveType"("name");
