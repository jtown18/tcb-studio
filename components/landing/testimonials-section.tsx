"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "They held the design vision through a difficult renovation—every consultant knew what we were solving for.",
    author: "Sarah Chen",
    role: "Director of Campus Planning",
    company: "Northline University",
    metric: "Opened on budget",
  },
  {
    quote:
      "Clear drawings, fast responses on site, and a team that actually listened to our facilities staff.",
    author: "Marcus Webb",
    role: "COO",
    company: "Harbor Arts Center",
    metric: "Zero scope gaps at CA",
  },
  {
    quote:
      "The civic review process was smoother than we expected. TCB anticipated questions before the board asked them.",
    author: "Elena Rodriguez",
    role: "Deputy Mayor",
    company: "Lakeshore Municipality",
    metric: "Permit first pass",
  },
  {
    quote:
      "Our home feels intentional in every detail. They balanced light, privacy, and how we actually live.",
    author: "James Liu",
    role: "Homeowner",
    company: "Private commission",
    metric: "LEED Gold targeted",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (idx: number) => {
    if (idx === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setIsAnimating(false);
    }, 280);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 280);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  const active = testimonials[activeIndex];

  return (
    <section className="relative overflow-hidden border-t border-foreground/10 py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_85%_20%,oklch(0.58_0.26_300/0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="h-px w-8 bg-primary/50" />
            Client references
          </span>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-xl font-display text-4xl tracking-tight lg:text-5xl">
              In their words
              <span className="mt-2 block text-2xl text-muted-foreground lg:text-3xl">
                Correspondence on record
              </span>
            </h2>
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
              <span className="text-primary/90">TCB · REF</span>
              <span className="text-foreground/25">·</span>
              <span className="tabular-nums text-foreground/60">
                {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Primary reference sheet */}
          <div className="relative lg:col-span-8">
            <article
              className="relative overflow-hidden border border-foreground/10 bg-card/40 bg-[linear-gradient(135deg,oklch(0.58_0.26_300/0.06)_0%,transparent_50%)] p-8 backdrop-blur-sm sm:p-10 lg:p-12"
            >
              <span
                className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-foreground/20"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-foreground/20"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-foreground/20"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-foreground/20"
                aria-hidden
              />

              <span
                className="pointer-events-none absolute left-6 top-6 font-display text-[clamp(5rem,18vw,10rem)] leading-none text-primary/9 select-none sm:left-8 sm:top-8"
                aria-hidden
              >
                &ldquo;
              </span>

              <div className="relative z-1 border-b border-foreground/10 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-primary/85">Reference letter</span>
                <span className="mx-2 text-foreground/25">—</span>
                <span>On file</span>
              </div>

              <blockquote
                className={`relative z-1 mt-8 transition-all duration-300 ease-out ${
                  isAnimating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
                }`}
              >
                <p className="font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl lg:text-[2.125rem] lg:leading-[1.2]">
                  {active.quote}
                </p>
              </blockquote>

              <div
                className={`relative z-1 mt-10 flex flex-col gap-6 border-t border-foreground/10 pt-8 sm:flex-row sm:items-center sm:gap-8 ${
                  isAnimating ? "opacity-0" : "opacity-100"
                } transition-opacity duration-300 delay-75`}
              >
                <div className="flex size-16 shrink-0 items-center justify-center border border-foreground/15 bg-background/60 font-display text-2xl text-foreground">
                  {active.author.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">{active.author}</p>
                  <p className="mt-1 text-muted-foreground">
                    {active.role}
                    <span className="text-foreground/35"> · </span>
                    {active.company}
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* Index + outcome */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <div
              className={`border border-foreground/10 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 sm:p-7 ${
                isAnimating ? "scale-[0.98] opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-primary/85">
                Project note
              </span>
              <p className="font-display text-2xl tracking-tight text-foreground lg:text-3xl">{active.metric}</p>
              <div className="mt-4 h-px w-full bg-linear-to-r from-primary/45 via-transparent to-transparent" aria-hidden />
            </div>

            <div className="flex flex-col gap-2">
              <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Select reference
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                {testimonials.map((t, idx) => {
                  const selected = idx === activeIndex;
                  return (
                    <button
                      key={t.author}
                      type="button"
                      onClick={() => goTo(idx)}
                      aria-current={selected ? true : undefined}
                      className={`min-w-[200px] shrink-0 border px-4 py-3 text-left transition-all duration-300 lg:min-w-0 ${
                        selected
                          ? "border-primary/45 bg-primary/[0.07] shadow-[0_0_32px_-14px_var(--color-primary)]"
                          : "border-foreground/10 bg-card/20 hover:border-foreground/20 hover:bg-card/40"
                      }`}
                    >
                      <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                        Ref. {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-1 font-medium text-foreground">{t.author}</p>
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">{t.company}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
