"use client";

import { useState } from "react";
import type { Job } from "@/data/jobs";
import { EMPTY_FILTERS, type JobFilters } from "@/lib/jobs";
import { CvMatchingSection } from "./cv-matching-section";
import { FaqSection } from "./faq-section";
import { Footer, InfoDialog, type InfoTopic } from "./footer";
import { HeroSection } from "./hero-section";
import { JobDetailDialog } from "./job-detail-dialog";
import { JobDiscoverySection } from "./job-discovery-section";
import { Navbar } from "./navbar";

/** Deferred one task so React has committed (and any dialog has closed) before scrolling. */
const scrollToSection = (id: string) =>
  window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 0);

/**
 * Owns the state shared across sections: search filters (hero, listing and footer
 * all write to the same object, so they stay in sync), the open job and the open info dialog.
 */
export function AsterPage() {
  const [filters, setFilters] = useState<JobFilters>(EMPTY_FILTERS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [infoTopic, setInfoTopic] = useState<InfoTopic | null>(null);

  const showJobs = (nextFilters?: JobFilters) => {
    if (nextFilters) {
      setFilters(nextFilters);
    }
    scrollToSection("lowongan");
  };

  return (
    <>
      <a
        href="#lowongan"
        className="sr-only z-50 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Langsung ke daftar lowongan
      </a>
      <Navbar />
      <main>
        <HeroSection filters={filters} onFiltersChange={setFilters} onShowJobs={showJobs} onOpenJob={setSelectedJob} />
        <JobDiscoverySection filters={filters} onFiltersChange={setFilters} onOpenJob={setSelectedJob} />
        <CvMatchingSection onOpenJob={setSelectedJob} />
        <FaqSection />
      </main>
      <Footer onSelectCategory={(category) => setFilters({ ...EMPTY_FILTERS, category })} onOpenInfo={setInfoTopic} />

      <JobDetailDialog
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onCheckCv={() => {
          setSelectedJob(null);
          scrollToSection("rekomendasi-cv");
        }}
      />
      <InfoDialog topic={infoTopic} onClose={() => setInfoTopic(null)} />
    </>
  );
}
