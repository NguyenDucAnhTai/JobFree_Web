import type { ReactNode } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../../components/shared/Container";

export function PublicHero({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryTo = "/#pilot",
  secondaryLabel,
  secondaryTo = "/how-it-works",
  visual,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primaryLabel: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  visual: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-surface-cream pt-[calc(var(--spacing-nav-h)+2rem)]">
      <Container className="grid items-center gap-12 pb-16 pt-8 md:pb-20 lg:min-h-[650px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-20">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/75 px-4 py-2 text-body-xs font-black uppercase text-ink-amber">
            <span className="h-2 w-2 rounded-full bg-brand-amber" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-[15ch] font-display text-title-hero font-black leading-[1.04] text-ink">
            {title}
          </h1>
          <p className="mt-6 max-w-[58ch] text-hero-desc font-medium leading-relaxed text-ink-soft">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to={primaryTo}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-brand-yellow px-6 py-3 text-body-sm font-black text-ink shadow-[0_4px_0_#101010] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {primaryLabel}<ArrowRight size={18} aria-hidden="true" />
            </Link>
            {secondaryLabel && (
              <Link
                to={secondaryTo}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border border-ink/20 bg-white/70 px-6 py-3 text-body-sm font-extrabold text-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[620px]">{visual}</div>
      </Container>
      <div className="h-2 w-full bg-brand-yellow" aria-hidden="true" />
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className={`text-body-xs font-black uppercase text-ink-amber ${light ? "text-brand-yellow" : ""}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 font-display text-title-section font-black ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 max-w-[62ch] text-body leading-relaxed ${light ? "text-white/70" : "text-ink-soft"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function FinalCTA({
  title,
  description,
  label,
  to = "/#pilot",
}: {
  title: string;
  description: string;
  label: string;
  to?: string;
}) {
  return (
    <section className="bg-brand-yellow py-16 md:py-24">
      <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <h2 className="font-display text-title-section font-black text-ink">{title}</h2>
          <p className="mt-5 max-w-[60ch] text-body font-semibold leading-relaxed text-ink-soft">{description}</p>
        </div>
        <Link
          to={to}
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-pill border-2 border-ink bg-ink px-6 py-3 text-body-sm font-black text-brand-yellow shadow-[0_4px_0_rgba(16,16,16,0.25)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {label}<ArrowRight size={18} aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}

export function ScrollCue() {
  return (
    <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:p-3 focus:text-ink">
      Bỏ qua phần mở đầu <ArrowDown size={16} className="inline" aria-hidden="true" />
    </a>
  );
}
