import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function splitCsvToArray(input: string) {
  return input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

async function main() {
  await prisma.galleryMedia.deleteMany()
  await prisma.patientStoryMedia.deleteMany()
  await prisma.blogMedia.deleteMany()
  await prisma.advancedHealthcareInChinaMedia.deleteMany()
  await prisma.serviceMedia.deleteMany()
  await prisma.doctorMedia.deleteMany()
  await prisma.hospitalMedia.deleteMany()
  await prisma.userMedia.deleteMany()
  await prisma.blogComment.deleteMany()
  await prisma.blog.deleteMany()
  await prisma.patientStory.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.hospital.deleteMany()
  await prisma.city.deleteMany()
  await prisma.province.deleteMany()
  await prisma.service.deleteMany()
  await prisma.advancedHealthcareInChina.deleteMany()
  await prisma.media.deleteMany()
  await prisma.user.deleteMany()

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@brhc.local' },
    update: {},
    create: {
      email: 'admin@brhc.local',
      passwordHash: 'dev-only',
      role: 'admin',
    },
  })

  const partnerUser = await prisma.user.upsert({
    where: { email: 'partner@brhc.local' },
    update: {},
    create: {
      email: 'partner@brhc.local',
      passwordHash: 'dev-only',
      role: 'partner',
    },
  })

  const provinces = await prisma.province.createMany({
    data: [{ name: 'Guangdong' }, { name: 'Zhejiang' }, { name: 'Sichuan' }],
  })

  void provinces

  const guangdong = await prisma.province.findFirstOrThrow({ where: { name: 'Guangdong' } })
  const zhejiang = await prisma.province.findFirstOrThrow({ where: { name: 'Zhejiang' } })
  const sichuan = await prisma.province.findFirstOrThrow({ where: { name: 'Sichuan' } })

  const cityRows = [
    { name: 'Guangzhou', provinceId: guangdong.id },
    { name: 'Shenzhen', provinceId: guangdong.id },
    { name: 'Hangzhou', provinceId: zhejiang.id },
    { name: 'Ningbo', provinceId: zhejiang.id },
    { name: 'Chengdu', provinceId: sichuan.id },
  ]

  await prisma.city.createMany({ data: cityRows })

  const cities = (await prisma.city.findMany()) as Array<{ id: string; name: string }>
  const cityByName = new Map<string, { id: string; name: string }>(cities.map((c) => [c.name, c]))

  const hospitalsInput = [
    {
      name: 'Guangzhou International Medical Center',
      city: 'Guangzhou',
      provinceId: guangdong.id,
      address: 'Tianhe District, Guangzhou',
      isFeatured: true,
      short: 'JCI-ready, English-speaking coordinators, VIP wards',
    },
    {
      name: 'Shenzhen Advanced Care Hospital',
      city: 'Shenzhen',
      provinceId: guangdong.id,
      address: 'Nanshan District, Shenzhen',
      isFeatured: true,
      short: 'Robotic surgery, Rapid appointments, International insurance support',
    },
    {
      name: 'Hangzhou Precision Health Clinic',
      city: 'Hangzhou',
      provinceId: zhejiang.id,
      address: 'Xihu District, Hangzhou',
      isFeatured: false,
      short: 'Genomics, Preventive programs, Personalized plans',
    },
    {
      name: 'Ningbo Cardio & Neuro Center',
      city: 'Ningbo',
      provinceId: zhejiang.id,
      address: 'Yinzhou District, Ningbo',
      isFeatured: false,
      short: 'Stroke unit, Cath lab, Multidisciplinary care',
    },
    {
      name: 'Chengdu Integrative Oncology Hospital',
      city: 'Chengdu',
      provinceId: sichuan.id,
      address: 'Jinjiang District, Chengdu',
      isFeatured: true,
      short: 'Targeted therapy, Immunotherapy, Nutrition support',
    },
  ]

  const hospitals = [] as Array<{ id: string; name: string; slug: string }>
  for (const h of hospitalsInput) {
    const city = cityByName.get(h.city)
    if (!city) throw new Error(`Missing city: ${h.city}`)

    const created = await prisma.hospital.create({
      data: {
        name: h.name,
        slug: slugify(h.name),
        isFeatured: h.isFeatured,
        provinceId: h.provinceId,
        cityId: city.id,
        address: h.address,
        description: `About ${h.name}.`,
        shortDetails: splitCsvToArray(h.short),
      },
    })

    hospitals.push({ id: created.id, name: created.name, slug: created.slug })
  }

  const doctorsInput = [
    {
      name: 'Dr. Li Wen',
      title: 'Chief Cardiologist',
      specialty: 'Cardiology',
      hospitalSlug: hospitals[0]?.slug,
      isFeatured: true,
      short: 'Interventional cardiology, 15+ years experience, English consultation',
    },
    {
      name: 'Dr. Zhang Rui',
      title: 'Neurosurgeon',
      specialty: 'Neurosurgery',
      hospitalSlug: hospitals[3]?.slug,
      isFeatured: true,
      short: 'Minimally invasive, Stroke care, Multilingual team',
    },
    {
      name: 'Dr. Chen Yu',
      title: 'Oncologist',
      specialty: 'Oncology',
      hospitalSlug: hospitals[4]?.slug,
      isFeatured: true,
      short: 'Immunotherapy, Tumor board, Supportive care',
    },
    {
      name: 'Dr. Wang Mei',
      title: 'Orthopedic Surgeon',
      specialty: 'Orthopedics',
      hospitalSlug: hospitals[1]?.slug,
      isFeatured: false,
      short: 'Joint replacement, Sports injuries, Rehab planning',
    },
    {
      name: 'Dr. Sun Hao',
      title: 'Gastroenterologist',
      specialty: 'Gastroenterology',
      hospitalSlug: hospitals[0]?.slug,
      isFeatured: false,
      short: 'Endoscopy, Liver care, International patient pathway',
    },
    {
      name: 'Dr. Xu Lin',
      title: 'Radiologist',
      specialty: 'Radiology',
      hospitalSlug: hospitals[2]?.slug,
      isFeatured: false,
      short: 'PET-CT, MRI, Second opinion',
    },
    {
      name: 'Dr. Gao Jing',
      title: 'Pediatrician',
      specialty: 'Pediatrics',
      hospitalSlug: hospitals[1]?.slug,
      isFeatured: false,
      short: 'Vaccination, Development checks, Family-friendly care',
    },
    {
      name: 'Dr. He Qiang',
      title: 'General Physician',
      specialty: 'Internal Medicine',
      hospitalSlug: null,
      isFeatured: false,
      short: 'Chronic disease management, Tele-consultation, Follow-up',
    },
  ]

  const doctors = [] as Array<{ id: string; slug: string; name: string }>
  for (const d of doctorsInput) {
    const hospital = d.hospitalSlug
      ? await prisma.hospital.findFirst({ where: { slug: d.hospitalSlug } })
      : null

    const created = await prisma.doctor.create({
      data: {
        name: d.name,
        slug: slugify(d.name),
        title: d.title,
        specialty: d.specialty,
        isFeatured: d.isFeatured,
        hospitalId: hospital?.id ?? null,
        bio: `${d.name} specializes in ${d.specialty}.`,
        shortDetails: splitCsvToArray(d.short),
      },
    })
    doctors.push({ id: created.id, slug: created.slug, name: created.name })
  }

  const servicesInput = [
    {
      name: 'Medical Visa Support',
      serviceType: 'International Support',
      featured: true,
      short: 'Invitation letters, Document guidance, Embassy coordination',
    },
    {
      name: 'Appointment Booking',
      serviceType: 'International Support',
      featured: true,
      short: 'Fast scheduling, Specialist matching, Priority slots',
    },
    {
      name: 'Second Opinion',
      serviceType: 'Clinical',
      featured: false,
      short: 'Remote review, Multidisciplinary board, Written report',
    },
    {
      name: 'Treatment Planning',
      serviceType: 'Clinical',
      featured: true,
      short: 'Care roadmap, Cost estimate, Timeline planning',
    },
    {
      name: 'Translation & Interpretation',
      serviceType: 'Patient Experience',
      featured: false,
      short: 'Medical interpretation, Document translation, On-site support',
    },
    {
      name: 'Post-Treatment Follow-up',
      serviceType: 'Patient Experience',
      featured: false,
      short: 'Lab tracking, Recovery check-ins, Re-visit scheduling',
    },
  ]

  const services = [] as Array<{ id: string; slug: string }>
  for (const s of servicesInput) {
    const created = await prisma.service.create({
      data: {
        name: s.name,
        slug: slugify(s.name),
        serviceType: s.serviceType,
        isFeatured: s.featured,
        description: `Service: ${s.name}.`,
        shortDetails: splitCsvToArray(s.short),
      },
    })
    services.push({ id: created.id, slug: created.slug })
  }

  const advancedInput = [
    {
      name: 'Robotic Surgery',
      featured: true,
      short: 'Da Vinci programs, Faster recovery, Precision procedures',
    },
    { name: 'CAR-T Therapy', featured: true, short: 'Hematologic cancers, Specialized centers, Follow-up care' },
    { name: 'Proton Therapy', featured: false, short: 'Radiation precision, Fewer side effects, Care planning' },
    { name: 'Genomic Testing', featured: true, short: 'Actionable mutations, Personalized medicine, Counseling' },
    { name: 'IVF & Fertility Care', featured: false, short: 'Protocols, Lab quality, International coordination' },
    { name: 'Stroke Intervention', featured: true, short: 'Rapid triage, Cath lab, Rehab pathway' },
  ]

  const advancedTopics = [] as Array<{ id: string; slug: string; name: string }>
  for (const a of advancedInput) {
    const created = await prisma.advancedHealthcareInChina.create({
      data: {
        name: a.name,
        slug: slugify(a.name),
        isFeatured: a.featured,
        description: `${a.name} in China: overview.`,
        shortDetails: splitCsvToArray(a.short),
      },
    })
    advancedTopics.push({ id: created.id, slug: created.slug, name: created.name })
  }

  const blogsInput = [
    {
      title: 'How to Choose a Hospital in China',
      featured: true,
      tags: 'hospital, planning, checklist',
      excerpt: 'A simple checklist for evaluating hospitals and teams.',
    },
    {
      title: 'Understanding Medical Visa Requirements',
      featured: true,
      tags: 'visa, international, documents',
      excerpt: 'What you need to prepare before traveling for care.',
    },
    {
      title: 'Robotic Surgery: What to Expect',
      featured: false,
      tags: 'robotic surgery, recovery, technology',
      excerpt: 'A practical overview for patients and families.',
    },
    {
      title: 'Second Opinion: When It Matters Most',
      featured: false,
      tags: 'second opinion, diagnosis, care',
      excerpt: 'Why a second opinion can improve outcomes.',
    },
    {
      title: 'Patient Journey: From First Call to Discharge',
      featured: false,
      tags: 'patient experience, coordination, timeline',
      excerpt: 'An end-to-end look at how coordination works.',
    },
    {
      title: 'Advanced Healthcare in China: Top Trends',
      featured: true,
      tags: 'advanced, innovation, china',
      excerpt: 'Six trends shaping advanced care pathways.',
    },
  ]

  const blogs = [] as Array<{ id: string; slug: string }>
  for (const b of blogsInput) {
    const created = await prisma.blog.create({
      data: {
        title: b.title,
        slug: slugify(b.title),
        excerpt: b.excerpt,
        content: `${b.excerpt}\n\nThis is sample content for: ${b.title}.`,
        isFeatured: b.featured,
        tags: splitCsvToArray(b.tags),
        shortDetails: splitCsvToArray('Trusted guidance, Clear steps, Coordinated support'),
        authorId: adminUser.id,
        publishedAt: new Date(),
      },
    })
    blogs.push({ id: created.id, slug: created.slug })
  }

  await prisma.blogComment.createMany({
    data: [
      {
        blogId: blogs[0]!.id,
        userId: partnerUser.id,
        content: 'Very helpful checklist. Thanks for sharing.',
      },
      {
        blogId: blogs[1]!.id,
        name: 'Guest Reader',
        email: 'guest@example.com',
        content: 'Do you provide document templates?',
      },
      {
        blogId: blogs[2]!.id,
        userId: adminUser.id,
        content: 'We can add a follow-up article on recovery timelines.',
      },
    ],
  })

  const patientStoriesInput = [
    {
      title: 'A Faster Path to Care',
      featured: true,
      excerpt: 'How coordinated scheduling reduced waiting time.',
    },
    {
      title: 'From Diagnosis to Confidence',
      featured: false,
      excerpt: 'A second opinion clarified the treatment plan.',
    },
  ]

  const stories = [] as Array<{ id: string; slug: string }>
  for (const s of patientStoriesInput) {
    const created = await prisma.patientStory.create({
      data: {
        title: s.title,
        slug: slugify(s.title),
        isFeatured: s.featured,
        excerpt: s.excerpt,
        content: `${s.excerpt}\n\nThis is a sample patient story: ${s.title}.`,
        shortDetails: splitCsvToArray('Coordinated care, Clear communication, Supportive team'),
        authorId: partnerUser.id,
        publishedAt: new Date(),
      },
    })
    stories.push({ id: created.id, slug: created.slug })
  }

  for (let i = 1; i <= 10; i += 1) {
    const media = await prisma.media.create({
      data: {
        key: `gallery/sample-${i}.jpg`,
        url: `https://picsum.photos/seed/brhc-${i}/1200/800`,
        keyOriginal: `gallery/sample-${i}.jpg`,
        keyThumb: `gallery/sample-${i}-thumb.webp`,
        urlOriginal: `https://picsum.photos/seed/brhc-${i}/1200/800`,
        urlThumb: `https://picsum.photos/seed/brhc-${i}/480/320`,
        mimeType: 'image/jpeg',
        title: `Gallery Image ${i}`,
        alt: `BRHC gallery image ${i}`,
        width: 1200,
        height: 800,
        sizeBytes: 250_000,
      },
    })

    await prisma.galleryMedia.create({
      data: {
        mediaId: media.id,
        sortOrder: i,
      },
    })
  }

  const attachMedia = async (label: string) => {
    return prisma.media.create({
      data: {
        key: `attached/${slugify(label)}.jpg`,
        url: `https://picsum.photos/seed/${encodeURIComponent(label)}/1200/800`,
        keyOriginal: `attached/${slugify(label)}.jpg`,
        keyThumb: `attached/${slugify(label)}-thumb.webp`,
        urlOriginal: `https://picsum.photos/seed/${encodeURIComponent(label)}/1200/800`,
        urlThumb: `https://picsum.photos/seed/${encodeURIComponent(label)}/480/320`,
        mimeType: 'image/jpeg',
        title: label,
        alt: label,
        width: 1200,
        height: 800,
        sizeBytes: 220_000,
      },
    })
  }

  const hospitalCover = await attachMedia('hospital-cover')
  await prisma.hospitalMedia.create({
    data: {
      hospitalId: hospitals[0]!.id,
      mediaId: hospitalCover.id,
      sortOrder: 1,
    },
  })

  const doctorPhoto = await attachMedia('doctor-photo')
  await prisma.doctorMedia.create({
    data: {
      doctorId: doctors[0]!.id,
      mediaId: doctorPhoto.id,
      sortOrder: 1,
    },
  })

  const serviceIcon = await attachMedia('service-icon')
  await prisma.serviceMedia.create({
    data: {
      serviceId: services[0]!.id,
      mediaId: serviceIcon.id,
      sortOrder: 1,
    },
  })

  const advancedCover = await attachMedia('advanced-cover')
  await prisma.advancedHealthcareInChinaMedia.create({
    data: {
      advancedId: advancedTopics[0]!.id,
      mediaId: advancedCover.id,
      sortOrder: 1,
    },
  })

  const blogCover = await attachMedia('blog-cover')
  await prisma.blogMedia.create({
    data: {
      blogId: blogs[0]!.id,
      mediaId: blogCover.id,
      sortOrder: 1,
    },
  })

  const storyCover = await attachMedia('patient-story-cover')
  await prisma.patientStoryMedia.create({
    data: {
      patientStoryId: stories[0]!.id,
      mediaId: storyCover.id,
      sortOrder: 1,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    throw e
  })
