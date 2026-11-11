import type { CvProfile } from "@/lib/cv";

/**
 * Fixed profile used by the simulated CV analysis.
 * The uploaded file is never read: this prototype always "extracts" the same example profile.
 */
export const SIMULATED_CV_PROFILE: CvProfile = {
  skills: ["React", "TypeScript", "Tailwind CSS", "UI Design", "Prototyping", "SQL"],
  experiences: [
    { text: "3 tahun membangun antarmuka web untuk produk digital", departments: ["Engineering"] },
    { text: "Menyusun design system dan prototipe untuk aplikasi internal", departments: ["Product Design"] },
    { text: "Membuat laporan mingguan berbasis query SQL", departments: ["Data"] },
  ],
};
