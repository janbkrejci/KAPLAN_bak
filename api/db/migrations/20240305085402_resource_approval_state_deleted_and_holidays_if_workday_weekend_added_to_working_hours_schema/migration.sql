/*
  Warnings:

  - You are about to drop the `ResourceLeaveApprovalState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `holiday` on the `WorkingHoursSchema` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ResourceLeaveApprovalState_name_key";

-- DropIndex
DROP INDEX "ResourceLeaveApprovalState_order_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ResourceLeaveApprovalState";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_ResourceKindToResourceLeaveType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ResourceKindToResourceLeaveType_A_fkey" FOREIGN KEY ("A") REFERENCES "ResourceKind" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResourceKindToResourceLeaveType_B_fkey" FOREIGN KEY ("B") REFERENCES "ResourceLeaveType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResourceLeave" (
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
    CONSTRAINT "ResourceLeave_resourceLeaveTypeId_fkey" FOREIGN KEY ("resourceLeaveTypeId") REFERENCES "ResourceLeaveType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ResourceLeave_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResourceLeave" ("createdAt", "description", "firstDayHours", "from", "id", "lastDayHours", "resourceId", "resourceLeaveApprovalStateId", "resourceLeaveTypeId", "to", "updatedAt") SELECT "createdAt", "description", "firstDayHours", "from", "id", "lastDayHours", "resourceId", "resourceLeaveApprovalStateId", "resourceLeaveTypeId", "to", "updatedAt" FROM "ResourceLeave";
DROP TABLE "ResourceLeave";
ALTER TABLE "new_ResourceLeave" RENAME TO "ResourceLeave";
CREATE TABLE "new_WorkingHoursSchema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "monday" INTEGER NOT NULL DEFAULT 8,
    "tuesday" INTEGER NOT NULL DEFAULT 8,
    "wednesday" INTEGER NOT NULL DEFAULT 8,
    "thursday" INTEGER NOT NULL DEFAULT 8,
    "friday" INTEGER NOT NULL DEFAULT 8,
    "saturday" INTEGER NOT NULL DEFAULT 0,
    "sunday" INTEGER NOT NULL DEFAULT 0,
    "holidayIfWorkDay" INTEGER NOT NULL DEFAULT 0,
    "holidayIfWeekend" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_WorkingHoursSchema" ("createdAt", "friday", "id", "monday", "name", "saturday", "sunday", "thursday", "tuesday", "updatedAt", "wednesday") SELECT "createdAt", "friday", "id", "monday", "name", "saturday", "sunday", "thursday", "tuesday", "updatedAt", "wednesday" FROM "WorkingHoursSchema";
DROP TABLE "WorkingHoursSchema";
ALTER TABLE "new_WorkingHoursSchema" RENAME TO "WorkingHoursSchema";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceKindToResourceLeaveType_AB_unique" ON "_ResourceKindToResourceLeaveType"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceKindToResourceLeaveType_B_index" ON "_ResourceKindToResourceLeaveType"("B");
