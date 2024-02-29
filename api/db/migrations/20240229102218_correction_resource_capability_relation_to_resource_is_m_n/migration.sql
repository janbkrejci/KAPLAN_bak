/*
  Warnings:

  - You are about to drop the column `resourceId` on the `ResourceCapability` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ResourceToResourceCapability" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ResourceToResourceCapability_A_fkey" FOREIGN KEY ("A") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResourceToResourceCapability_B_fkey" FOREIGN KEY ("B") REFERENCES "ResourceCapability" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResourceCapability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ResourceCapability" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ResourceCapability";
DROP TABLE "ResourceCapability";
ALTER TABLE "new_ResourceCapability" RENAME TO "ResourceCapability";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToResourceCapability_AB_unique" ON "_ResourceToResourceCapability"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToResourceCapability_B_index" ON "_ResourceToResourceCapability"("B");
