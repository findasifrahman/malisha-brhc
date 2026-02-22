-- CreateTable
CREATE TABLE "Team" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "shortDesc" TEXT,
    "fullDesc" TEXT,
    "mediaId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_slug_key" ON "Team"("slug");

-- CreateIndex
CREATE INDEX "Team_mediaId_idx" ON "Team"("mediaId");

-- CreateIndex
CREATE INDEX "Team_designation_idx" ON "Team"("designation");

-- CreateIndex
CREATE INDEX "Team_role_idx" ON "Team"("role");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
