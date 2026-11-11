"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Job } from "@/data/jobs";
import { FEATURED_JOBS } from "@/data/jobs";
import { DepartmentBadge, JobFacts, SalaryLine, SkillTags } from "./job-info";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Native horizontal scroll with CSS snap: swipe and trackpad work for free,
 * the buttons and dots only call scrollTo on the track.
 */
export function FeaturedJobCarousel({ onOpenJob }: { onOpenJob: (job: Job) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = FEATURED_JOBS.length - 1;

  const slideStep = () => {
    const slides = trackRef.current?.children;
    if (!slides || slides.length < 2) {
      return 1;
    }
    return (slides[1] as HTMLElement).offsetLeft - (slides[0] as HTMLElement).offsetLeft;
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (track && slide) {
      track.scrollTo({ left: slide.offsetLeft - (track.children[0] as HTMLElement).offsetLeft });
    }
  };

  const syncActiveIndex = () => {
    const track = trackRef.current;
    if (track) {
      setActiveIndex(Math.min(lastIndex, Math.round(track.scrollLeft / slideStep())));
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby="featured-title"
      className="min-w-0 rounded-3xl border border-line bg-white/70 p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="featured-title" className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-navy">
          <span className="size-2 shrink-0 rounded-full bg-success" aria-hidden />
          <span>
            PELUANG UNGGULAN <span className="max-sm:hidden">TERKINI</span>
          </span>
        </h2>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <span className="mr-1 text-sm font-medium whitespace-nowrap text-muted tabular-nums sm:mr-2" aria-live="polite">
            <span className="sr-only">Posisi </span>
            {pad(activeIndex + 1)} / {pad(FEATURED_JOBS.length)}
          </span>
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Posisi sebelumnya"
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-navy hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-line disabled:hover:text-navy"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === lastIndex}
            aria-label="Posisi berikutnya"
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-navy hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-line disabled:hover:text-navy"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={syncActiveIndex}
        className="scrollbar-none relative mt-3 flex scroll-px-1 snap-x snap-mandatory gap-4 overflow-x-auto p-1 motion-safe:scroll-smooth"
      >
        {FEATURED_JOBS.map((job, index) => (
          <article
            key={job.id}
            aria-roledescription="slide"
            aria-label={`${index + 1} dari ${FEATURED_JOBS.length}: ${job.title}`}
            className={`flex w-[86%] shrink-0 snap-start flex-col gap-3 rounded-2xl border bg-white p-5 transition-opacity ${
              index === activeIndex ? "border-primary/40 shadow-md" : "border-line opacity-60"
            }`}
          >
            <DepartmentBadge department={job.department} />
            <h3 className="text-xl font-semibold text-navy">{job.title}</h3>
            <JobFacts job={job} />
            <SalaryLine salary={job.salary} />
            <SkillTags skills={job.skills} />
            <div className="mt-auto flex justify-end border-t border-line pt-3">
              <button
                type="button"
                onClick={() => onOpenJob(job)}
                tabIndex={index === activeIndex ? 0 : -1}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-primary hover:underline"
              >
                Lihat Posisi
                <ArrowRight className="size-4" aria-hidden />
                <span className="sr-only">{job.title}</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-1">
        {FEATURED_JOBS.map((job, index) => (
          <button
            key={job.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Tampilkan posisi ${index + 1}: ${job.title}`}
            aria-current={index === activeIndex}
            className="grid size-6 place-items-center"
          >
            <span
              className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-muted/40"}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
