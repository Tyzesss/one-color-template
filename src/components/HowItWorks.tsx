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
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-muted text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
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
          <div className="group min-w-0 flex-1 rounded-[1.5rem] border border-[#f1f5f9] bg-white p-4 text-left shadow-sm transition-all duration-300 hover:shadow-xl md:p-5">
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
        "group flex w-full flex-1 flex-col rounded-[1.5rem] border border-[#f1f5f9] bg-white p-5 text-left shadow-sm transition-all duration-300 md:hover:shadow-xl",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-muted text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
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
      className="relative scroll-mt-24 overflow-hidden rounded-[2rem] bg-[#f8fafc] px-4 pt-6 pb-10 text-foreground md:rounded-[3rem] md:py-16"
    >
      <div className="relative mx-auto max-w-7xl text-center">
        <Reveal>
          <p className="section-eyebrow">{SECTION_TITLES.howItWorksEyebrow}</p>
          <h2 className="mt-1.5 text-xl font-bold text-foreground md:mt-2 md:text-3xl">
            {SECTION_TITLES.howItWorksTitle}
          </h2>
          <p className="mx-auto mt-1.5 max-w-xl text-xs text-muted-foreground md:mt-2 md:text-base">
            {SECTION_TITLES.howItWorksSubtitle}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <MobileTimeline />
          <DesktopTimeline />
        </Reveal>
      </div>
    </section>
  );
}
