import type { Department, Job } from "@/data/jobs";

export const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;
export const CV_ACCEPT =
  ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/** Returns an error message, or null when the file can be used. Only name and size are inspected. */
export function validateCvFile(file: { name: string; size: number }): string | null {
  const name = file.name.toLowerCase();
  if (!name.endsWith(".pdf") && !name.endsWith(".docx")) {
    return "Format tidak didukung. Gunakan file PDF atau DOCX.";
  }
  if (file.size === 0) {
    return "File kosong. Pilih file CV yang valid.";
  }
  if (file.size > MAX_CV_SIZE_BYTES) {
    return "Ukuran file melebihi batas 5 MB.";
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / 1024 / 1024).toLocaleString("id-ID", { maximumFractionDigits: 1 })} MB`;
}

export type MatchLabel = "Sangat Relevan" | "Relevan" | "Potensi Kecocokan";

export type CvProfile = {
  skills: string[];
  experiences: { text: string; departments: Department[] }[];
};

export type Recommendation = {
  job: Job;
  label: MatchLabel;
  matchedSkills: string[];
  experiences: string[];
};

function labelFor(matchedSkillCount: number): MatchLabel {
  if (matchedSkillCount >= 3) {
    return "Sangat Relevan";
  }
  return matchedSkillCount === 2 ? "Relevan" : "Potensi Kecocokan";
}

/** Qualitative matching on shared skills; roles with no shared skill are left out. */
export function recommendJobs(profile: CvProfile, jobs: Job[]): Recommendation[] {
  return jobs
    .map((job) => {
      const matchedSkills = job.skills.filter((skill) => profile.skills.includes(skill));
      return {
        job,
        matchedSkills,
        label: labelFor(matchedSkills.length),
        experiences: profile.experiences
          .filter((experience) => experience.departments.includes(job.department))
          .map((experience) => experience.text),
      };
    })
    .filter((recommendation) => recommendation.matchedSkills.length > 0)
    .sort((a, b) => b.matchedSkills.length - a.matchedSkills.length);
}
