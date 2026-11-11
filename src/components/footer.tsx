"use client";

import type { Department } from "@/data/jobs";
import { buttonPrimary, container } from "@/lib/styles";
import { Modal } from "./modal";
import { Logo } from "./navbar";

/** Pages that do not exist in this prototype get an honest explanation instead of a dead link. */
const INFO_CONTENT = {
  contact: {
    title: "Hubungi Kami",
    body: "ASTER adalah konsep fiktif, jadi belum ada kanal kontak resmi. Pertanyaan umum sudah dijawab di bagian FAQ.",
  },
  help: {
    title: "Pusat Bantuan",
    body: "Pusat bantuan belum tersedia di prototipe ini. Mulailah dari bagian FAQ untuk panduan mencari lowongan dan memakai rekomendasi CV.",
  },
  privacy: {
    title: "Kebijakan Privasi",
    body: "Prototipe ini tidak memakai akun, cookie pelacak, atau server. Kebijakan privasi lengkap belum ditulis karena ASTER bukan layanan nyata.",
  },
  terms: {
    title: "Syarat & Ketentuan",
    body: "Syarat & ketentuan belum tersedia. Semua lowongan di halaman ini fiktif dan tidak dapat dilamar.",
  },
  cvData: {
    title: "Penggunaan Data CV",
    body: "CV hanya dipakai untuk mencocokkan keahlian dan pengalaman dengan lowongan, setelah kamu menyetujuinya. Di prototipe ini file tidak diunggah, tidak dibaca isinya, dan langsung hilang saat kamu menghapusnya atau menutup halaman.",
  },
} as const;

export type InfoTopic = keyof typeof INFO_CONTENT;

type FooterLink = { label: string; href?: string; category?: Department | "all"; topic?: InfoTopic };

const FOOTER_GROUPS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Cari Lowongan", href: "#lowongan", category: "all" },
      { label: "Engineering", href: "#lowongan", category: "Engineering" },
      { label: "Product & Design", href: "#lowongan", category: "Product Design" },
      { label: "Data & Analytics", href: "#lowongan", category: "Data" },
    ],
  },
  {
    title: "Candidate Resources",
    links: [
      { label: "Rekomendasi CV", href: "#rekomendasi-cv" },
      { label: "Cara Kerja", href: "#cara-kerja" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Hubungi Kami", topic: "contact" },
      { label: "Pusat Bantuan", topic: "help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Kebijakan Privasi", topic: "privacy" },
      { label: "Syarat & Ketentuan", topic: "terms" },
      { label: "Penggunaan Data CV", topic: "cvData" },
    ],
  },
];

type FooterProps = {
  onSelectCategory: (category: Department | "all") => void;
  onOpenInfo: (topic: InfoTopic) => void;
};

export function Footer({ onSelectCategory, onOpenInfo }: FooterProps) {
  const linkClass = "inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-primary";

  return (
    <footer className="border-t border-line bg-surface pt-14 pb-8">
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Helping people discover meaningful career opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {FOOTER_GROUPS.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-xs font-semibold tracking-[0.12em] text-navy uppercase">{group.title}</h2>
                <ul className="mt-3 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.topic ? (
                        <button type="button" onClick={() => onOpenInfo(link.topic!)} className={linkClass}>
                          {link.label}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          onClick={link.category ? () => onSelectCategory(link.category!) : undefined}
                          className={linkClass}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-muted">
          © 2026 ASTER. Konsep brand fiktif untuk mini assignment Web Developer; seluruh lowongan adalah data contoh.
        </p>
      </div>
    </footer>
  );
}

export function InfoDialog({ topic, onClose }: { topic: InfoTopic | null; onClose: () => void }) {
  const content = topic ? INFO_CONTENT[topic] : null;
  return (
    <Modal open={content !== null} onClose={onClose} title={content?.title ?? ""}>
      {content && (
        <>
          <p className="text-sm leading-relaxed text-muted">{content.body}</p>
          <a href="#faq" onClick={onClose} className={`${buttonPrimary} mt-5 w-full`}>
            Buka FAQ
          </a>
        </>
      )}
    </Modal>
  );
}
