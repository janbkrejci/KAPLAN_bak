/*
  Warnings:

  - You are about to drop the column `parentId` on the `Resource` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "managerId" TEXT,
    "resourceKindId" TEXT NOT NULL,
    "activeSince" DATETIME NOT NULL,
    "activeUntil" DATETIME,
    "workingHoursSchemaId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "organizationalUnitId" TEXT NOT NULL,
    CONSTRAINT "Resource_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Resource" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Resource_resourceKindId_fkey" FOREIGN KEY ("resourceKindId") REFERENCES "ResourceKind" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_workingHoursSchemaId_fkey" FOREIGN KEY ("workingHoursSchemaId") REFERENCES "WorkingHoursSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_organizationalUnitId_fkey" FOREIGN KEY ("organizationalUnitId") REFERENCES "OrganizationalUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("activeSince", "activeUntil", "createdAt", "id", "name", "organizationalUnitId", "resourceKindId", "updatedAt", "workingHoursSchemaId") SELECT "activeSince", "activeUntil", "createdAt", "id", "name", "organizationalUnitId", "resourceKindId", "updatedAt", "workingHoursSchemaId" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
