import { Reveal } from "@/components/Reveal";
import { PARTNERS } from "@/lib/site";

export function PartnersSection() {
  if (PARTNERS.length === 0) return null;

  // Two identical sequences → seamless -50% translate loop.
  const strip = [...PARTNERS, ...PARTNERS];

  return (
    <Reveal className="relative z-10 py-2 md:py-4">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground md:text-sm">
          Autoryzowany partner
        </p>
      </div>

      <div className="partners-marquee mt-6 md:mt-10" aria-label={PARTNERS.join(", ")}>
        <ul className="partners-marquee__track">
          {strip.map((partner, i) => (
            <li
              key={`${partner}-${i}`}
              className="partners-marquee__item"
              aria-hidden={i >= PARTNERS.length}
            >
              {partner}
            </li>
          ))}
        </ul>
        <div className="partners-marquee__fade partners-marquee__fade--left" aria-hidden />
        <div className="partners-marquee__fade partners-marquee__fade--right" aria-hidden />
      </div>
    </Reveal>
  );
}
