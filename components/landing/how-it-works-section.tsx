"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Discovery & brief",
    description:
      "We clarify goals, budget, schedule, and stakeholders. Site analysis, precedents, and program workshops set the direction.",
    code: `PHASE 01 — DISCOVERY
────────────────────
Client workshop        ✓ complete
Site survey + zoning   in progress
Program (net m²)       draft v2
Milestones:            SD kickoff → 6 wks`,
  },
  {
    number: "II",
    title: "Design development",
    description:
      "Schematic options, then a locked scheme. Models, drawings, and specs evolve together so the proposal is buildable.",
    code: `PHASE 02 — DESIGN
────────────────────
Schematic options      3 routes reviewed
DD package             DD-60% issued
Sustainability target  LEED Gold / local code+
Coordination:          struct + MEP`,
  },
  {
    number: "III",
    title: "Construction support",
    description:
      "Tender support, submittals, and site visits. We answer RFIs and refine details until occupancy and closeout.",
    code: `PHASE 03 — DELIVERY
────────────────────
Construction admin     CA monthly site visits
Permit responses       02 open / 12 closed
Substantial completion Q4 2026 (target)
Punch + warranty       per contract`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-foreground/10 py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,oklch(0.58_0.26_300/0.12),transparent_65%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-14 lg:mb-20">
          <h2
            className={`max-w-3xl font-display text-4xl tracking-tight transition-all delay-100 duration-700 lg:text-6xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Phases, not handoffs.
            <span className="mt-2 block text-muted-foreground lg:mt-3">
              One studio from sketch to site.
            </span>
          </h2>
          <span
            className={`mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <span className="h-px w-8 bg-primary/50" />
            Process
          </span>
        </div>

        {/* Three phase tiles — pick one to load the log below */}
        <div
          className={`mb-10 transition-all delay-200 duration-700 lg:mb-14 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-3 lg:gap-5">
            {steps.map((step, index) => {
              const active = activeStep === index;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`group border p-6 text-left transition-all duration-300 sm:p-5 lg:p-7 ${
                    active
                      ? "border-primary/45 bg-primary/[0.07] shadow-[0_0_48px_-20px_var(--color-primary)]"
                      : "border-foreground/10 bg-card/35 hover:border-foreground/20 hover:bg-card/55"
                  }`}
                >
                  <div className="mb-4 flex items-start gap-4">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-sm border font-display text-base transition-all duration-300 lg:size-11 lg:text-lg ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-foreground/15 bg-background/80 text-muted-foreground group-hover:border-primary/35 group-hover:text-foreground"
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className="min-w-0 pt-0.5 font-display text-lg leading-snug tracking-tight lg:text-xl">
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className={`text-sm leading-relaxed lg:text-[0.9375rem] ${
                      active ? "text-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Phase detail — wide “transmittal” strip */}
        <div
          className={`transition-all delay-300 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border border-foreground/15 bg-background/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm sm:px-6">
            <span className="text-primary/90">Phase log</span>
            <span className="text-foreground/40">TCB · PROC · {String(activeStep + 1).padStart(2, "0")}</span>
          </div>
          <div className="border border-t-0 border-foreground/15 bg-card/30 p-6 sm:p-8 lg:p-10">
            <pre
              key={activeStep}
              className="animate-in fade-in-0 slide-in-from-bottom-2 font-mono text-sm leading-relaxed text-foreground/75 duration-300 sm:text-base"
            >
              {steps[activeStep].code}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
