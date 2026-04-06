"use client";

import { useEffect, useState, useRef } from "react";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.35 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div
      ref={ref}
      className="font-display text-5xl tracking-tight text-foreground tabular-nums sm:text-6xl lg:text-7xl"
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

const metrics = [
  {
    ref: "01",
    value: 127,
    suffix: "",
    prefix: "",
    label: "Completed commissions",
  },
  {
    ref: "02",
    value: 19,
    suffix: "+ yrs",
    prefix: "",
    label: "Continuous practice",
  },
  {
    ref: "03",
    value: 96,
    suffix: "%",
    prefix: "",
    label: "On-time drawing milestones (rolling)",
  },
  {
    ref: "04",
    value: 14,
    suffix: "",
    prefix: "",
    label: "Design awards & citations",
  },
];

export function MetricsSection() {
  const [time, setTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

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
      id="metrics"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-foreground/10 py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_0%,oklch(0.58_0.26_300/0.1),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className={`max-w-2xl font-display text-4xl tracking-tight transition-all delay-100 duration-700 lg:text-6xl ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Outcomes you
              <br />
              <span className="text-muted-foreground">can walk through.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {metrics.map((metric, index) => (
            <div
              key={metric.ref}
              className={`group relative border border-foreground/10 bg-card/40 bg-[linear-gradient(135deg,oklch(0.58_0.26_300/0.06)_0%,transparent_45%)] p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/35 hover:shadow-[0_0_40px_-18px_var(--color-primary)] sm:p-7 lg:p-8 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 90 + 150}ms` }}
            >
              <span
                className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-foreground/20 transition-colors duration-500 group-hover:border-primary/45"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-foreground/20 transition-colors duration-500 group-hover:border-primary/45"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-foreground/20 transition-colors duration-500 group-hover:border-primary/45"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-foreground/20 transition-colors duration-500 group-hover:border-primary/45"
                aria-hidden
              />

              <div className="relative z-1 mb-5 flex items-baseline justify-between gap-2 border-b border-foreground/10 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-primary/85">Fig. {metric.ref}</span>
              </div>

              <AnimatedCounter end={metric.value} suffix={metric.suffix} prefix={metric.prefix} />

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">{metric.label}</p>

              <div className="mt-5 h-px w-full bg-linear-to-r from-primary/50 via-transparent to-transparent opacity-60" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
