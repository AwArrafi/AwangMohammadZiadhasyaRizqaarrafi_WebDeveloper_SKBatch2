import { ArrowRight } from "lucide-react";
import type { Job } from "@/data/jobs";
import { DepartmentBadge, JobFacts, SalaryLine, SkillTags } from "./job-info";

export function JobCard({ job, onOpen }: { job: Job; onOpen: (job: Job) => void }) {
  return (
    <article className="flex w-full flex-col gap-4 rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-md sm:p-6">
      <div>
        <DepartmentBadge department={job.department} />
        <h3 className="mt-1.5 text-lg font-semibold text-navy">{job.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{job.summary}</p>
      </div>

      <div className="space-y-2.5 rounded-xl bg-surface p-3">
        <SalaryLine salary={job.salary} />
        <JobFacts job={job} />
      </div>

      <SkillTags skills={job.skills} />

      <div className="mt-auto flex justify-end border-t border-line pt-4">
        <button
          type="button"
          onClick={() => onOpen(job)}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-primary hover:underline"
        >
          Lihat Detail
          <ArrowRight className="size-4" aria-hidden />
          <span className="sr-only">{job.title}</span>
        </button>
      </div>
    </article>
  );
}
