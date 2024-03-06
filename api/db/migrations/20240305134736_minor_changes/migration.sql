/*
  Warnings:

  - You are about to drop the column `firstDayHours` on the `ResourceLeave` table. All the data in the column will be lost.
  - You are about to drop the column `lastDayHours` on the `ResourceLeave` table. All the data in the column will be lost.
  - Added the required column `firstDayWorkingHours` to the `ResourceLeave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastDayWorkingHours` to the `ResourceLeave` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResourceLeave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "firstDayWorkingHours" REAL NOT NULL,
    "lastDayWorkingHours" REAL NOT NULL,
    "resourceLeaveApprovalStateId" TEXT NOT NULL,
    "resourceLeaveTypeId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ResourceLeave_resourceLeaveTypeId_fkey" FOREIGN KEY ("resourceLeaveTypeId") REFERENCES "ResourceLeaveType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ResourceLeave_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResourceLeave" ("createdAt", "description", "from", "id", "resourceId", "resourceLeaveApprovalStateId", "resourceLeaveTypeId", "to", "updatedAt") SELECT "createdAt", "description", "from", "id", "resourceId", "resourceLeaveApprovalStateId", "resourceLeaveTypeId", "to", "updatedAt" FROM "ResourceLeave";
DROP TABLE "ResourceLeave";
ALTER TABLE "new_ResourceLeave" RENAME TO "ResourceLeave";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
