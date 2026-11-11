/**
 * Mock job data for the ASTER prototype.
 * Every role, salary and description here is fictional and exists only for this assignment.
 */

export type Department = "Engineering" | "Product Design" | "Data" | "Marketing" | "Business";
export type WorkArrangement = "On-site" | "Remote" | "Hybrid" | "WFA";
export type EmploymentType = "Full-time" | "Part-time" | "Contract";

export type SalaryRange = { min: number; max: number };

export type Job = {
  id: string;
  title: string;
  department: Department;
  summary: string;
  location: string;
  workArrangement: WorkArrangement;
  employmentType: EmploymentType;
  /** null means the salary is not disclosed; never invent one. */
  salary: SalaryRange | null;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  featured: boolean;
};

export const JOBS: Job[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    summary:
      "Membangun antarmuka web yang cepat, mudah diakses, dan konsisten untuk produk pencarian kerja ASTER.",
    location: "Jakarta",
    workArrangement: "Hybrid",
    employmentType: "Full-time",
    salary: { min: 8_000_000, max: 12_000_000 },
    skills: ["React", "TypeScript", "Tailwind CSS"],
    responsibilities: [
      "Mengembangkan komponen UI yang reusable bersama tim desain.",
      "Menjaga performa dan aksesibilitas halaman utama produk.",
      "Menulis kode yang mudah diuji dan direview.",
    ],
    requirements: [
      "Pengalaman 2+ tahun dengan React dan TypeScript.",
      "Terbiasa membuat layout responsive dengan Tailwind CSS.",
      "Memahami dasar aksesibilitas web.",
    ],
    featured: true,
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    department: "Engineering",
    summary:
      "Merancang API dan layanan data yang andal untuk mendukung pencarian lowongan dan rekomendasi.",
    location: "Jakarta",
    workArrangement: "Remote",
    employmentType: "Full-time",
    salary: { min: 10_000_000, max: 15_000_000 },
    skills: ["Node.js", "API Development", "PostgreSQL"],
    responsibilities: [
      "Membangun dan memelihara REST API untuk aplikasi web.",
      "Mendesain skema database yang efisien.",
      "Memantau dan meningkatkan keandalan layanan.",
    ],
    requirements: [
      "Pengalaman 2+ tahun dengan Node.js.",
      "Memahami desain database relasional dan PostgreSQL.",
      "Terbiasa bekerja secara remote dengan komunikasi tertulis yang jelas.",
    ],
    featured: true,
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Product Design",
    summary:
      "Merancang pengalaman kandidat dari riset hingga prototipe, dengan fokus pada kejelasan informasi.",
    location: "Bandung",
    workArrangement: "Hybrid",
    employmentType: "Full-time",
    salary: { min: 7_000_000, max: 11_000_000 },
    skills: ["UI Design", "UX Research", "Prototyping"],
    responsibilities: [
      "Melakukan riset pengguna dan menerjemahkannya menjadi alur produk.",
      "Membuat prototipe interaktif untuk validasi ide.",
      "Menjaga konsistensi design system.",
    ],
    requirements: [
      "Portofolio yang menunjukkan proses desain end-to-end.",
      "Mahir menggunakan tools desain dan prototyping.",
      "Mampu mempresentasikan keputusan desain dengan jelas.",
    ],
    featured: true,
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    department: "Data",
    summary:
      "Mengolah data perilaku pengguna menjadi insight yang membantu tim produk mengambil keputusan.",
    location: "Jakarta",
    workArrangement: "On-site",
    employmentType: "Full-time",
    salary: { min: 6_000_000, max: 9_000_000 },
    skills: ["SQL", "Python", "Data Analytics"],
    responsibilities: [
      "Menyusun query dan dashboard untuk metrik produk.",
      "Menganalisis tren dan menyampaikan rekomendasi.",
      "Menjaga kualitas dan konsistensi data laporan.",
    ],
    requirements: [
      "Mahir menulis query SQL.",
      "Pengalaman analisis data dengan Python.",
      "Mampu menjelaskan temuan kepada tim non-teknis.",
    ],
    featured: true,
  },
  {
    id: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    department: "Marketing",
    summary:
      "Mengelola kampanye digital untuk menjangkau kandidat yang tepat di berbagai kanal.",
    location: "Yogyakarta",
    workArrangement: "WFA",
    employmentType: "Contract",
    salary: null,
    skills: ["SEO", "Content Strategy", "Google Analytics"],
    responsibilities: [
      "Merencanakan dan menjalankan kampanye konten.",
      "Mengoptimalkan halaman untuk mesin pencari.",
      "Melaporkan performa kampanye secara berkala.",
    ],
    requirements: [
      "Pengalaman 1+ tahun di digital marketing.",
      "Terbiasa membaca data dari Google Analytics.",
      "Mandiri dan disiplin bekerja dari mana saja.",
    ],
    featured: false,
  },
  {
    id: "business-development-associate",
    title: "Business Development Associate",
    department: "Business",
    summary:
      "Membangun kemitraan dengan institusi pendidikan dan komunitas untuk memperluas jangkauan peluang kerja.",
    location: "Jakarta",
    workArrangement: "On-site",
    employmentType: "Part-time",
    salary: { min: 4_000_000, max: 6_000_000 },
    skills: ["Partnership", "Negotiation", "CRM"],
    responsibilities: [
      "Mengidentifikasi dan menghubungi calon mitra.",
      "Menyiapkan proposal kerja sama.",
      "Mencatat pipeline kemitraan di CRM.",
    ],
    requirements: [
      "Komunikasi dan negosiasi yang baik.",
      "Terbiasa bekerja dengan target.",
      "Bersedia bekerja dari kantor Jakarta.",
    ],
    featured: false,
  },
];

export const FEATURED_JOBS = JOBS.filter((job) => job.featured);

/** Department tabs shown in the Job Discovery section. */
export const DISCOVERY_CATEGORIES: Department[] = ["Engineering", "Product Design", "Data", "Marketing"];

export const LOCATION_OPTIONS = [
  { value: "all", label: "Semua lokasi" },
  ...[...new Set(JOBS.map((job) => job.location))].map((city) => ({ value: city, label: city })),
  { value: "remote", label: "Remote / WFA" },
];
