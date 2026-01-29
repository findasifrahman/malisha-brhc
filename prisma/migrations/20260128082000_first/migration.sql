-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'partner');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'partner',
    "phone" TEXT,
    "wechat" TEXT,
    "whatsapp" TEXT,
    "country" TEXT,
    "contactPerson" TEXT,
    "companyName" TEXT,
    "address" TEXT,
    "age" INTEGER,
    "profileImageId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "provinceId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospital" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "provinceId" UUID NOT NULL,
    "cityId" UUID NOT NULL,
    "address" TEXT,
    "description" TEXT,
    "shortDetails" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "specialty" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "hospitalId" UUID,
    "bio" TEXT,
    "shortDetails" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "shortDetails" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvancedHealthcareInChina" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "shortDetails" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdvancedHealthcareInChina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "shortDetails" TEXT[],
    "authorId" UUID NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogComment" (
    "id" UUID NOT NULL,
    "blogId" UUID NOT NULL,
    "userId" UUID,
    "name" TEXT,
    "email" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientStory" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "excerpt" TEXT,
    "content" TEXT,
    "shortDetails" TEXT[],
    "authorId" UUID,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" UUID NOT NULL,
    "key" TEXT,
    "url" TEXT NOT NULL,
    "keyOriginal" TEXT,
    "keyThumb" TEXT,
    "urlOriginal" TEXT,
    "urlThumb" TEXT,
    "mimeType" TEXT,
    "title" TEXT,
    "alt" TEXT,
    "sizeBytes" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMedia" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalMedia" (
    "id" UUID NOT NULL,
    "hospitalId" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HospitalMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorMedia" (
    "id" UUID NOT NULL,
    "doctorId" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceMedia" (
    "id" UUID NOT NULL,
    "serviceId" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvancedHealthcareInChinaMedia" (
    "id" UUID NOT NULL,
    "advancedId" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdvancedHealthcareInChinaMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogMedia" (
    "id" UUID NOT NULL,
    "blogId" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientStoryMedia" (
    "id" UUID NOT NULL,
    "patientStoryId" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientStoryMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryMedia" (
    "id" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Province_name_key" ON "Province"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_provinceId_name_key" ON "City"("provinceId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_slug_key" ON "Hospital"("slug");

-- CreateIndex
CREATE INDEX "Hospital_provinceId_idx" ON "Hospital"("provinceId");

-- CreateIndex
CREATE INDEX "Hospital_cityId_idx" ON "Hospital"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_slug_key" ON "Doctor"("slug");

-- CreateIndex
CREATE INDEX "Doctor_hospitalId_idx" ON "Doctor"("hospitalId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE INDEX "Service_serviceType_idx" ON "Service"("serviceType");

-- CreateIndex
CREATE UNIQUE INDEX "AdvancedHealthcareInChina_slug_key" ON "AdvancedHealthcareInChina"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE INDEX "Blog_authorId_idx" ON "Blog"("authorId");

-- CreateIndex
CREATE INDEX "BlogComment_blogId_idx" ON "BlogComment"("blogId");

-- CreateIndex
CREATE INDEX "BlogComment_userId_idx" ON "BlogComment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PatientStory_slug_key" ON "PatientStory"("slug");

-- CreateIndex
CREATE INDEX "PatientStory_authorId_idx" ON "PatientStory"("authorId");

-- CreateIndex
CREATE INDEX "Media_url_idx" ON "Media"("url");

-- CreateIndex
CREATE INDEX "Media_urlOriginal_idx" ON "Media"("urlOriginal");

-- CreateIndex
CREATE INDEX "UserMedia_mediaId_idx" ON "UserMedia"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMedia_userId_mediaId_key" ON "UserMedia"("userId", "mediaId");

-- CreateIndex
CREATE INDEX "HospitalMedia_mediaId_idx" ON "HospitalMedia"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "HospitalMedia_hospitalId_mediaId_key" ON "HospitalMedia"("hospitalId", "mediaId");

-- CreateIndex
CREATE INDEX "DoctorMedia_mediaId_idx" ON "DoctorMedia"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorMedia_doctorId_mediaId_key" ON "DoctorMedia"("doctorId", "mediaId");

-- CreateIndex
CREATE INDEX "ServiceMedia_mediaId_idx" ON "ServiceMedia"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceMedia_serviceId_mediaId_key" ON "ServiceMedia"("serviceId", "mediaId");

-- CreateIndex
CREATE INDEX "AdvancedHealthcareInChinaMedia_mediaId_idx" ON "AdvancedHealthcareInChinaMedia"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "AdvancedHealthcareInChinaMedia_advancedId_mediaId_key" ON "AdvancedHealthcareInChinaMedia"("advancedId", "mediaId");

-- CreateIndex
CREATE INDEX "BlogMedia_mediaId_idx" ON "BlogMedia"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogMedia_blogId_mediaId_key" ON "BlogMedia"("blogId", "mediaId");

-- CreateIndex
CREATE INDEX "PatientStoryMedia_mediaId_idx" ON "PatientStoryMedia"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "PatientStoryMedia_patientStoryId_mediaId_key" ON "PatientStoryMedia"("patientStoryId", "mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "GalleryMedia_mediaId_key" ON "GalleryMedia"("mediaId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogComment" ADD CONSTRAINT "BlogComment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogComment" ADD CONSTRAINT "BlogComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientStory" ADD CONSTRAINT "PatientStory_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedia" ADD CONSTRAINT "UserMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedia" ADD CONSTRAINT "UserMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalMedia" ADD CONSTRAINT "HospitalMedia_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalMedia" ADD CONSTRAINT "HospitalMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorMedia" ADD CONSTRAINT "DoctorMedia_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorMedia" ADD CONSTRAINT "DoctorMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceMedia" ADD CONSTRAINT "ServiceMedia_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceMedia" ADD CONSTRAINT "ServiceMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvancedHealthcareInChinaMedia" ADD CONSTRAINT "AdvancedHealthcareInChinaMedia_advancedId_fkey" FOREIGN KEY ("advancedId") REFERENCES "AdvancedHealthcareInChina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvancedHealthcareInChinaMedia" ADD CONSTRAINT "AdvancedHealthcareInChinaMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogMedia" ADD CONSTRAINT "BlogMedia_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogMedia" ADD CONSTRAINT "BlogMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientStoryMedia" ADD CONSTRAINT "PatientStoryMedia_patientStoryId_fkey" FOREIGN KEY ("patientStoryId") REFERENCES "PatientStory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientStoryMedia" ADD CONSTRAINT "PatientStoryMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryMedia" ADD CONSTRAINT "GalleryMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
