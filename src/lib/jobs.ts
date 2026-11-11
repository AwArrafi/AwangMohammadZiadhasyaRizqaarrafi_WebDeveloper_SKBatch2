import type { Department, Job, SalaryRange, WorkArrangement } from "@/data/jobs";

export type JobFilters = {
  query: string;
  category: Department | "all";
  /** "all", a city name, or "remote" (Remote + WFA roles). */
  location: string;
};

export const EMPTY_FILTERS: JobFilters = { query: "", category: "all", location: "all" };

export const WORK_ARRANGEMENT_LABEL: Record<WorkArrangement, string> = {
  "On-site": "On-site (WFO)",
  Remote: "Remote (WFH)",
  Hybrid: "Hybrid",
  WFA: "WFA (Work From Anywhere)",
};

export function formatSalary(salary: SalaryRange | null): string {
  if (!salary) {
    return "Gaji tidak dicantumkan.";
  }
  const format = (amount: number) => amount.toLocaleString("id-ID");
  return `Rp${format(salary.min)}–${format(salary.max)}/bulan`;
}

/** Every word of the query must appear in the title, department, summary, location or skills. */
function matchesQuery(job: Job, query: string): boolean {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = [job.title, job.department, job.summary, job.location, ...job.skills].join(" ").toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

function matchesLocation(job: Job, location: string): boolean {
  if (location === "all") {
    return true;
  }
  if (location === "remote") {
    return job.workArrangement === "Remote" || job.workArrangement === "WFA";
  }
  return job.location === location;
}

export function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  return jobs.filter(
    (job) =>
      (filters.category === "all" || job.department === filters.category) &&
      matchesQuery(job, filters.query) &&
      matchesLocation(job, filters.location),
  );
}

export function hasActiveFilters(filters: JobFilters): boolean {
  return filters.query.trim() !== "" || filters.category !== "all" || filters.location !== "all";
}
