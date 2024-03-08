/*
  Warnings:

  - You are about to drop the column `workingHoursSchemaId` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `workingHoursSchemaId` to the `ResourceKind` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResourceKind" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hourlyCost" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "workingHoursSchemaId" TEXT NOT NULL,
    CONSTRAINT "ResourceKind_workingHoursSchemaId_fkey" FOREIGN KEY ("workingHoursSchemaId") REFERENCES "WorkingHoursSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResourceKind" ("createdAt", "hourlyCost", "id", "name", "updatedAt") SELECT "createdAt", "hourlyCost", "id", "name", "updatedAt" FROM "ResourceKind";
DROP TABLE "ResourceKind";
ALTER TABLE "new_ResourceKind" RENAME TO "ResourceKind";
CREATE UNIQUE INDEX "ResourceKind_name_key" ON "ResourceKind"("name");
CREATE TABLE "new_Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "managerId" TEXT,
    "resourceKindId" TEXT NOT NULL,
    "activeSince" DATETIME NOT NULL,
    "activeUntil" DATETIME,
    "organizationalUnitId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Resource_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Resource" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Resource_resourceKindId_fkey" FOREIGN KEY ("resourceKindId") REFERENCES "ResourceKind" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_organizationalUnitId_fkey" FOREIGN KEY ("organizationalUnitId") REFERENCES "OrganizationalUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("activeSince", "activeUntil", "createdAt", "id", "managerId", "name", "organizationalUnitId", "resourceKindId", "updatedAt") SELECT "activeSince", "activeUntil", "createdAt", "id", "managerId", "name", "organizationalUnitId", "resourceKindId", "updatedAt" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
