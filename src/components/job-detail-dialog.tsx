"use client";

import { FileText, Info } from "lucide-react";
import type { Job } from "@/data/jobs";
import { buttonPrimary, buttonSecondary } from "@/lib/styles";
import { DepartmentBadge, JobFacts, SalaryLine, SkillTags } from "./job-info";
import { Modal } from "./modal";

type JobDetailDialogProps = {
  job: Job | null;
  onClose: () => void;
  onCheckCv: () => void;
};

export function JobDetailDialog({ job, onClose, onCheckCv }: JobDetailDialogProps) {
  return (
    <Modal open={job !== null} onClose={onClose} title={job?.title ?? ""} wide>
      {job && (
        <div className="space-y-6">
          <div className="space-y-3">
            <DepartmentBadge department={job.department} />
            <p className="text-base leading-relaxed text-navy">{job.summary}</p>
            <div className="space-y-2.5 rounded-xl bg-surface p-4">
              <SalaryLine salary={job.salary} />
              <JobFacts job={job} />
            </div>
          </div>

          <DetailList title="Tanggung jawab" items={job.responsibilities} />
          <DetailList title="Kualifikasi" items={job.requirements} />

          <div>
            <h3 className="mb-2 text-sm font-semibold text-navy">Skill yang dibutuhkan</h3>
            <SkillTags skills={job.skills} />
          </div>

          <p className="flex gap-2 rounded-xl border border-line p-3 text-sm text-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            Ini lowongan fiktif untuk prototipe. Pengiriman lamaran belum tersedia, tetapi kamu bisa mencoba simulasi
            rekomendasi berbasis CV.
          </p>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className={buttonSecondary}>
              Tutup
            </button>
            <button type="button" onClick={onCheckCv} className={buttonPrimary}>
              <FileText className="size-4" aria-hidden />
              Cek Kecocokan dengan CV
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-navy">{title}</h3>
      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-primary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
