"use client";

import { ArrowRight, MapPin, Search } from "lucide-react";
import type { Department, Job } from "@/data/jobs";
import { LOCATION_OPTIONS } from "@/data/jobs";
import type { JobFilters } from "@/lib/jobs";
import { buttonPrimary, container } from "@/lib/styles";
import { FeaturedJobCarousel } from "./featured-job-carousel";

/** "Business" has no department tab below, so it searches by keyword instead. */
const POPULAR_SEARCHES: { label: string; category?: Department; query?: string }[] = [
  { label: "Engineering", category: "Engineering" },
  { label: "Design", category: "Product Design" },
  { label: "Marketing", category: "Marketing" },
  { label: "Data", category: "Data" },
  { label: "Business", query: "Business" },
];

type HeroSectionProps = {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  onShowJobs: (filters?: JobFilters) => void;
  onOpenJob: (job: Job) => void;
};

export function HeroSection({ filters, onFiltersChange, onShowJobs, onOpenJob }: HeroSectionProps) {
  return (
    <section
      id="beranda"
      aria-labelledby="hero-title"
      className="scroll-mt-16 bg-linear-to-b from-tint to-surface pt-10 pb-14 sm:pt-16 lg:pt-20 lg:pb-20"
    >
      <div className={`${container} grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-12`}>
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            YOUR NEXT OPPORTUNITY
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-[32px] leading-[1.15] font-bold tracking-[-0.02em] text-navy sm:text-[44px] lg:text-[52px]"
          >
            Temukan Peluang.
            <span className="block text-primary">Bangun Kariermu.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Jelajahi berbagai kesempatan kerja dan temukan posisi yang selaras dengan kemampuan serta perjalanan
            kariermu.
          </p>

          <form
            role="search"
            aria-label="Cari lowongan"
            onSubmit={(event) => {
              event.preventDefault();
              onShowJobs();
            }}
            className="mt-7 flex flex-col gap-2 rounded-2xl border border-line bg-white p-2 shadow-sm sm:flex-row sm:items-center"
          >
            <label className="flex min-h-12 flex-1 items-center gap-2 rounded-xl px-3 focus-within:bg-surface">
              <Search className="size-5 shrink-0 text-muted" aria-hidden />
              <span className="sr-only">Kata kunci</span>
              <input
                type="search"
                value={filters.query}
                onChange={(event) => onFiltersChange({ ...filters, query: event.target.value })}
                placeholder="Posisi atau skill..."
                className="w-full min-w-0 bg-transparent text-sm text-navy outline-none placeholder:text-muted"
              />
            </label>
            <span className="hidden h-8 w-px bg-line sm:block" aria-hidden />
            <label className="flex min-h-12 items-center gap-2 rounded-xl px-3 focus-within:bg-surface sm:w-40">
              <MapPin className="size-5 shrink-0 text-muted" aria-hidden />
              <span className="sr-only">Lokasi</span>
              <select
                value={filters.location}
                onChange={(event) => onFiltersChange({ ...filters, location: event.target.value })}
                className="w-full min-w-0 cursor-pointer bg-transparent text-sm text-navy outline-none"
              >
                {LOCATION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className={`${buttonPrimary} min-h-12 shrink-0`}>
              Cari Lowongan
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted">Paling banyak dicari:</span>
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  onShowJobs({ ...filters, query: item.query ?? "", category: item.category ?? "all" })
                }
                className="min-h-9 rounded-full border border-line bg-white px-3.5 text-sm font-medium text-navy transition-colors hover:border-primary hover:text-primary"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <FeaturedJobCarousel onOpenJob={onOpenJob} />
      </div>
    </section>
  );
}
