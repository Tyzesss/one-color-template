import type { CSSProperties } from "react";
import { Calendar, ClipboardCheck, Phone, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { useReveal } from "@/hooks/use-reveal";
import {
  HOW_IT_WORKS_STEPS,
  SECTION_TITLES,
} from "@/lib/site";
import type { HowItWorksStepIcon } from "@/lib/presets";
import { cn } from "@/lib/utils";

const STEP_ICONS: Record<HowItWorksStepIcon, LucideIcon> = {
  phone: Phone,
  calendar: Calendar,
  "clipboard-check": ClipboardCheck,
};

type ResolvedStep = {
  step: number;
  icon: LucideIcon;
  title: string;
  desc: string;
  descShort: string;
};

const STEPS: ResolvedStep[] = HOW_IT_WORKS_STEPS.map((step) => ({
  ...step,
  icon: STEP_ICONS[step.icon],
}));

function StepContent({
  icon: Icon,
  title,
  desc,
  descShort,
  compact,
}: Pick<ResolvedStep, "icon" | "title" | "desc" | "descShort"> & { compact?: boolean }) {
  return (
    <>
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand-cyan">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-white/75">
        {compact ? descShort : desc}
      </p>
    </>
  );
}

function MobileTimeline() {
  return (
    <ol className="timeline-rail-v mt-6 flex flex-col md:hidden">
      {STEPS.map(({ step, icon, title, desc, descShort }) => (
        <li key={step} className="timeline-step-v">
          <div className="timeline-step-v__track">
            <span className="timeline-marker">{step}</span>
          </div>
          <div className="panel-glass min-w-0 flex-1 rounded-2xl p-4 text-left md:p-5">
            <StepContent icon={icon} title={title} desc={desc} descShort={descShort} compact />
          </div>
        </li>
      ))}
    </ol>
  );
}

function DesktopTimelineCard({
  icon: Icon,
  title,
  desc,
  index,
}: Pick<ResolvedStep, "icon" | "title" | "desc"> & { index: number }) {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "panel-glass group flex w-full flex-1 flex-col rounded-2xl p-5 text-left transition-smooth md:hover:border-white/15",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand-cyan transition-smooth group-hover:scale-105">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-3 flex-1 text-xs leading-relaxed text-white/75">{desc}</p>
    </div>
  );
}

function DesktopTimeline() {
  return (
    <div className="timeline-desktop mt-10 hidden md:grid">
      {STEPS.map(({ step, icon, title, desc }, i) => (
        <div key={step} className="timeline-col-h">
          <span className="timeline-marker">{step}</span>
          <DesktopTimelineCard icon={icon} title={title} desc={desc} index={i} />
        </div>
      ))}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section
      id="jak-dzialamy"
      className="relative scroll-mt-24 overflow-hidden px-4 pt-6 pb-10 text-foreground md:py-16"
    >
      <div
        className="section-glow section-glow--cyan pointer-events-none"
        style={{ "--glow-x": "38%", "--glow-y": "24%" } as CSSProperties}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="panel-glass rounded-2xl p-5 text-center md:p-8 lg:p-10">
          <Reveal>
            <p className="section-eyebrow">{SECTION_TITLES.howItWorksEyebrow}</p>
            <h2 className="mt-1.5 text-xl font-bold text-white md:mt-2 md:text-3xl">
              {SECTION_TITLES.howItWorksTitle}
            </h2>
            <p className="mx-auto mt-1.5 max-w-xl text-xs text-white/75 md:mt-2 md:text-base">
              {SECTION_TITLES.howItWorksSubtitle}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <MobileTimeline />
            <DesktopTimeline />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
