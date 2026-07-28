import { Reveal } from "@/components/Reveal";
import { PARTNERS } from "@/lib/site";

export function PartnersSection() {
  if (PARTNERS.length === 0) return null;

  // Duplicate for seamless loop on mobile marquee.
  const mobileStrip = [...PARTNERS, ...PARTNERS];

  return (
    <Reveal className="relative z-10 py-1 md:px-4 md:py-0 md:pb-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-white/55 md:text-sm">
          Autoryzowany partner
        </p>

        {/* Mobile: horizontal marquee — no wrap chaos, minimal height */}
        <div className="partners-marquee mt-5 md:hidden" aria-label={PARTNERS.join(", ")}>
          <ul className="partners-marquee__track">
            {mobileStrip.map((partner, i) => (
              <li key={`${partner}-${i}`} className="partners-marquee__item" aria-hidden={i >= PARTNERS.length}>
                {partner}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: unchanged middot line */}
        <p className="mx-auto mt-2 hidden max-w-4xl text-sm font-medium text-white/80 md:block md:text-base lg:text-lg">
          {PARTNERS.join(" · ")}
        </p>
      </div>
    </Reveal>
  );
}
