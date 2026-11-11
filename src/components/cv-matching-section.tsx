"use client";

import { ArrowRight, CircleAlert, CircleCheck, FileText, LoaderCircle, ShieldCheck, Sparkles, Upload, X } from "lucide-react";
import { useEffect, useRef, useState, type DragEvent } from "react";
import { SIMULATED_CV_PROFILE } from "@/data/cv-simulation";
import type { Job } from "@/data/jobs";
import { JOBS } from "@/data/jobs";
import { CV_ACCEPT, formatFileSize, recommendJobs, validateCvFile, type MatchLabel } from "@/lib/cv";
import { buttonPrimary, buttonSecondary, container, eyebrow } from "@/lib/styles";
import { DepartmentBadge, JobFacts, SalaryLine, SkillTags } from "./job-info";

const STEPS = [
  { title: "Ekstraksi Skill", text: "Mengenali skill yang tertulis di CV." },
  { title: "Konteks Karier", text: "Memahami pengalaman dan arah kariermu." },
  { title: "Rekomendasi", text: "Mencocokkan dengan lowongan yang tersedia." },
];
const STEP_DURATION_MS = 900;
const RECOMMENDATIONS = recommendJobs(SIMULATED_CV_PROFILE, JOBS);

const MATCH_STYLES: Record<MatchLabel, string> = {
  "Sangat Relevan": "bg-success/10 text-navy before:bg-success",
  Relevan: "bg-tint text-navy before:bg-primary",
  "Potensi Kecocokan": "bg-surface text-navy before:bg-muted",
};

export function CvMatchingSection({ onOpenJob }: { onOpenJob: (job: Job) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<number[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);

  const phase = !hasStarted ? "idle" : completedSteps < STEPS.length ? "analyzing" : "done";

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };
  useEffect(() => clearTimers, []);

  const resetAnalysis = () => {
    clearTimers();
    setHasStarted(false);
    setCompletedSteps(0);
  };

  // The File object only lives in memory; its contents are never read or sent anywhere.
  const selectFile = (candidate: File | undefined) => {
    if (!candidate) {
      return;
    }
    resetAnalysis();
    const message = validateCvFile(candidate);
    setError(message);
    setFile(message ? null : candidate);
  };

  const removeFile = () => {
    resetAnalysis();
    setFile(null);
    setError(null);
  };

  const startAnalysis = () => {
    if (!file || !hasConsent) {
      return;
    }
    resetAnalysis();
    setHasStarted(true);
    timersRef.current = STEPS.map((_, index) =>
      window.setTimeout(() => setCompletedSteps(index + 1), (index + 1) * STEP_DURATION_MS),
    );
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files[0]);
  };

  const canAnalyze = file !== null && hasConsent && phase !== "analyzing";

  return (
    <section id="rekomendasi-cv" aria-labelledby="cv-title" className="scroll-mt-16 py-16 lg:py-24">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <p className={`${eyebrow} inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1.5`}>
            <Sparkles className="size-3.5" aria-hidden />
            SMART CAREER MATCHING
          </p>
          <h2 id="cv-title" className="mt-4 text-2xl font-semibold text-navy sm:text-[32px] sm:leading-tight">
            Pengalamanmu Layak Menemukan Peluang yang Tepat.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Unggah CV-mu dan temukan rekomendasi pekerjaan berdasarkan keahlian serta pengalaman profesionalmu.
          </p>
        </div>

        <ol id="cara-kerja" aria-label="Cara kerja rekomendasi CV" className="mt-10 grid scroll-mt-24 gap-3 sm:grid-cols-3">
          {STEPS.map((step, index) => {
            const isDone = hasStarted && completedSteps > index;
            const isRunning = phase === "analyzing" && completedSteps === index;
            return (
              <li key={step.title} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                    isDone ? "bg-success/10 text-success" : "bg-tint text-primary"
                  }`}
                >
                  {isDone ? (
                    <CircleCheck className="size-5" aria-label="selesai" />
                  ) : isRunning ? (
                    <LoaderCircle className="size-5 animate-spin" aria-label="sedang berjalan" />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{step.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-tint text-primary">
                <FileText className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-navy">Unggah CV</h3>
                <p id="cv-format-hint" className="text-sm text-muted">
                  Format PDF atau DOCX, maksimal 5 MB
                </p>
              </div>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept={CV_ACCEPT}
              tabIndex={-1}
              aria-hidden
              className="hidden"
              onChange={(event) => {
                selectFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />

            {file ? (
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
                <FileText className="size-8 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy">{file.name}</p>
                  <p className="text-xs text-muted">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="min-h-10 rounded-lg px-2 text-sm font-semibold text-primary hover:underline"
                >
                  Ganti
                </button>
                <button
                  type="button"
                  onClick={removeFile}
                  aria-label={`Hapus file ${file.name}`}
                  className="grid size-10 shrink-0 place-items-center rounded-lg text-muted hover:bg-white hover:text-navy"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`mt-5 flex flex-col items-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
                  isDragging ? "border-primary bg-tint" : "border-line bg-surface"
                }`}
              >
                <Upload className="size-7 text-primary" aria-hidden />
                <p className="mt-3 hidden text-sm font-semibold text-navy md:block">Tarik dan letakkan CV di sini</p>
                <p className="mt-3 text-sm font-semibold text-navy md:hidden">Pilih CV dari perangkatmu</p>
                <p className="mt-1 hidden text-xs text-muted md:block">atau</p>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  aria-describedby="cv-format-hint"
                  className={`${buttonSecondary} mt-3`}
                >
                  Pilih Dokumen
                </button>
              </div>
            )}

            {error && (
              <p role="alert" className="mt-3 flex items-start gap-2 rounded-lg bg-tint p-3 text-sm font-medium text-navy">
                <CircleAlert className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {error}
              </p>
            )}

            <div className="mt-5 rounded-xl border border-line p-4">
              <p className="flex gap-2 text-sm text-muted">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>
                  CV-mu digunakan untuk membantu mencocokkan keahlian dan pengalaman dengan kesempatan kerja yang
                  tersedia. Di prototipe ini, file tidak diunggah ke server dan isinya tidak dibaca.
                </span>
              </p>
              <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm text-navy">
                <input
                  type="checkbox"
                  checked={hasConsent}
                  onChange={(event) => setHasConsent(event.target.checked)}
                  className="mt-0.5 size-5 shrink-0 cursor-pointer accent-primary"
                />
                Saya setuju CV saya diproses untuk mencocokkan keahlian dengan lowongan yang tersedia.
              </label>
            </div>

            <button
              type="button"
              onClick={startAnalysis}
              disabled={!canAnalyze}
              aria-describedby={canAnalyze ? undefined : "cv-analyze-hint"}
              className={`${buttonPrimary} mt-5 min-h-12 w-full`}
            >
              {phase === "analyzing" ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
              ) : (
                <Sparkles className="size-4" aria-hidden />
              )}
              {phase === "analyzing" ? "Menganalisis..." : "Analisis & Cocokkan Posisi"}
            </button>
            {!canAnalyze && phase !== "analyzing" && (
              <p id="cv-analyze-hint" className="mt-2 text-center text-xs text-muted">
                {file ? "Centang persetujuan untuk memulai analisis." : "Pilih file CV terlebih dahulu."}
              </p>
            )}
            <a
              href="#lowongan"
              className="mt-3 flex min-h-11 items-center justify-center text-sm font-semibold text-primary hover:underline"
            >
              Jelajahi Lowongan Tanpa CV
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 sm:p-6" aria-live="polite">
            {phase === "idle" && (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="grid size-12 place-items-center rounded-full bg-tint text-primary">
                  <Sparkles className="size-6" aria-hidden />
                </span>
                <p className="mt-4 font-semibold text-navy">Rekomendasi akan muncul di sini</p>
                <p className="mt-1 max-w-sm text-sm text-muted">
                  Pilih CV, berikan persetujuan, lalu jalankan analisis untuk melihat posisi yang relevan.
                </p>
              </div>
            )}

            {phase === "analyzing" && (
              <div className="py-8">
                <p className="font-semibold text-navy">Menganalisis CV-mu...</p>
                <p className="mt-1 text-sm text-muted">{STEPS[completedSteps]?.title}</p>
                <div
                  role="progressbar"
                  aria-label="Progres analisis"
                  aria-valuemin={0}
                  aria-valuemax={STEPS.length}
                  aria-valuenow={completedSteps}
                  className="mt-4 h-2 overflow-hidden rounded-full bg-tint"
                >
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${((completedSteps + 1) / STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {phase === "done" && <AnalysisResult onOpenJob={onOpenJob} />}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnalysisResult({ onOpenJob }: { onOpenJob: (job: Job) => void }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy">Rekomendasi Peluang untukmu.</h3>
        <span className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted">
          Hasil simulasi prototipe
        </span>
      </div>
      <p className="mt-2 text-sm text-muted">
        Analisis ini adalah simulasi: hasilnya selalu memakai contoh profil di bawah, bukan isi CV-mu.
      </p>

      <div className="mt-4 space-y-3 rounded-xl bg-surface p-4">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Skill terdeteksi (contoh)</p>
          <SkillTags skills={SIMULATED_CV_PROFILE.skills} label="Skill terdeteksi" />
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold tracking-wide text-muted uppercase">Pengalaman (contoh)</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-navy">
            {SIMULATED_CV_PROFILE.experiences.map((experience) => (
              <li key={experience.text}>{experience.text}</li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {RECOMMENDATIONS.map(({ job, label, matchedSkills, experiences }) => (
          <li key={job.id} className="rounded-xl border border-line p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <DepartmentBadge department={job.department} />
                <h4 className="mt-1 font-semibold text-navy">{job.title}</h4>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold before:size-1.5 before:rounded-full ${MATCH_STYLES[label]}`}
              >
                {label}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <SalaryLine salary={job.salary} />
              <JobFacts job={job} />
            </div>
            <p className="mt-3 text-sm text-navy">
              <span className="font-semibold">Kenapa direkomendasikan: </span>
              skill {matchedSkills.join(", ")} cocok dengan kebutuhan posisi ini
              {experiences.length > 0 ? `, didukung pengalaman: ${experiences.join("; ").toLowerCase()}.` : "."}
            </p>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => onOpenJob(job)}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-primary hover:underline"
              >
                Lihat Posisi
                <ArrowRight className="size-4" aria-hidden />
                <span className="sr-only">{job.title}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
