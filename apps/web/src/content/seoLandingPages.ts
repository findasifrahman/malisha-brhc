export type SeoLandingSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type SeoFaq = {
  question: string
  answer: string
}

export type SeoResearchLink = {
  label: string
  url: string
  note: string
}

export type SeoLandingPage = {
  kind: 'guide' | 'location'
  routeName: string
  path: string
  title: string
  description: string
  keywords: string[]
  eyebrow: string
  heroLead: string
  highlights: string[]
  sections: SeoLandingSection[]
  faqs: SeoFaq[]
  researchLinks: SeoResearchLink[]
  relatedLinks: Array<{ label: string; to: string }>
  relatedBlogs?: Array<{ label: string; to: string }>
}

export const seoLandingPages: SeoLandingPage[] = [
  {
    kind: 'guide',
    routeName: 'seo-treatment-china-bangladesh',
    path: '/guides/treatment-in-china-from-bangladesh',
    title: 'Treatment in China from Bangladesh | BRHC',
    description:
      'A practical guide for Bangladeshi patients planning treatment in China, including hospital matching, report review, travel coordination, and support in Bangla and English.',
    keywords: [
      'treatment in China from Bangladesh',
      'Bangladeshi patients treatment in China',
      'medical tourism China Bangladesh',
      'China hospital support for Bangladesh patients',
      'Bangla medical travel support',
    ],
    eyebrow: 'Guide 01',
    heroLead:
      'Bangladeshi patients often want faster specialist access, a second opinion, or a clearer treatment plan. This guide explains the usual path from first inquiry to hospital admission in China.',
    highlights: ['Hospital matching', 'Report review', 'Travel coordination', 'Bangla support'],
    sections: [
      {
        title: 'What this journey usually looks like',
        paragraphs: [
          'A cross-border treatment plan is usually built in stages. First, the patient shares reports and a short medical summary. Then the family compares hospitals and specialist departments before a hospital is selected. After that, the visa, timing, and travel details are arranged around the treatment date.',
          'For many families, the hardest part is not the treatment itself, but knowing where to start. A structured process reduces confusion and helps the patient move from search mode to a clear care plan.',
        ],
        bullets: [
          'Share the diagnosis, scans, pathology, prescriptions, and discharge summaries.',
          'Choose the right department before you book travel.',
          'Keep a written timeline for admission, consultation, treatment, and follow-up.',
        ],
      },
      {
        title: 'How BRHC-style support helps',
        paragraphs: [
          'The strongest medical tourism support is not just about booking a hospital. It is about matching the patient to the right hospital, the right specialty, and the right pace of care. That is especially important when the case is complex or when the family is dealing with cancer, surgery, or chronic illness.',
          'Bangladesh patients also need clear communication. Support in Bangla and English makes it easier to understand test requirements, hospital instructions, estimated stay length, and discharge follow-up.',
        ],
        bullets: [
          'Shortlist hospitals based on the case, not just the city name.',
          'Ask for a realistic estimate of stay, testing, and follow-up time.',
          'Confirm whether the hospital has an international patient workflow.',
        ],
      },
      {
        title: 'What to prepare before you request a quote',
        paragraphs: [
          'The quality of the first medical review depends on the quality of the files you send. A clean PDF set of reports, images, and a short timeline helps the receiving hospital give a more useful opinion.',
        ],
        bullets: [
          'Passport copy and full contact details.',
          'Diagnosis summary in English if available.',
          'Recent scans, lab results, and pathology reports.',
          'Current medicines and allergies.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a Bangladesh family ask for only an online review first?',
        answer:
          'Yes. Many patients start with a document review or a second opinion before deciding whether to travel. That reduces risk and helps the family understand whether China is the right next step.',
      },
      {
        question: 'Do I need all my reports translated before sending them?',
        answer:
          'Not always, but translated reports are helpful. Even when the original files are sent first, a short English summary makes it easier for the hospital to review the case quickly.',
      },
      {
        question: 'What kinds of cases are commonly searched by Bangladesh patients?',
        answer:
          'Cancer, surgery, orthopedics, cardiology, neurology, fertility, and complex diagnostic cases are among the most common searches for treatment in China from Bangladesh.',
      },
    ],
    researchLinks: [
      {
        label: 'China National Health Commission - Hospitals',
        url: 'https://en.nhc.gov.cn/hospitals.html',
        note: 'Overview of hospital types and regions in China.',
      },
      {
        label: 'China-Bangladesh Medical Tourism Promotion Conference',
        url: 'https://bd.china-embassy.gov.cn/eng/dshd/202501/t20250102_11525626.htm',
        note: 'Signals growing official support and interest in medical tourism.',
      },
      {
        label: 'Outpatient visiting process for international patients',
        url: 'https://en.nhc.gov.cn/2025-12/12/c_86536.htm',
        note: 'Shows the international-patient flow inside Chinese hospitals.',
      },
      {
        label: 'Foreign-owned hospitals in China',
        url: 'https://en.nhc.gov.cn/2024-12/17/c_86381.htm',
        note: 'Shows expanding options for international patients.',
      },
    ],
    relatedLinks: [
      { label: 'China medical visa from Bangladesh', to: '/guides/china-medical-visa-from-bangladesh' },
      { label: 'Cancer treatment in China', to: '/guides/cancer-treatment-in-china-from-bangladesh' },
      { label: 'Surgery cost in Guangzhou', to: '/guides/surgery-cost-in-guangzhou' },
      { label: 'Best hospitals in China', to: '/guides/best-hospitals-in-china-for-bangladeshi-patients' },
    ],
    relatedBlogs: [
      { label: 'Bangladesh treatment checklist for China', to: '/blogs/bangladesh-treatment-checklist-for-china' },
      { label: 'How to choose a hospital in China for Bangladeshi patients', to: '/blogs/how-to-choose-a-hospital-in-china-for-bangladeshi-patients' },
    ],
  },
  {
    kind: 'guide',
    routeName: 'seo-china-medical-visa',
    path: '/guides/china-medical-visa-from-bangladesh',
    title: 'China Medical Visa from Bangladesh | BRHC',
    description:
      'Step-by-step guidance on China medical visa support from Bangladesh, including the green channel, simplified document flow, and helpful visa resources.',
    keywords: [
      'China medical visa from Bangladesh',
      'medical visa China Bangladesh',
      'Bangladesh medical visa China',
      'China visa for treatment',
      'medical treatment visa China',
    ],
    eyebrow: 'Guide 02',
    heroLead:
      'The China medical visa process has become more streamlined for Bangladeshi patients. This guide explains the current steps, practical documents, and the special facilitation measures now available in Dhaka.',
    highlights: ['Green channel', 'Dhaka counter', 'Simplified docs', 'Priority review'],
    sections: [
      {
        title: 'What the green channel means',
        paragraphs: [
          'The Chinese Embassy in Bangladesh has introduced special facilitation measures for medical treatment visas, including a green channel, dedicated hotlines, and a medical visa counter in Dhaka. That is a meaningful improvement for families who need faster processing and clearer direction.',
          'For many patients, the key benefit is not just speed. It is also the reduced friction around document handling, interviews, and follow-up questions.',
        ],
        bullets: [
          'Medical visa files can get priority review.',
          'Urgent medical cases may qualify for same-day visa issuance.',
          'Local travel agencies with valid licenses may help issue guarantee letters in some situations.',
        ],
      },
      {
        title: 'Practical documents to prepare',
        paragraphs: [
          'The exact file list may vary by case, but the core idea is simple: prove the medical purpose clearly and keep the application consistent. Families should prepare the hospital invitation or supporting letter, passport, photos, and any other documents requested by the service center.',
        ],
        bullets: [
          'Passport and completed application form.',
          'Hospital appointment or medical support letter.',
          'A short explanation of the diagnosis and treatment purpose.',
          'Supporting travel or guarantee documents if requested.',
        ],
      },
      {
        title: 'How to reduce delays',
        paragraphs: [
          'Delays usually happen when the case file is incomplete or when the treatment plan is still unclear. The best approach is to first confirm the hospital and treatment purpose, then prepare the visa documents around that plan.',
        ],
        bullets: [
          'Do not submit a vague treatment request without a hospital path.',
          'Use the embassy and visa-center guidance for medical cases.',
          'Keep phone numbers and WhatsApp contact details in one place.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I still need to go through an interview?',
        answer:
          'The current simplified process still includes an interview step, but the application flow is lighter than before and medical cases can receive priority handling.',
      },
      {
        question: 'Can a family member help with the paperwork?',
        answer:
          'Yes. In many medical cases the family or a licensed travel partner helps organize documents, especially when the patient is unwell or needs urgent travel.',
      },
      {
        question: 'Where should I ask if my case is urgent?',
        answer:
          'The Chinese Embassy and the Visa Application Service Center in Dhaka both publish direct contact details for medical treatment visa inquiries, and the embassy notice explains the green channel.',
      },
    ],
    researchLinks: [
      {
        label: 'Embassy green channel for medical treatment visas',
        url: 'https://bd.china-embassy.gov.cn/eng/lsyw/Chinese_Visa/202505/t20250504_11615417.htm',
        note: 'Official notice on simplified medical visa support.',
      },
      {
        label: 'Simplified application notice for medical visas',
        url: 'https://bio.visaforchina.cn/DAC3_EN/tongzhigonggao/409187100680916992.html',
        note: 'Shows the current interview and service-center flow.',
      },
      {
        label: 'Chinese Visa Application Service Center in Dhaka',
        url: 'https://www.visaforchina.cn/DAC3_EN/',
        note: 'Official service-center homepage for visa guidance.',
      },
      {
        label: 'Embassy contact information',
        url: 'https://bd.china-embassy.gov.cn/eng/lxwm/',
        note: 'Direct embassy contact details in Bangladesh.',
      },
    ],
    relatedLinks: [
      { label: 'Treatment in China from Bangladesh', to: '/guides/treatment-in-china-from-bangladesh' },
      { label: 'Cancer treatment in China', to: '/guides/cancer-treatment-in-china-from-bangladesh' },
      { label: 'Best hospitals in China', to: '/guides/best-hospitals-in-china-for-bangladeshi-patients' },
      { label: 'Contact BRHC', to: '/contact' },
    ],
    relatedBlogs: [
      { label: 'China medical visa step-by-step guide', to: '/blogs/china-medical-visa-from-bangladesh-step-by-step-guide' },
      { label: 'Understanding medical visa requirements', to: '/blogs/understanding-medical-visa-requirements' },
    ],
  },
  {
    kind: 'guide',
    routeName: 'seo-cancer-treatment-china',
    path: '/guides/cancer-treatment-in-china-from-bangladesh',
    title: 'Cancer Treatment in China from Bangladesh | BRHC',
    description:
      'A focused guide for Bangladeshi cancer patients planning care in China, with hospital selection, international patient steps, treatment planning, and research links.',
    keywords: [
      'cancer treatment in China from Bangladesh',
      'Bangladesh cancer treatment China',
      'Guangzhou cancer hospital',
      'international cancer hospital China',
      'oncology treatment China',
    ],
    eyebrow: 'Guide 03',
    heroLead:
      'Cancer cases usually need careful planning, rapid review of pathology and imaging, and a hospital that can coordinate surgery, radiation, chemotherapy, and follow-up care under one roof.',
    highlights: ['Oncology focus', 'Radiation planning', 'Pathology review', 'International patients'],
    sections: [
      {
        title: 'Why cancer patients look at China',
        paragraphs: [
          'For many families, China is attractive because major hospitals can combine diagnosis, staging, surgery, radiation, and systemic treatment in one coordinated workflow. That matters when time is limited and the family wants a clear specialist opinion.',
          'In Guangzhou, the Sun Yat-sen University Cancer Center is one of the most recognized cancer hospitals and it publishes international-patient guidance in English.',
        ],
        bullets: [
          'Large cancer centers can offer multidisciplinary evaluation.',
          'International patient guidance helps foreign families navigate appointments.',
          'Bangla/English support makes report review and planning easier.',
        ],
      },
      {
        title: 'What to send before you request an oncology opinion',
        paragraphs: [
          'Oncology teams usually want the cleanest possible file set. A detailed diagnosis summary, pathology report, scan images, and recent discharge notes make it easier to determine whether surgery, radiation, chemotherapy, targeted therapy, or a second opinion is the right next step.',
        ],
        bullets: [
          'Pathology report and biopsy results.',
          'PET-CT, CT, MRI, or ultrasound reports.',
          'A list of medicines already used.',
          'Any previous surgery or radiation history.',
        ],
      },
      {
        title: 'What families should ask before traveling',
        paragraphs: [
          'The right questions save time and money. Families should ask whether the case needs inpatient admission, whether a translator or international coordinator is available, and what the expected length of stay is after the first consult.',
        ],
        bullets: [
          'Is there a dedicated international patient desk?',
          'What treatment path is most likely after review?',
          'Will the hospital coordinate radiation, surgery, and follow-up if needed?',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Guangzhou a realistic option for cancer care?',
        answer:
          'Yes, especially for patients looking at large oncology centers and coordinated international services. The city has major hospitals with recognized cancer departments and foreign-patient workflows.',
      },
      {
        question: 'Do cancer patients need to translate all files before sending them?',
        answer:
          'English summaries help a lot, but the most important part is to send clear scans and pathology results quickly. Translation can be finalized alongside the review process.',
      },
      {
        question: 'Can a family get a second opinion before travel?',
        answer:
          'Yes. For cancer, a second opinion is often a smart first step because it helps the family understand staging, urgency, and whether China is the right place to continue care.',
      },
    ],
    researchLinks: [
      {
        label: 'Sun Yat-sen University Cancer Center',
        url: 'https://english.sysucc.org.cn/index.aspx',
        note: 'Major Guangzhou cancer center with English information.',
      },
      {
        label: 'International patient guide at SYSUCC',
        url: 'https://english.sysucc.org.cn/index_24.aspx',
        note: 'Explains appointment flow for foreign patients.',
      },
      {
        label: 'Cancer center address and contact',
        url: 'https://english.sysucc.org.cn/index_22.aspx',
        note: 'Useful for location and contact details.',
      },
      {
        label: 'NHC article on cancer drugs and treatment access',
        url: 'https://en.nhc.gov.cn/2019-01/11/c_74154.htm',
        note: 'Shows ongoing cancer-treatment innovation in China.',
      },
    ],
    relatedLinks: [
      { label: 'China medical visa from Bangladesh', to: '/guides/china-medical-visa-from-bangladesh' },
      { label: 'Surgery cost in Guangzhou', to: '/guides/surgery-cost-in-guangzhou' },
      { label: 'Best hospitals in China', to: '/guides/best-hospitals-in-china-for-bangladeshi-patients' },
      { label: 'Treatment in China from Bangladesh', to: '/guides/treatment-in-china-from-bangladesh' },
    ],
    relatedBlogs: [
      { label: 'Cancer treatment in China from Bangladesh', to: '/blogs/cancer-treatment-in-china-from-bangladesh-what-families-should-prepare' },
      { label: 'Advanced healthcare in China: top trends', to: '/blogs/advanced-healthcare-in-china-top-trends' },
    ],
  },
  {
    kind: 'guide',
    routeName: 'seo-surgery-cost-guangzhou',
    path: '/guides/surgery-cost-in-guangzhou',
    title: 'Surgery Cost in Guangzhou | BRHC',
    description:
      'Reference pricing and planning tips for surgery cost in Guangzhou, including what affects the final bill, how to compare quotes, and what to ask hospitals.',
    keywords: [
      'surgery cost in Guangzhou',
      'Guangzhou surgery price',
      'Guangzhou operation cost',
      'China surgery cost',
      'Bangladesh surgery in China',
    ],
    eyebrow: 'Guide 04',
    heroLead:
      'Searchers usually want one thing: a realistic estimate. For surgery in Guangzhou, the final price depends on the procedure, the hospital tier, implants, anesthesia, hospital stay, and how much aftercare is needed.',
    highlights: ['Price ranges', 'Quote comparison', 'Hospital fees', 'Recovery planning'],
    sections: [
      {
        title: 'Why prices vary so much',
        paragraphs: [
          'Surgery pricing is not one number. A minor laparoscopic procedure, a major cancer resection, and a robotic operation can each sit in very different price bands. In Guangzhou, medical travel guides show that prices vary by procedure and facility type, and they can change with the length of stay and what is included in the quote.',
        ],
        bullets: [
          'Procedure complexity.',
          'Type of anesthesia and operating time.',
          'Implants, consumables, and medicines.',
          'Length of stay and rehabilitation needs.',
        ],
      },
      {
        title: 'Reference ranges from live guides',
        paragraphs: [
          'As market references, Bookimed lists surgery in Guangzhou at an average of about US$11,350 with examples starting around US$7,200, while ClinicsOnCall notes that simple laparoscopic surgeries may start around EUR 2,000 and more complex operations cost more. These are reference guides, not final hospital quotes.',
        ],
        bullets: [
          'Use the range only as a planning guide.',
          'Always ask the hospital for an itemized quote.',
          'Confirm whether follow-up visits are included.',
        ],
      },
      {
        title: 'How to compare surgery quotes',
        paragraphs: [
          'A good quote should separate the operating fee, medicines, tests, ward charges, and the expected follow-up. If the quote is too vague, the family can end up paying more later. A clear comparison sheet saves time and reduces surprises.',
        ],
        bullets: [
          'Ask what is included and what is excluded.',
          'Ask whether the quote covers complications or extra nights.',
          'Ask whether translations and international support are included.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the published price the final price?',
        answer:
          'No. It is usually a reference price. The final cost depends on the surgeon, hospital level, medicine, implants, and the patient’s recovery path.',
      },
      {
        question: 'Are public hospitals cheaper than foreign-run hospitals?',
        answer:
          'Often yes. Public hospitals can be much cheaper, while foreign-run or VIP-style facilities may cost more because of added services and international support.',
      },
      {
        question: 'Can BRHC help compare quotes from different hospitals?',
        answer:
          'Yes. The point of a support partner is to help the family compare apples to apples, not just the headline number on a quote.',
      },
    ],
    researchLinks: [
      {
        label: 'Bookimed surgery in Guangzhou cost guide',
        url: 'https://us-uk.bookimed.com/clinics/country%3Dchina/city%3Dguangzhou/procedure%3Dsurgery/',
        note: 'Reference pricing and procedure examples.',
      },
      {
        label: 'ClinicsOnCall surgery in Guangzhou',
        url: 'https://clinicsoncall.com/en/clinics/country-china/city-guangzhou/surgery/',
        note: 'General guidance on cost variation and procedure types.',
      },
      {
        label: 'China hospital overview from NHC',
        url: 'https://en.nhc.gov.cn/2019-03/19/c_75863.htm',
        note: 'Explains hospital types and public/private differences.',
      },
      {
        label: 'Guangzhou patient-care example',
        url: 'https://en.nhc.gov.cn/2019-05/28/c_75302.htm',
        note: 'Shows multidisciplinary surgical care in Guangzhou.',
      },
    ],
    relatedLinks: [
      { label: 'Treatment in China from Bangladesh', to: '/guides/treatment-in-china-from-bangladesh' },
      { label: 'China medical visa from Bangladesh', to: '/guides/china-medical-visa-from-bangladesh' },
      { label: 'Cancer treatment in China', to: '/guides/cancer-treatment-in-china-from-bangladesh' },
      { label: 'Best hospitals in China', to: '/guides/best-hospitals-in-china-for-bangladeshi-patients' },
    ],
    relatedBlogs: [
      { label: 'How to estimate surgery cost in Guangzhou', to: '/blogs/how-to-estimate-surgery-cost-in-guangzhou' },
      { label: 'Robotic surgery: what to expect', to: '/blogs/robotic-surgery-what-to-expect' },
    ],
  },
  {
    kind: 'guide',
    routeName: 'seo-best-hospitals-china-bangladesh',
    path: '/guides/best-hospitals-in-china-for-bangladeshi-patients',
    title: 'Best Hospitals in China for Bangladeshi Patients | BRHC',
    description:
      'How to choose the best hospitals in China for Bangladeshi patients, with criteria for international care, specialty departments, region choice, and hospital comparison.',
    keywords: [
      'best hospitals in China for Bangladeshi patients',
      'top hospitals in China',
      'China hospital list',
      'international hospitals in China',
      'Bangladesh patient hospital choice',
    ],
    eyebrow: 'Guide 05',
    heroLead:
      'There is no single best hospital for everyone. The right choice depends on the disease, the specialty, the city, language support, and whether the hospital has a clear international-patient path.',
    highlights: ['Specialty fit', 'Language support', 'International desk', 'Region choice'],
    sections: [
      {
        title: 'What to look for first',
        paragraphs: [
          'The best hospital for a Bangladeshi patient is usually the one that matches the medical need, not the one with the biggest brand name. The first filter should be specialty, followed by international-patient support, communication, and location.',
        ],
        bullets: [
          'Does the hospital have the correct specialty for the case?',
          'Is there an international patient desk or coordinator?',
          'Can the hospital handle reports, payment, and follow-up cleanly?',
        ],
      },
      {
        title: 'Public, VIP, and foreign-run options',
        paragraphs: [
          'China has public hospitals, VIP wards, foreign-run hospitals, and joint-venture facilities. Public hospitals can be more affordable, while foreign-run or VIP services may offer more language support or a more personalized environment. The right choice depends on budget and case complexity.',
        ],
        bullets: [
          'Public hospitals are often the best value for major treatment.',
          'Foreign-run facilities may be easier for international communication.',
          'Some cities now have dedicated international divisions or foreign-owned hospitals.',
        ],
      },
      {
        title: 'Regions worth comparing',
        paragraphs: [
          'For international patients, Guangzhou, Shanghai, Beijing, Tianjin, and Hainan often come up in search because of specialty depth and hospital infrastructure. Guangzhou is especially strong for oncology and surgery-related searches.',
        ],
        bullets: [
          'Guangzhou for oncology and surgery.',
          'Hainan for medical tourism style care.',
          'Tianjin and other large cities for expanding foreign-investment options.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Should I choose a hospital only because it is famous?',
        answer:
          'No. The right hospital is the one that matches your diagnosis and support needs. Fame is helpful, but specialty fit matters more.',
      },
      {
        question: 'Are public hospitals okay for foreign patients?',
        answer:
          'Yes. Many public hospitals treat foreigners, and in some cases they are cheaper and more clinically suitable than private options.',
      },
      {
        question: 'How do I avoid choosing the wrong hospital?',
        answer:
          'Ask for a written review of the case, compare specialty departments, and make sure the hospital can actually handle the procedure you need.',
      },
    ],
    researchLinks: [
      {
        label: 'China National Health Commission - Hospitals',
        url: 'https://en.nhc.gov.cn/hospitals.html',
        note: 'Official overview of hospital types and regions.',
      },
      {
        label: 'Hospitals in China - NHC explainer',
        url: 'https://en.nhc.gov.cn/2019-03/19/c_75863.htm',
        note: 'Public vs private and foreign-run hospital context.',
      },
      {
        label: 'Foreign-owned hospital licensing in China',
        url: 'https://en.nhc.gov.cn/2024-12/17/c_86381.htm',
        note: 'Shows the market opening for foreign-invested hospitals.',
      },
      {
        label: 'Outpatient visiting process for international patients',
        url: 'https://en.nhc.gov.cn/2025-12/12/c_86536.htm',
        note: 'Useful for understanding hospital workflow.',
      },
    ],
    relatedLinks: [
      { label: 'Treatment in China from Bangladesh', to: '/guides/treatment-in-china-from-bangladesh' },
      { label: 'China medical visa from Bangladesh', to: '/guides/china-medical-visa-from-bangladesh' },
      { label: 'Cancer treatment in China', to: '/guides/cancer-treatment-in-china-from-bangladesh' },
      { label: 'Surgery cost in Guangzhou', to: '/guides/surgery-cost-in-guangzhou' },
    ],
    relatedBlogs: [
      { label: 'How to choose a hospital in China', to: '/blogs/how-to-choose-a-hospital-in-china' },
      { label: 'Patient journey from first call to discharge', to: '/blogs/patient-journey-from-first-call-to-discharge' },
    ],
  },
  {
    kind: 'location',
    routeName: 'seo-guangzhou-treatment-page',
    path: '/guides/guangzhou-treatment-guide',
    title: 'Guangzhou Treatment Guide | BRHC',
    description:
      'A Guangzhou-focused guide for Bangladeshi patients looking at oncology, surgery, international hospitals, and the practical steps around travel and treatment.',
    keywords: [
      'Guangzhou treatment guide',
      'Guangzhou hospitals',
      'treatment in Guangzhou from Bangladesh',
      'Guangzhou cancer hospital',
      'Guangzhou surgery cost',
    ],
    eyebrow: 'City Guide',
    heroLead:
      'Guangzhou is one of the most searched cities for treatment in China because it combines large hospitals, specialist departments, and a long history of international patient care.',
    highlights: ['Oncology', 'Surgery', 'International care', 'City travel'],
    sections: [
      {
        title: 'Why Guangzhou is a common treatment search',
        paragraphs: [
          'Guangzhou appears in many patient searches because it has large tertiary hospitals, specialist cancer centers, and a practical airport-and-hospital ecosystem for medical travel.',
          'For Bangladeshi families, the city is often a natural place to compare oncology, general surgery, cardiology, and digestive disease care.',
        ],
        bullets: [
          'Major hospitals have strong specialty departments.',
          'International patients can often find translation or coordination support.',
          'The city is already known in medical tourism search results.',
        ],
      },
      {
        title: 'What to compare in Guangzhou',
        paragraphs: [
          'Do not compare city names alone. Compare the hospital, the department, the surgeon or oncologist, and the estimated treatment pathway. A smaller department in a strong hospital can be more useful than a famous name with poor fit for your diagnosis.',
        ],
        bullets: [
          'Cancer center reputation and patient volume.',
          'Surgery expertise and inpatient workflow.',
          'Whether the hospital has an international patient office.',
        ],
      },
      {
        title: 'Practical travel and timing tips',
        paragraphs: [
          'If the patient is coming for surgery or cancer treatment, the family should plan a buffer day for arrival and initial registration. In many cases, the first consultation may decide whether extra scans or pre-op tests are needed.',
        ],
        bullets: [
          'Arrive early enough to allow for registration and checks.',
          'Keep scans and reports in one easy-to-send folder.',
          'Ask whether treatment can begin soon after the first consult.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Guangzhou better for cancer or surgery?',
        answer:
          'It is strong for both, but the right answer depends on the department and the hospital. Many families use Guangzhou as a first comparison city for oncology and surgery.',
      },
      {
        question: 'Should I book travel before I get a hospital review?',
        answer:
          'It is usually better to get at least a first hospital review before finalizing travel. That keeps the schedule and cost more predictable.',
      },
      {
        question: 'Can BRHC help compare Guangzhou hospitals with other cities?',
        answer:
          'Yes. Comparing Guangzhou with cities like Kunming, Shanghai, or Beijing can reveal very different cost and specialty profiles.',
      },
    ],
    researchLinks: [
      {
        label: 'Sun Yat-sen University Cancer Center',
        url: 'https://english.sysucc.org.cn/index.aspx',
        note: 'Guangzhou’s major cancer center with English resources.',
      },
      {
        label: 'International patient guide at SYSUCC',
        url: 'https://english.sysucc.org.cn/index_24.aspx',
        note: 'Useful for foreign-patient appointment workflow.',
      },
      {
        label: 'China hospital overview',
        url: 'https://en.nhc.gov.cn/hospitals.html',
        note: 'Official hospital types and regional pages.',
      },
      {
        label: 'Guangzhou hospital care example',
        url: 'https://en.nhc.gov.cn/2019-05/28/c_75302.htm',
        note: 'Shows multidisciplinary care in Guangzhou.',
      },
    ],
    relatedLinks: [
      { label: 'Surgery cost in Guangzhou', to: '/guides/surgery-cost-in-guangzhou' },
      { label: 'Cancer treatment in China', to: '/guides/cancer-treatment-in-china-from-bangladesh' },
      { label: 'China medical visa from Bangladesh', to: '/guides/china-medical-visa-from-bangladesh' },
      { label: 'Best hospitals in China', to: '/guides/best-hospitals-in-china-for-bangladeshi-patients' },
    ],
    relatedBlogs: [
      { label: 'How to estimate surgery cost in Guangzhou', to: '/blogs/how-to-estimate-surgery-cost-in-guangzhou' },
      { label: 'How to choose a hospital in China', to: '/blogs/how-to-choose-a-hospital-in-china' },
    ],
  },
  {
    kind: 'location',
    routeName: 'seo-kunming-treatment-page',
    path: '/guides/kunming-treatment-guide',
    title: 'Kunming Treatment Guide | BRHC',
    description:
      'A Kunming-focused treatment page for Bangladeshi patients exploring Yunnan, cross-border care, cost planning, and city-based hospital selection.',
    keywords: [
      'Kunming treatment guide',
      'Kunming hospitals',
      'treatment in Kunming from Bangladesh',
      'Yunnan treatment',
      'Kunming medical travel',
    ],
    eyebrow: 'City Guide',
    heroLead:
      'Kunming is a helpful comparison city for Bangladeshi families who want to look beyond the biggest medical hubs and compare travel, hospital access, and treatment planning in Yunnan.',
    highlights: ['Yunnan', 'City access', 'Regional care', 'Comparison city'],
    sections: [
      {
        title: 'Why Kunming enters the search journey',
        paragraphs: [
          'Kunming often appears in broader China research because Yunnan has growing cross-border health cooperation and a practical regional-healthcare identity. For some families, that makes it a useful city to compare alongside Guangzhou.',
        ],
        bullets: [
          'Useful for comparing regional care options.',
          'Can be relevant when families want a less saturated city than Beijing or Shanghai.',
          'Appears in policy and health cooperation discussions in Yunnan.',
        ],
      },
      {
        title: 'What to ask before choosing Kunming',
        paragraphs: [
          'Ask the same questions you would ask for any city: the right department, the right diagnosis pathway, the length of stay, and whether the hospital can coordinate translation and discharge follow-up.',
        ],
        bullets: [
          'Does the hospital have the needed specialty?',
          'How will the hospital handle tests and follow-up?',
          'Is there a local support system for foreign patients?',
        ],
      },
      {
        title: 'When Kunming can be a good fit',
        paragraphs: [
          'Kunming can be a fit when the family wants to compare costs and patient flow with a city that is not as commonly searched as Guangzhou. It is especially useful when the treatment decision is still exploratory.',
        ],
        bullets: [
          'Early-stage comparisons.',
          'Regional travel planning.',
          'Families who want more than one city option before committing.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Kunming a major medical tourism city?',
        answer:
          'It is better thought of as a useful comparison city in Yunnan rather than the single biggest medical-tourism hub. For some patients, that makes it a smart secondary option.',
      },
      {
        question: 'Should I compare Kunming with Guangzhou?',
        answer:
          'Yes, if you want to compare city size, cost, and specialty concentration. Different cities can lead to very different treatment experiences.',
      },
      {
        question: 'Can BRHC help decide if Kunming or Guangzhou is better?',
        answer:
          'Yes. The best city depends on diagnosis, timing, budget, and the hospital’s specialty strength.',
      },
    ],
    researchLinks: [
      {
        label: 'Yunnan policy and investment portal',
        url: 'https://invest.yn.gov.cn/contents/64/11180.html',
        note: 'Official Yunnan/Kunming investment and city information.',
      },
      {
        label: 'Kunming and Yunnan travel coverage',
        url: 'https://english.yunnan.cn/html/2019/travel_0927/17830.html',
        note: 'Useful regional context for Kunming.',
      },
      {
        label: 'Kunming international cooperation in organ donation/transplant',
        url: 'https://en.nhc.gov.cn/2019-12/10/c_75898.htm',
        note: 'Shows Kunming’s role in health cooperation.',
      },
      {
        label: 'Kunming credit-payment healthcare example',
        url: 'https://m.yunnan.cn/system/2026/06/04/034034084.shtml',
        note: 'Shows modern healthcare payment and service in Kunming.',
      },
    ],
    relatedLinks: [
      { label: 'Treatment in China from Bangladesh', to: '/guides/treatment-in-china-from-bangladesh' },
      { label: 'China medical visa from Bangladesh', to: '/guides/china-medical-visa-from-bangladesh' },
      { label: 'Best hospitals in China', to: '/guides/best-hospitals-in-china-for-bangladeshi-patients' },
      { label: 'Guangzhou treatment guide', to: '/guides/guangzhou-treatment-guide' },
    ],
    relatedBlogs: [
      { label: 'How to choose a hospital in China for Bangladeshi patients', to: '/blogs/how-to-choose-a-hospital-in-china-for-bangladeshi-patients' },
      { label: 'Patient journey from first call to discharge', to: '/blogs/patient-journey-from-first-call-to-discharge' },
    ],
  },
]

export const seoLandingPageMap = Object.fromEntries(seoLandingPages.map((page) => [page.routeName, page])) as Record<
  string,
  SeoLandingPage
>
