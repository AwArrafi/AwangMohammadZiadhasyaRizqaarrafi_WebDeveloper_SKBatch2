import { Building2, Clock, MapPin, Wallet } from "lucide-react";
import type { Job, SalaryRange } from "@/data/jobs";
import { formatSalary, WORK_ARRANGEMENT_LABEL } from "@/lib/jobs";

/** Location, work arrangement and employment type: three separate facts, never merged. */
export function JobFacts({ job }: { job: Job }) {
  const facts = [
    { icon: MapPin, label: "Lokasi", value: job.location },
    { icon: Building2, label: "Pengaturan kerja", value: WORK_ARRANGEMENT_LABEL[job.workArrangement] },
    { icon: Clock, label: "Tipe pekerjaan", value: job.employmentType },
  ];

  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
      {facts.map(({ icon: Icon, label, value }) => (
        <li key={label} className="flex items-center gap-1.5">
          <Icon className="size-4 shrink-0" aria-hidden />
          <span className="sr-only">{label}: </span>
          {value}
        </li>
      ))}
    </ul>
  );
}

export function SalaryLine({ salary }: { salary: SalaryRange | null }) {
  return (
    <p className={`flex items-center gap-2 text-sm ${salary ? "font-semibold text-navy" : "text-muted italic"}`}>
      <Wallet className="size-4 shrink-0 text-primary" aria-hidden />
      <span className="sr-only">Gaji: </span>
      {formatSalary(salary)}
    </p>
  );
}

export function SkillTags({ skills, label = "Skill" }: { skills: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <li key={skill} className="rounded-md bg-tint px-2 py-1 text-xs font-medium text-navy">
          {skill}
        </li>
      ))}
    </ul>
  );
}

export function DepartmentBadge({ department }: { department: string }) {
  return <span className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">{department}</span>;
}
