"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Concept & masterplanning",
    description:
      "Feasibility, massing, and site strategy that respect context, climate, and the long life of the building.",
  },
  {
    number: "02",
    title: "Design & visualization",
    description:
      "Schematic through technical design with BIM-ready documentation, daylight studies, and material research.",
  },
  {
    number: "03",
    title: "Client & consultant alignment",
    description:
      "Structured workshops, shared models, and clear packages so owners, engineers, and contractors stay in sync.",
  },
  {
    number: "04",
    title: "Codes & delivery support",
    description:
      "Permit coordination, specification, and site observation—so design intent survives bidding and construction.",
  },
];



function FeatureCard({
  feature,
  isLast,
}: {
  feature: (typeof features)[0];
  isLast: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative lg:pl-20 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${(parseInt(feature.number, 10) - 1) * 90}ms` }}
    >
      {/* Timeline node (desktop) */}
      <div
        className="hidden lg:flex absolute left-[31px] top-12 z-10 size-3 items-center justify-center"
        aria-hidden
      >
        <span className="absolute size-3 rotate-45 border border-primary bg-background shadow-[0_0_20px_-2px_var(--color-primary)] transition-transform duration-500 group-hover:scale-110 group-hover:border-primary" />
      </div>
      {!isLast && (
        <div
          className="hidden lg:block absolute left-[35px] top-15 -bottom-14 w-px bg-linear-to-b from-primary/40 via-foreground/12 to-transparent"
          aria-hidden
        />
      )}

      <article
        className="relative overflow-hidden border border-foreground/10 bg-card/40 bg-[linear-gradient(135deg,oklch(0.58_0.26_300/0.07)_0%,transparent_48%),repeating-linear-gradient(-11deg,transparent,transparent_13px,oklch(0.93_0.04_300/0.035)_13px,oklch(0.93_0.04_300/0.035)_14px)] p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/60 hover:shadow-[0_0_60px_-20px_var(--color-primary)] sm:p-10 lg:p-12"
      >
        {/* Blueprint corner ticks */}
        <span
          className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-foreground/25 transition-colors duration-500 group-hover:border-primary/50"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-foreground/25 transition-colors duration-500 group-hover:border-primary/50"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-foreground/25 transition-colors duration-500 group-hover:border-primary/50"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-foreground/25 transition-colors duration-500 group-hover:border-primary/50"
          aria-hidden
        />

        <div className="relative z-1 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="order-2 min-w-0 flex-1 lg:order-1 lg:max-w-[min(100%,42rem)]">
            <h3 className="text-2xl font-display tracking-tight sm:text-3xl lg:text-[2.35rem] lg:leading-[1.1]">
              {feature.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {feature.description}
            </p>
          </div>

          <div className="order-1 flex shrink-0 justify-start lg:order-2 lg:w-[min(100%,200px)] lg:justify-end lg:pt-1">
            <span
              className="font-display text-[clamp(3.75rem,18vw,6.5rem)] leading-none tracking-tight text-foreground/90 transition-colors duration-500 tabular-nums group-hover:text-primary sm:text-[clamp(4rem,14vw,7rem)]"
              aria-hidden
            >
              {feature.number}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}

export function FeaturesSection() {
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
      id="practice"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Architecture with intent.
            <br />
            <span className="text-muted-foreground">Delivery with rigor.</span>
          </h2>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Practice
          </span>
        </div>

        {/* Features — drawing-set style list */}
        <div className="relative">
          <div
            className="pointer-events-none absolute left-[31px] top-0 hidden h-12 w-px bg-linear-to-b from-primary/60 to-primary/20 lg:block"
            aria-hidden
          />
          <div className="flex flex-col gap-10 lg:gap-14">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.number}
                feature={feature}
                isLast={index === features.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
