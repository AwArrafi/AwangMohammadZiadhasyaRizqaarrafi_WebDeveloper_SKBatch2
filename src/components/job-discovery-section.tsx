"use client";

import { Search, SearchX, X } from "lucide-react";
import type { Department, Job } from "@/data/jobs";
import { DISCOVERY_CATEGORIES, JOBS, LOCATION_OPTIONS } from "@/data/jobs";
import { EMPTY_FILTERS, filterJobs, hasActiveFilters, type JobFilters } from "@/lib/jobs";
import { buttonPrimary, buttonSecondary, container, eyebrow } from "@/lib/styles";
import { JobCard } from "./job-card";

type JobDiscoverySectionProps = {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  onOpenJob: (job: Job) => void;
};

export function JobDiscoverySection({ filters, onFiltersChange, onOpenJob }: JobDiscoverySectionProps) {
  const results = filterJobs(JOBS, filters);
  const countFor = (category: Department | "all") => filterJobs(JOBS, { ...filters, category }).length;
  const tabs: { value: Department | "all"; label: string }[] = [
    { value: "all", label: "Semua Posisi" },
    ...DISCOVERY_CATEGORIES.map((category) => ({ value: category, label: category })),
  ];
  const locationLabel = LOCATION_OPTIONS.find((option) => option.value === filters.location)?.label;
  const clearFilters = () => onFiltersChange(EMPTY_FILTERS);

  return (
    <section id="lowongan" aria-labelledby="discovery-title" className="scroll-mt-16 bg-white py-16 lg:py-24">
      <div className={container}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className={eyebrow}>CURATED OPPORTUNITIES</p>
            <h2 id="discovery-title" className="mt-3 text-2xl font-semibold text-navy sm:text-[32px] sm:leading-tight">
              Temukan Peran yang Tepat untukmu.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Jelajahi berbagai kesempatan yang sesuai dengan keahlian dan tujuan kariermu.
            </p>
          </div>
          <p className="text-sm text-muted" aria-live="polite">
            Menampilkan <strong className="font-semibold text-navy">{results.length}</strong> posisi
          </p>
        </div>

        <form
          role="search"
          aria-label="Cari di daftar lowongan"
          onSubmit={(event) => {
            event.preventDefault();
            // Live filtering already applied; submitting just dismisses the mobile keyboard.
            (document.activeElement as HTMLElement | null)?.blur();
          }}
          className="mt-8 flex flex-col gap-2 rounded-2xl border border-line bg-surface p-2 sm:flex-row sm:items-center"
        >
          <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl bg-white px-4">
            <Search className="size-5 shrink-0 text-muted" aria-hidden />
            <span className="sr-only">Cari posisi, skill, atau kata kunci</span>
            <input
              type="text"
              value={filters.query}
              onChange={(event) => onFiltersChange({ ...filters, query: event.target.value })}
              placeholder="Cari posisi, skill, atau kata kunci..."
              className="w-full min-w-0 bg-transparent text-base text-navy outline-none placeholder:text-muted"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => onFiltersChange({ ...filters, query: "" })}
                aria-label="Hapus kata kunci"
                className="-mr-2 grid size-10 shrink-0 place-items-center rounded-lg text-muted hover:bg-surface hover:text-navy"
              >
                <X className="size-4" aria-hidden />
              </button>
            )}
          </label>
          <button type="submit" className={`${buttonPrimary} min-h-12`}>
            Cari Posisi
          </button>
        </form>

        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter departemen"
            className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {tabs.map((tab) => {
              const isActive = filters.category === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onFiltersChange({ ...filters, category: tab.value })}
                  className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-white text-navy hover:border-primary hover:text-primary"
                  }`}
                >
                  {tab.label} <span className={isActive ? "text-white/80" : "text-muted"}>({countFor(tab.value)})</span>
                </button>
              );
            })}
          </div>

          {hasActiveFilters(filters) && (
            <div className="flex flex-wrap items-center gap-2">
              {filters.location !== "all" && (
                <button
                  type="button"
                  onClick={() => onFiltersChange({ ...filters, location: "all" })}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-tint px-3 text-sm font-medium text-navy hover:bg-line"
                >
                  Lokasi: {locationLabel}
                  <X className="size-3.5" aria-hidden />
                  <span className="sr-only">hapus filter lokasi</span>
                </button>
              )}
              <button
                type="button"
                onClick={clearFilters}
                className="min-h-10 rounded-lg px-2 text-sm font-semibold text-primary hover:underline"
              >
                Hapus Filter
              </button>
            </div>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((job) => (
              <li key={job.id} className="flex">
                <JobCard job={job} onOpen={onOpenJob} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-tint text-primary">
              <SearchX className="size-7" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-navy">Tidak menemukan posisi yang sesuai?</h3>
            <p className="mt-1 text-sm text-muted">Coba kata kunci atau kategori lainnya.</p>
            <button type="button" onClick={clearFilters} className={`${buttonSecondary} mt-5`}>
              Hapus Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
