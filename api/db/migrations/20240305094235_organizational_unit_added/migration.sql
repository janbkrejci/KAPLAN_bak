/*
  Warnings:

  - Added the required column `organizationalUnitId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "OrganizationalUnit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentOrganizationalUnitId" TEXT,
    CONSTRAINT "OrganizationalUnit_parentOrganizationalUnitId_fkey" FOREIGN KEY ("parentOrganizationalUnitId") REFERENCES "OrganizationalUnit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    "organizationalUnitId" TEXT NOT NULL,
    CONSTRAINT "Resource_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Resource" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Resource_resourceKindId_fkey" FOREIGN KEY ("resourceKindId") REFERENCES "ResourceKind" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_workingHoursSchemaId_fkey" FOREIGN KEY ("workingHoursSchemaId") REFERENCES "WorkingHoursSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_organizationalUnitId_fkey" FOREIGN KEY ("organizationalUnitId") REFERENCES "OrganizationalUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("activeSince", "activeUntil", "createdAt", "id", "name", "parentId", "resourceKindId", "updatedAt", "workingHoursSchemaId") SELECT "activeSince", "activeUntil", "createdAt", "id", "name", "parentId", "resourceKindId", "updatedAt", "workingHoursSchemaId" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationalUnit_code_key" ON "OrganizationalUnit"("code");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationalUnit_parentOrganizationalUnitId_key" ON "OrganizationalUnit"("parentOrganizationalUnitId");
