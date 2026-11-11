"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { container } from "@/lib/styles";

const FAQS = [
  {
    question: "Bagaimana cara mencari pekerjaan di ASTER?",
    answer:
      "Ketik nama posisi, skill, atau kata kunci di kolom pencarian, lalu persempit hasil dengan filter departemen atau lokasi. Hasil diperbarui langsung saat kamu mengetik.",
  },
  {
    question: "Bagaimana sistem rekomendasi CV bekerja?",
    answer:
      "Konsepnya ada tiga langkah: mengenali skill, memahami konteks pengalaman, lalu mencocokkannya dengan lowongan yang tersedia. Di prototipe ini analisisnya masih simulasi dan memakai contoh profil.",
  },
  {
    question: "Apakah saya harus mengunggah CV untuk mencari pekerjaan?",
    answer:
      "Tidak. Semua lowongan bisa dicari dan dibuka tanpa CV. Rekomendasi CV hanyalah cara tambahan untuk menemukan posisi yang relevan.",
  },
  {
    question: "Bagaimana data pribadi dalam CV digunakan?",
    answer:
      "CV hanya dipakai untuk mencocokkan keahlian dan pengalamanmu dengan lowongan, dan baru diproses setelah kamu memberikan persetujuan. Di prototipe ini, file tetap di browsermu: tidak diunggah, tidak dibaca isinya, dan hilang saat halaman ditutup atau file dihapus.",
  },
  {
    question: "Apakah rekomendasi pekerjaan menjamin saya diterima?",
    answer:
      "Tidak. Rekomendasi hanya menunjukkan posisi yang relevan dengan profilmu. Keputusan penerimaan tetap melalui proses seleksi.",
  },
  {
    question: "Bagaimana cara melihat detail pekerjaan?",
    answer:
      "Pilih “Lihat Detail” pada kartu lowongan atau “Lihat Posisi” pada carousel dan hasil rekomendasi. Detail berisi gaji, lokasi, pengaturan kerja, tanggung jawab, dan kualifikasi.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 bg-white py-16 lg:py-24">
      <div className={`${container} max-w-3xl`}>
        <div className="text-center">
          <h2 id="faq-title" className="text-2xl font-semibold text-navy sm:text-[32px] sm:leading-tight">
            Pertanyaan? Kami Punya Jawabannya.
          </h2>
          <p className="mt-3 text-base text-muted">Hal-hal yang sering ditanyakan sebelum mulai mencari peluang.</p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={faq.question} className="rounded-2xl border border-line bg-white">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-sm font-semibold text-navy sm:text-base"
                  >
                    {faq.question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-tint text-primary">
                      {isOpen ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
