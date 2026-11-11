// Runs with Node's built-in test runner and type stripping: `npm test`.
import assert from "node:assert/strict";
import { test } from "node:test";
import type { Job } from "../data/jobs.ts";
import { formatFileSize, recommendJobs, validateCvFile } from "./cv.ts";
import { EMPTY_FILTERS, filterJobs, formatSalary } from "./jobs.ts";

const baseJob: Job = {
  id: "a",
  title: "Frontend Developer",
  department: "Engineering",
  summary: "Membangun antarmuka web",
  location: "Jakarta",
  workArrangement: "Hybrid",
  employmentType: "Full-time",
  salary: { min: 8_000_000, max: 12_000_000 },
  skills: ["React", "TypeScript", "Tailwind CSS"],
  responsibilities: [],
  requirements: [],
  featured: true,
};
const jobs: Job[] = [
  baseJob,
  { ...baseJob, id: "b", title: "Data Analyst", department: "Data", location: "Bandung", workArrangement: "Remote", skills: ["SQL"], salary: null },
];

test("filterJobs combines keyword, category and location", () => {
  assert.equal(filterJobs(jobs, EMPTY_FILTERS).length, 2);
  assert.deepEqual(filterJobs(jobs, { ...EMPTY_FILTERS, query: "react jakarta" }).map((j) => j.id), ["a"]);
  assert.deepEqual(filterJobs(jobs, { ...EMPTY_FILTERS, category: "Data" }).map((j) => j.id), ["b"]);
  assert.deepEqual(filterJobs(jobs, { ...EMPTY_FILTERS, location: "remote" }).map((j) => j.id), ["b"]);
  assert.equal(filterJobs(jobs, { query: "react", category: "Data", location: "all" }).length, 0);
});

test("formatSalary never invents a salary", () => {
  assert.equal(formatSalary(null), "Gaji tidak dicantumkan.");
  assert.equal(formatSalary({ min: 8_000_000, max: 12_000_000 }), "Rp8.000.000–12.000.000/bulan");
});

test("validateCvFile accepts only PDF/DOCX up to 5 MB", () => {
  assert.equal(validateCvFile({ name: "cv.PDF", size: 1000 }), null);
  assert.equal(validateCvFile({ name: "cv.docx", size: 5 * 1024 * 1024 }), null);
  assert.match(validateCvFile({ name: "cv.png", size: 1000 }) ?? "", /Format/);
  assert.match(validateCvFile({ name: "cv.pdf", size: 5 * 1024 * 1024 + 1 }) ?? "", /5 MB/);
  assert.match(validateCvFile({ name: "cv.pdf", size: 0 }) ?? "", /kosong/);
  assert.equal(formatFileSize(1.8 * 1024 * 1024), "1,8 MB");
});

test("recommendJobs labels by shared skills and drops unrelated roles", () => {
  const result = recommendJobs(
    { skills: ["React", "TypeScript", "Tailwind CSS"], experiences: [{ text: "web", departments: ["Engineering"] }] },
    jobs,
  );
  assert.equal(result.length, 1);
  assert.equal(result[0].label, "Sangat Relevan");
  assert.deepEqual(result[0].experiences, ["web"]);
});
