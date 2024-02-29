/*
  Warnings:

  - The primary key for the `Resource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ResourceCapability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ResourceKind` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "kindId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Resource_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Resource" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Resource_kindId_fkey" FOREIGN KEY ("kindId") REFERENCES "ResourceKind" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("createdAt", "id", "kindId", "name", "parentId", "updatedAt") SELECT "createdAt", "id", "kindId", "name", "parentId", "updatedAt" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE TABLE "new_ResourceCapability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ResourceCapability" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ResourceCapability";
DROP TABLE "ResourceCapability";
ALTER TABLE "new_ResourceCapability" RENAME TO "ResourceCapability";
CREATE TABLE "new__ResourceToResourceCapability" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ResourceToResourceCapability_A_fkey" FOREIGN KEY ("A") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResourceToResourceCapability_B_fkey" FOREIGN KEY ("B") REFERENCES "ResourceCapability" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ResourceToResourceCapability" ("A", "B") SELECT "A", "B" FROM "_ResourceToResourceCapability";
DROP TABLE "_ResourceToResourceCapability";
ALTER TABLE "new__ResourceToResourceCapability" RENAME TO "_ResourceToResourceCapability";
CREATE UNIQUE INDEX "_ResourceToResourceCapability_AB_unique" ON "_ResourceToResourceCapability"("A", "B");
CREATE INDEX "_ResourceToResourceCapability_B_index" ON "_ResourceToResourceCapability"("B");
CREATE TABLE "new_ResourceKind" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hourlyCost" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ResourceKind" ("createdAt", "hourlyCost", "id", "name", "updatedAt") SELECT "createdAt", "hourlyCost", "id", "name", "updatedAt" FROM "ResourceKind";
DROP TABLE "ResourceKind";
ALTER TABLE "new_ResourceKind" RENAME TO "ResourceKind";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
