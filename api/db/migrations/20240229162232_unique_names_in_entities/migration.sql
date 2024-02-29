/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ResourceCapability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ResourceKind` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceCapability_name_key" ON "ResourceCapability"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceKind_name_key" ON "ResourceKind"("name");
