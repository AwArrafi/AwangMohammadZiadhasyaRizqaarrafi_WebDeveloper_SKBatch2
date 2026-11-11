/** Shared class strings so buttons and containers look the same everywhere. */
export const container = "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors disabled:cursor-not-allowed";

export const buttonPrimary = `${buttonBase} bg-primary text-white hover:bg-primary/90 disabled:bg-primary/40`;
export const buttonSecondary = `${buttonBase} border border-line bg-white text-navy hover:border-primary hover:text-primary`;

export const eyebrow = "text-xs font-semibold uppercase tracking-[0.12em] text-primary";
