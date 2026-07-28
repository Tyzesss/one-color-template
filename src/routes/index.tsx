import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Wrench,
  ShieldCheck,
  Zap,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Menu,
  X,
  Star,
  Snowflake,
  Wind,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MobileCarousel } from "@/components/MobileCarousel";
import { SiteLogo } from "@/components/SiteLogo";
import { PartnersSection } from "@/components/PartnersSection";
import { StickyCallBar } from "@/components/StickyCallBar";
import { HowItWorks } from "@/components/HowItWorks";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { submitLeadForm } from "@/lib/web3forms";

import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_CITY,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  CONTACT_LOCATION,
  CONTACT_LOCATION_LABEL,
  HAS_PHYSICAL_ADDRESS,
  HOURS,
  MAPS_URL,
  NIP,
  GALLERY,
  GOOGLE_REVIEWS_URL,
  HERO_IMAGE,
  HERO_HEADLINE,
  HERO_HEADLINE_MOBILE_LINES,
  HERO_BULLETS,
  HERO_DESCRIPTION,
  HERO_TRUST_BADGES,
  FOOTER_TAGLINE,
  SERVICES_SECTION_SUBTITLE,
  GALLERY_SECTION_SUBTITLE,
  SERVICES,
  FAQS,
  SERVICE_OPTION_GROUPS,
  SECTIONS,
  SECTION_TITLES,
} from "@/lib/site";
import type { HeroTrustBadgeIcon, ServiceIcon, ServiceItem } from "@/lib/presets";

export const Route = createFileRoute("/")({
  loader: async () => {
    const { getGoogleReviews } = await import("@/lib/google-reviews.server");
    return { googleReviews: await getGoogleReviews() };
  },
  component: Index,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
    ],
  }),
});

const NAV_LINKS = [
  { href: "#uslugi", label: "Usługi" },
  ...(SECTIONS.howItWorks ? [{ href: "#jak-dzialamy", label: "Jak to działa" }] : []),
  ...(SECTIONS.gallery ? [{ href: "#realizacje", label: "Realizacje" }] : []),
  ...(SECTIONS.reviews ? [{ href: "#opinie", label: "Opinie" }] : []),
  ...(SECTIONS.faq ? [{ href: "#faq", label: "FAQ" }] : []),
  { href: "#kontakt", label: "Kontakt" },
];

const SERVICE_ICONS: Record<ServiceIcon, typeof Wrench> = {
  wrench: Wrench,
  "shield-check": ShieldCheck,
  zap: Zap,
  "alert-triangle": AlertTriangle,
  "check-circle": CheckCircle2,
  flame: Flame,
  snowflake: Snowflake,
  wind: Wind,
};

const services = SERVICES.map((s) => ({ ...s, icon: SERVICE_ICONS[s.icon] }));

const gallery = GALLERY;
const GALLERY_PREVIEW_COUNT = 3;

const faqs = FAQS;


function HeroGoogleRating({
  rating,
  reviewCount,
  profileUrl,
  className,
  compact = false,
}: {
  rating: number;
  reviewCount: number;
  profileUrl: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/[0.06] bg-white/[0.04] text-white/85 backdrop-blur-[10px] transition-smooth hover:border-white/15 hover:bg-white/[0.07]",
        compact ? "px-2.5 py-1 text-[0.6875rem]" : "px-3 py-1.5 text-xs sm:text-sm",
        className,
      )}
    >
      <div className="flex shrink-0" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "fill-amber-400 text-amber-400",
              compact ? "h-2.5 w-2.5" : "h-3 w-3 sm:h-3.5 sm:w-3.5",
            )}
          />
        ))}
      </div>
      <span className="font-semibold text-white">{rating.toFixed(1)}</span>
      <span className="text-white/65">· {reviewCount} opinii Google</span>
    </a>
  );
}

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={PHONE_HREF}
      className={cn(
        "btn-cta px-6 py-3.5 text-sm md:px-10 md:py-4 md:text-lg",
        className,
      )}
    >
      <Phone className="h-6 w-6 shrink-0 md:h-6 md:w-6" />
      <span>Zadzwoń · {PHONE_DISPLAY}</span>
    </a>
  );
}

const HERO_TRUST_ICONS: Record<HeroTrustBadgeIcon, typeof ShieldCheck> = {
  "shield-check": ShieldCheck,
  snowflake: Snowflake,
  "map-pin": MapPin,
};

function HeroTrustBadges({
  badges,
}: {
  badges: { label: string; icon: HeroTrustBadgeIcon }[];
}) {
  if (!badges.length) return null;

  return (
    <ul className="space-y-2.5 text-left md:space-y-3">
      {badges.map((badge) => {
        const Icon = HERO_TRUST_ICONS[badge.icon];
        return (
          <li key={badge.label} className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-cyan/40 bg-brand-cyan/15 text-brand-cyan md:h-9 md:w-9"
              aria-hidden
            >
              <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2} />
            </span>
            <span className="text-base leading-snug text-white md:text-lg">{badge.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

function LeadForm({
  idPrefix = "lead",
  submitVariant = "primary",
  collapseExtras = false,
}: {
  idPrefix?: string;
  submitVariant?: "primary" | "secondary";
  /** Na mobile: imię i usługa za „Więcej opcji” + zwarty układ pod konwersję. */
  collapseExtras?: boolean;
}) {
  const [service, setService] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const phoneId = `${idPrefix}-phone`;
  const nameId = `${idPrefix}-name`;
  const serviceId = `${idPrefix}-service`;
  const moreId = `${idPrefix}-more`;

  const inputClass =
    "h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 text-sm text-white placeholder:text-white/50 outline-none transition-smooth focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/25";

  const labelClass = "text-xs font-medium text-white/85";

  const selectTriggerClass = cn(
    "h-11 w-full rounded-lg border-white/20 bg-white/10 text-sm text-white shadow-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/25 data-[placeholder]:text-white/50",
  );

  const extraFields = (
    <>
      <div className="grid gap-1.5">
        <Label htmlFor={nameId} className={labelClass}>
          Imię <span className="text-white/50">(opcjonalnie)</span>
        </Label>
        <input
          id={nameId}
          type="text"
          name="name"
          autoComplete="given-name"
          placeholder="Twoje imię"
          className={inputClass}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor={serviceId} className={labelClass}>
          Rodzaj usługi <span className="text-white/50">(opcjonalnie)</span>
        </Label>
        <input type="hidden" name="service" value={service} />
        <Select value={service || undefined} onValueChange={setService}>
          <SelectTrigger id={serviceId} className={selectTriggerClass}>
            <SelectValue placeholder="Wybierz z listy" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            {SERVICE_OPTION_GROUPS.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting) return;

        const form = e.currentTarget;
        const formData = new FormData(form);
        const phone = String(formData.get("phone") ?? "").trim();
        const name = String(formData.get("name") ?? "").trim();

        setSubmitting(true);
        try {
          await submitLeadForm({ name, phone, service: service || undefined });
          toast.success("Dziękujemy! Oddzwonimy do Ciebie wkrótce.", {
            description: "Twoje zgłoszenie zostało przyjęte.",
          });
          form.reset();
          setService("");
          setMoreOpen(false);
        } catch {
          toast.error("Nie udało się wysłać zgłoszenia.", {
            description: `Zadzwoń: ${PHONE_DISPLAY}`,
          });
        } finally {
          setSubmitting(false);
        }
      }}
      className={cn("grid text-left", collapseExtras ? "gap-2.5" : "gap-3.5")}
    >
      <div className={cn("grid", collapseExtras ? "gap-0" : "gap-1.5")}>
        <Label htmlFor={phoneId} className={collapseExtras ? "sr-only" : labelClass}>
          Telefon
        </Label>
        <input
          required
          id={phoneId}
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="Twój numer"
          className={inputClass}
        />
      </div>

      {collapseExtras ? (
        <div>
          <button
            type="button"
            id={moreId}
            aria-expanded={moreOpen}
            aria-controls={`${idPrefix}-extra`}
            onClick={() => setMoreOpen((open) => !open)}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-white/50 transition-smooth hover:text-white/80"
          >
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                moreOpen && "rotate-180",
              )}
              aria-hidden
            />
            {moreOpen ? "Mniej" : "Więcej opcji"}
          </button>

          <div
            id={`${idPrefix}-extra`}
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              moreOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
            aria-hidden={!moreOpen}
            inert={!moreOpen ? true : undefined}
          >
            <div className="overflow-hidden">
              <div
                className={cn(
                  "mt-2.5 grid gap-3 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  moreOpen ? "opacity-100" : "opacity-0",
                )}
              >
                {extraFields}
              </div>
            </div>
          </div>
        </div>
      ) : (
        extraFields
      )}

      <label
        className={cn(
          "flex cursor-pointer items-center gap-2.5 leading-snug",
          collapseExtras ? "text-[11px] text-white/55" : "text-xs text-white/75",
        )}
      >
        <span className="relative inline-flex h-4 w-4 shrink-0">
          <input
            required
            type="checkbox"
            name="rodo"
            className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
          />
          <span
            className="pointer-events-none flex h-4 w-4 items-center justify-center rounded border border-white/35 bg-white/10 transition-colors peer-checked:border-[var(--brand-cyan)] peer-checked:bg-[var(--brand-cyan)] peer-checked:[&_svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--brand-cyan)]/40"
            aria-hidden
          >
            <svg
              viewBox="0 0 12 12"
              className="h-2.5 w-2.5 text-white opacity-0 transition-opacity"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 6.2 4.8 9 10 3" />
            </svg>
          </span>
        </span>
        <span className="min-w-0">
          Akceptuję{" "}
          <Link to="/polityka-prywatnosci" className="text-brand-cyan underline underline-offset-2 hover:text-white">
            Politykę prywatności
          </Link>{" "}
          i wyrażam zgodę na kontakt.
        </span>
      </label>
      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "w-full disabled:opacity-60",
          collapseExtras
            ? "btn-cta mt-1 h-10 text-sm"
            : cn("h-11 text-sm", submitVariant === "secondary" ? "btn-secondary" : "btn-cta"),
        )}
      >
        {submitting ? "Wysyłanie…" : "Poproś o kontakt"}
      </button>
    </form>
  );
}

function ServiceCard({ s, index }: { s: ServiceItem & { icon: typeof Wrench }; index: number }) {
  const Icon = s.icon;
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(s.image) && !imgError;
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "card-glass group relative flex h-full flex-col overflow-hidden rounded-2xl text-left transition-smooth md:hover:-translate-y-0.5 md:hover:border-brand-cyan/25 md:hover:shadow-glow",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-brand-deep">
        {showImage ? (
          <img
            src={s.image}
            alt={s.imageAlt ?? s.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-deep via-brand-navy to-brand-deep px-6"
            aria-hidden
          >
            <Icon className="h-9 w-9 text-brand-cyan/35" />
            <span className="text-center text-[0.65rem] font-medium uppercase tracking-wider text-white/30">
              Zdjęcie usługi
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/35 to-transparent" />
        {showImage ? (
          <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-background/90 text-brand-cyan shadow-sm backdrop-blur-sm">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="text-base font-semibold text-foreground md:text-lg">{s.title}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-snug text-muted-foreground md:text-[0.9375rem] md:leading-relaxed">
          {s.desc}
        </p>
      </div>
    </div>
  );
}

function GalleryLightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: typeof gallery;
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");

  const goTo = (next: number, dir: "left" | "right") => {
    setSlideDir(dir);
    onChange(next);
  };

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo((index - 1 + items.length) % items.length, "left");
      if (e.key === "ArrowRight") goTo((index + 1) % items.length, "right");
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onClose]);

  if (index === null) return null;
  const item = items[index];
  if (!item) return null;

  const hasNav = items.length > 1;
  const prev = () => goTo((index - 1 + items.length) % items.length, "left");
  const next = () => goTo((index + 1) % items.length, "right");

  return (
    <div
      className="gallery-lightbox fixed inset-0 z-[100] bg-background"
      role="dialog"
      aria-modal="true"
      aria-label="Podgląd realizacji"
    >
      <div
        className="section-glow section-glow--cyan pointer-events-none absolute inset-0 opacity-40"
        style={{ "--glow-x": "50%", "--glow-y": "40%", "--glow-strength": "0.06" } as CSSProperties}
        aria-hidden
      />

      <button
        type="button"
        onClick={onClose}
        className="gallery-lightbox__close absolute right-3 top-3 z-20 md:right-5 md:top-5"
        aria-label="Zamknij podgląd"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative z-10 flex h-full items-center justify-center gap-2 px-3 py-14 sm:gap-4 sm:px-6 md:gap-5">
        {hasNav ? (
          <button type="button" onClick={prev} className="gallery-lightbox__nav shrink-0" aria-label="Poprzednie zdjęcie">
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : (
          <span className="hidden w-10 shrink-0 sm:block" aria-hidden />
        )}

        <div className="min-w-0 flex-1">
          <div className="gallery-lightbox__frame overflow-hidden rounded-2xl border border-white/10 bg-brand-navy/30 ring-1 ring-white/10">
            <img
              key={index}
              src={item.image}
              alt={item.alt}
              className={cn(
                "gallery-lightbox__image max-h-[min(72vh,760px)] w-full object-contain",
                slideDir === "right" ? "gallery-lightbox__image--from-right" : "gallery-lightbox__image--from-left",
              )}
            />
          </div>
          {hasNav ? (
            <p className="mt-3 text-center text-xs tabular-nums text-muted-foreground">
              {index + 1} / {items.length}
            </p>
          ) : null}
        </div>

        {hasNav ? (
          <button type="button" onClick={next} className="gallery-lightbox__nav shrink-0" aria-label="Następne zdjęcie">
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : (
          <span className="hidden w-10 shrink-0 sm:block" aria-hidden />
        )}
      </div>
    </div>
  );
}

function GallerySection() {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hasMore = gallery.length > GALLERY_PREVIEW_COUNT;
  const visible = expanded ? gallery : gallery.slice(0, GALLERY_PREVIEW_COUNT);

  return (
    <>
      <MobileCarousel
        dark
        items={gallery}
        renderItem={(g) => (
          <GalleryCard
            g={g}
            onOpen={() => setLightboxIndex(gallery.findIndex((item) => item.image === g.image))}
          />
        )}
      />
      <div className="hidden md:grid grid-cols-3 gap-5">
        {visible.map((g, i) => (
          <GalleryCard key={g.image} g={g} index={i} onOpen={() => setLightboxIndex(i)} />
        ))}
      </div>

      {hasMore ? (
        <Reveal delay={120} className="mt-8 hidden justify-center md:flex">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="btn-secondary px-6 py-3 text-sm"
            aria-expanded={expanded}
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")}
              aria-hidden
            />
            {expanded ? "Pokaż mniej" : `Pokaż wszystkie realizacje (${gallery.length})`}
          </button>
        </Reveal>
      ) : null}

      <GalleryLightbox
        items={gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  );
}

function GalleryCard({
  g,
  index = 0,
  onOpen,
}: {
  g: (typeof gallery)[number];
  index?: number;
  onOpen: () => void;
}) {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  return (
    <figure
      ref={ref}
      className={cn("group", revealClass)}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full aspect-[4/3] overflow-hidden rounded-xl border border-white/15 bg-brand-deep text-left shadow-card ring-1 ring-white/10 transition-smooth md:group-hover:-translate-y-0.5 md:group-hover:border-brand-cyan/30 md:group-hover:shadow-glow cursor-zoom-in"
        aria-label={`Powiększ: ${g.alt}`}
      >
        <img
          src={g.image}
          alt={g.alt}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      </button>
    </figure>
  );
}

const contactCards = [
  { type: "phone", icon: Phone, title: "Zadzwoń", value: PHONE_DISPLAY, href: PHONE_HREF },
  { type: "email", icon: Mail, title: "E-mail", value: EMAIL, href: EMAIL_HREF },
  ...(CONTACT_LOCATION
    ? [
        {
          type: HAS_PHYSICAL_ADDRESS ? ("address" as const) : ("area" as const),
          icon: MapPin,
          title: CONTACT_LOCATION_LABEL,
          value: CONTACT_LOCATION,
          href: HAS_PHYSICAL_ADDRESS ? MAPS_URL : (null as string | null),
        },
      ]
    : []),
  { type: "hours", icon: Clock, title: "Godziny", value: HOURS, href: null as string | null },
];

function ContactCard({
  c,
  index = 0,
}: {
  c: (typeof contactCards)[number];
  index?: number;
}) {
  const Icon = c.icon;
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  const inner = (
    <div
      ref={ref}
      className={cn(
        "flex h-[5.5rem] w-full min-w-0 items-center gap-4 px-5 text-left transition-smooth md:h-24 md:px-5",
        "rounded-2xl border border-white/[0.08] bg-white/[0.04]",
        "md:hover:border-white/15 md:hover:bg-white/[0.06]",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-cyan/45 bg-brand-cyan/10 text-brand-cyan md:h-12 md:w-12"
        aria-hidden
      >
        <Icon className="h-5 w-5 md:h-[1.35rem] md:w-[1.35rem]" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-white/50 md:text-xs">
          {c.title}
        </p>
        <p
          className={cn(
            "mt-1 text-[0.9375rem] font-semibold leading-snug text-white md:text-lg",
            c.type === "email" ? "break-all" : "break-words",
          )}
        >
          {c.value}
        </p>
      </div>
    </div>
  );
  return c.href ? (
    <a
      href={c.href}
      target={c.type === "address" ? "_blank" : undefined}
      rel="noreferrer"
      className="group block w-full min-w-0"
    >
      {inner}
    </a>
  ) : (
    <div className="w-full min-w-0">{inner}</div>
  );
}

/** Sticky bar: h-16 mobile (64px), h-20 desktop (80px). */
const HEADER_HEIGHT = 80;
const SECTION_GAP = 20;

let navScrollRaf = 0;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/** Own tween — avoids CSS `scroll-behavior` / native hash fights on mobile. */
function animateScrollTo(targetY: number, durationMs = 500) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  if (navScrollRaf) cancelAnimationFrame(navScrollRaf);

  const root = document.documentElement;
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  const startTime = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - startTime) / durationMs);
    window.scrollTo(0, startY + distance * easeOutCubic(t));
    if (t < 1) {
      navScrollRaf = requestAnimationFrame(tick);
    } else {
      root.style.scrollBehavior = prevBehavior;
      navScrollRaf = 0;
    }
  };
  navScrollRaf = requestAnimationFrame(tick);
}

function scrollToSection(href: string) {
  const id = href.replace(/^#/, "");
  if (!id) return;
  const section = document.getElementById(id);
  if (!section) return;

  // Content wrapper (skips section padding void under the navbar).
  const content =
    section.querySelector<HTMLElement>(":scope > .relative") ?? section;

  const header = document.querySelector("header");
  const headerH = header?.getBoundingClientRect().height ?? HEADER_HEIGHT;
  const targetY = Math.max(
    0,
    content.getBoundingClientRect().top + window.scrollY - headerH - SECTION_GAP,
  );

  animateScrollTo(targetY);

  if (window.location.hash !== href) {
    history.replaceState(null, "", href);
  }
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.dataset.mobileNavOpen = menuOpen ? "true" : "false";
    return () => {
      delete document.body.dataset.mobileNavOpen;
    };
  }, [menuOpen]);

  const goTo = (href: string) => {
    setMenuOpen(false);
    // Measure only after menu close has painted — same path for hero and mid-page.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToSection(href);
      });
    });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-background transition-smooth",
        scrolled && "shadow-card",
      )}
    >
      <div className="relative z-[60] bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-20">
          <a
            href="#top"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              goTo("#top");
            }}
          >
            <SiteLogo imageClassName="h-11 max-w-[220px] md:h-14 md:max-w-[340px]" />
          </a>

          <nav className="hidden items-center gap-7 text-base font-medium md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-smooth hover:text-brand-cyan hover:underline hover:underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PHONE_HREF}
              className="btn-cta max-md:!hidden md:inline-flex px-6 py-3 text-base"
            >
              <Phone className="h-5 w-5" /> Zadzwoń
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-smooth hover:bg-white/10 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              <Menu
                className={cn(
                  "h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  menuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100",
                )}
                aria-hidden
              />
              <X
                className={cn(
                  "absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0",
                )}
                aria-hidden
              />
            </button>
          </div>
        </div>
      </div>

      {/* Scrim starts under the bar so navbar color stays correct. */}
      <button
        type="button"
        tabIndex={menuOpen ? 0 : -1}
        aria-label="Zamknij menu"
        onClick={() => setMenuOpen(false)}
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Floating panel — detached from navbar */}
      <div
        id="mobile-nav"
        className={cn(
          "absolute left-3 right-3 top-[calc(100%+0.5rem)] z-50 origin-top md:hidden",
          "rounded-2xl border border-white/10 bg-background p-2",
          "shadow-[0_20px_50px_-20px_oklch(0_0_0/0.65)]",
          "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <nav className="flex flex-col gap-0.5">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? undefined : -1}
              onClick={(e) => {
                e.preventDefault();
                goTo(link.href);
              }}
              className={cn(
                "rounded-xl px-3.5 py-2.5 text-[0.95rem] font-semibold tracking-tight text-white/90",
                "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "hover:bg-white/5 hover:text-brand-cyan active:bg-white/8",
                menuOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
              )}
              style={{ transitionDelay: menuOpen ? `${50 + i * 30}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-1.5 border-t border-white/10 p-1.5 pt-2.5">
          <a
            href={PHONE_HREF}
            tabIndex={menuOpen ? undefined : -1}
            className="btn-cta flex w-full items-center justify-center gap-2 py-2.5 text-sm"
            onClick={() => setMenuOpen(false)}
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span>Zadzwoń · {PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Index() {
  const { googleReviews } = Route.useLoaderData();
  const [heroPrime, setHeroPrime] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const key = "klimatpro-hero-prime";
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      setHeroPrime(true);
    }
  }, []);

  return (
    <div className="page-shell">
      <div className="page-ambient-scatter" aria-hidden />
      <div className="page-content">
      <SiteHeader />

      <div className={cn("hero-services-unit", heroPrime && "hero-prime")}>
        <div className="hero-services-bg" aria-hidden>
          <div
            className="hero-photo"
            style={{ backgroundImage: `url(${HERO_IMAGE ?? "/gallery/placeholder-1.svg"})` }}
          />
          <div className="hero-photo-scrim" />
        </div>

        <section
          id="top"
          className="relative z-10 scroll-mt-24 px-4 pt-6 pb-12 text-foreground max-md:min-h-[36rem] md:min-h-[calc(100svh-7.5rem)] md:pt-16 md:pb-20"
        >
        <div
          className={cn(
            "relative mx-auto w-full max-w-7xl md:items-start",
            SECTIONS.contactForm
              ? "md:grid md:grid-cols-[minmax(0,1.12fr)_minmax(0,0.98fr)] md:gap-9 lg:gap-11"
              : "md:text-center",
          )}
        >
          <div
            className={cn(
              "flex flex-col items-center text-center",
              SECTIONS.contactForm
                ? "md:col-start-1 md:row-start-1 md:items-start md:text-left"
                : "md:mx-auto md:max-w-2xl",
            )}
          >
            <div className="hero-enter hero-enter-delay-0 mb-3 flex justify-center md:hidden">
              <HeroGoogleRating
                rating={googleReviews.rating}
                reviewCount={googleReviews.reviewCount}
                profileUrl={googleReviews.profileUrl || GOOGLE_REVIEWS_URL}
                className="gap-x-2.5 px-3.5 py-1.5 text-sm"
              />
            </div>

            <h1 className="hero-enter hero-enter-delay-1 relative font-bold leading-[1.12] max-md:mx-auto md:text-[clamp(2.5rem,2.65vw+1.1rem,3.75rem)] md:leading-[1.14]">
              {HERO_HEADLINE_MOBILE_LINES?.length ? (
                <>
                  <span className="hero-headline-mobile md:hidden">
                    {HERO_HEADLINE_MOBILE_LINES.map((line, i) => (
                      <span
                        key={line}
                        className={cn(
                          "hero-headline-mobile__line",
                          i === HERO_HEADLINE_MOBILE_LINES.length - 1 && "hero-headline-mobile__line--nowrap",
                        )}
                      >
                        {line}
                      </span>
                    ))}
                  </span>
                  <span className="hidden md:block">
                    {HERO_HEADLINE_MOBILE_LINES.map((line) => (
                      <span key={line} className="block whitespace-nowrap">
                        {line}
                      </span>
                    ))}
                  </span>
                </>
              ) : (
                HERO_HEADLINE
              )}
            </h1>

            <p className="hero-enter hero-enter-delay-2 mt-2 text-xl font-medium text-white/85 md:mt-3.5 md:text-[1.7rem]">
              {SITE_CITY}
            </p>

            <div className="hero-enter hero-enter-delay-2 mt-4 hidden justify-start md:flex">
              <HeroGoogleRating
                rating={googleReviews.rating}
                reviewCount={googleReviews.reviewCount}
                profileUrl={googleReviews.profileUrl || GOOGLE_REVIEWS_URL}
                className="gap-x-2.5 px-3.5 py-1.5 text-sm md:[&_svg]:h-3.5 md:[&_svg]:w-3.5"
              />
            </div>

            {HERO_TRUST_BADGES.length > 0 ? (
              <div className="hero-enter hero-enter-delay-3 mt-5 hidden md:mt-6 md:block">
                <HeroTrustBadges badges={HERO_TRUST_BADGES} />
              </div>
            ) : HERO_DESCRIPTION ? (
              <p className="hero-enter hero-enter-delay-3 mt-5 hidden max-w-lg text-left text-base leading-relaxed text-white/75 md:mt-6 md:block lg:text-[1.0625rem] lg:leading-[1.65]">
                {HERO_DESCRIPTION}
              </p>
            ) : (
              <ul className="hero-enter hero-enter-delay-3 mx-auto mt-4 hidden max-w-xl space-y-2.5 text-left text-base leading-snug text-white/85 md:mx-0 md:mt-6 md:block md:max-w-none md:space-y-3.5 md:text-[1.25rem] md:leading-relaxed">
                {HERO_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 md:gap-3">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan md:mt-3 md:h-2 md:w-2"
                      aria-hidden
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            <div className="hero-enter hero-enter-delay-4 mt-7 hidden md:mt-8 md:block">
              <CTAButton className="md:px-10 md:py-4 md:text-lg" />
            </div>

            {/* Mobile: Call przy H1 */}
            <div className="hero-enter hero-enter-delay-5 mt-5 flex justify-center md:hidden">
              <CTAButton className="px-7 py-3.5 text-[0.9375rem]" />
            </div>
          </div>

          {SECTIONS.contactForm ? (
            <>
              <div className="hero-enter hero-enter-delay-6 mx-6 my-6 flex items-center gap-3 md:hidden" aria-hidden>
                <span className="h-px flex-1 bg-white/12" />
                <span className="text-xs font-medium uppercase tracking-wide text-white/45">lub</span>
                <span className="h-px flex-1 bg-white/12" />
              </div>

              {/* Mobile: sam formularz */}
              <div className="hero-enter hero-enter-delay-7 w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5 backdrop-blur-[10px] md:hidden">
                <p className="text-center text-base font-semibold text-white">{SECTION_TITLES.formHeadline}</p>
                <p className="mt-1 text-center text-xs text-white/60">{SECTION_TITLES.formSubline}</p>
                <div className="mt-3.5">
                  <LeadForm idPrefix="hero-mobile" collapseExtras />
                </div>
              </div>

              {/* Desktop: formularz — top równo z chipem opinii */}
              <div className="hero-enter hero-enter-delay-7 mt-5 hidden w-full self-start rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5 text-left backdrop-blur-[10px] md:col-start-2 md:row-start-1 md:mt-0 md:block md:p-8 lg:p-9">
                <p className="text-xl font-semibold text-white">Nie możesz się skontaktować?</p>
                <p className="mt-1.5 text-base text-white/75">
                  Zostaw numer, oddzwonimy do Ciebie.
                </p>
                <div className="mt-6 [&_input]:h-12 [&_button[role=combobox]]:h-12 [&_.text-sm]:text-base [&_label]:text-sm">
                  <LeadForm idPrefix="hero-desktop" />
                </div>
              </div>
            </>
          ) : null}
        </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 hidden justify-center md:flex">
            <a
              href="#uslugi"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#uslugi");
              }}
              className="hero-scroll-cue pointer-events-auto flex flex-col items-center gap-1 text-white/45 transition-smooth hover:text-white/75"
            >
              <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em]">
                Przewiń
              </span>
              <ChevronDown className="hero-scroll-cue__icon h-5 w-5" strokeWidth={1.75} aria-hidden />
            </a>
          </div>
        </section>

        <Section
          id="uslugi"
          className="max-md:pb-6"
          eyebrow={SECTION_TITLES.servicesEyebrow}
          title={SECTION_TITLES.servicesTitle}
          subtitle={SERVICES_SECTION_SUBTITLE}
          glow={{ x: "22%", y: "58%", strength: 0.035 }}
        >
          <MobileCarousel dark items={services} renderItem={(s) => <ServiceCard s={s} index={services.indexOf(s)} />} />
          <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} index={i} />
            ))}
          </div>

          {SECTIONS.partners ? (
            <div className="mt-7 pb-3 md:mt-8 md:pb-0">
              <PartnersSection />
            </div>
          ) : null}
        </Section>
      </div>

      {SECTIONS.howItWorks ? <HowItWorks /> : null}

      {SECTIONS.gallery ? (
        <Section
          id="realizacje"
          eyebrow={SECTION_TITLES.galleryEyebrow}
          title={SECTION_TITLES.galleryTitle}
          subtitle={GALLERY_SECTION_SUBTITLE}
          glow={{ x: "44%", y: "48%" }}
        >
          <GallerySection />
        </Section>
      ) : null}

      {SECTIONS.reviews ? (
        <Section
          id="opinie"
          panel
          eyebrow={SECTION_TITLES.reviewsEyebrow}
          title={SECTION_TITLES.reviewsTitle}
          subtitle={SECTION_TITLES.reviewsSubtitle}
          glow={{ x: "78%", y: "36%", cyan: true }}
        >
          <GoogleReviewsSection data={googleReviews} />
        </Section>
      ) : null}

      {SECTIONS.faq ? (
        <Section
          id="faq"
          eyebrow={SECTION_TITLES.faqEyebrow}
          title={SECTION_TITLES.faqTitle}
          subtitle={SECTION_TITLES.faqSubtitle}
        >
        <Reveal>
          <div className="card-glass mx-auto max-w-3xl rounded-xl px-2 md:max-w-4xl md:px-5 lg:max-w-5xl lg:px-6">
            <Accordion type="single" collapsible className="w-full text-left">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10 px-2">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-brand-cyan hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>
      ) : null}

      {/* KONTAKT + WYCENA */}
      <section
        id="kontakt"
        className="relative scroll-mt-24 overflow-hidden px-4 pt-10 pb-14 text-foreground md:pt-16 md:pb-20"
      >
        <div
          className="section-glow section-glow--cyan pointer-events-none"
          style={{ "--glow-x": "16%", "--glow-y": "55%", "--glow-strength": "0.05" } as CSSProperties}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl">
          <div id="wycena" className="scroll-mt-24">
            <div className="panel-glass rounded-2xl p-5 md:hidden">
              <Reveal className="text-center">
                <p className="section-eyebrow">{SECTION_TITLES.contactEyebrow}</p>
                <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white">
                  {SECTION_TITLES.contactTitle}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                  {SECTION_TITLES.contactSubtitle}
                </p>
              </Reveal>

              <div className="mt-6 flex flex-col gap-3">
                {contactCards.map((c, i) => (
                  <ContactCard key={c.title} c={c} index={i} />
                ))}
              </div>

              {SECTIONS.contactForm ? (
                <>
                  <div className="mx-6 my-6 flex items-center gap-3" aria-hidden>
                    <span className="h-px flex-1 bg-white/12" />
                    <span className="text-xs font-medium uppercase tracking-wide text-white/45">lub</span>
                    <span className="h-px flex-1 bg-white/12" />
                  </div>

                  <Reveal delay={80}>
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5 backdrop-blur-[10px]">
                      <p className="text-center text-base font-semibold text-white">{SECTION_TITLES.formHeadline}</p>
                      <p className="mt-1 text-center text-xs text-white/60">{SECTION_TITLES.formSubline}</p>
                      <div className="mt-3.5 [&_form]:text-left">
                        <LeadForm idPrefix="contact-mobile" collapseExtras />
                      </div>
                    </div>
                  </Reveal>
                </>
              ) : null}
            </div>

            <div className="panel-glass mx-auto hidden max-w-[60rem] rounded-2xl p-5 md:block md:p-8 lg:p-10">
              <Reveal className="text-center">
                <p className="section-eyebrow">{SECTION_TITLES.contactEyebrow}</p>
                <h2 className="mt-1.5 text-4xl font-bold tracking-tight text-white lg:text-[2.75rem]">
                  {SECTION_TITLES.contactTitle}
                </h2>
                <p className="mt-1.5 text-base leading-relaxed text-white/75 lg:text-lg">
                  {SECTION_TITLES.contactSubtitle}
                </p>
              </Reveal>

              {SECTIONS.contactForm ? (
                <div className="mx-auto mt-8 grid w-full md:grid-cols-[minmax(0,30rem)_minmax(0,24rem)] md:items-start md:justify-center md:gap-7 lg:mt-10 lg:gap-8">
                  <Reveal className="w-full text-left">
                    <div className="flex w-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-[10px] md:p-6">
                      <p className="text-sm font-semibold text-white">Nie możesz się skontaktować?</p>
                      <p className="mt-1 text-xs text-white/75">
                        Zostaw numer, oddzwonimy do Ciebie.
                      </p>
                      <div className="mt-4 flex flex-col">
                        <LeadForm idPrefix="contact-desktop" />
                      </div>
                    </div>
                  </Reveal>

                  <div className="flex w-full flex-col gap-3.5">
                    {contactCards.map((c, i) => (
                      <ContactCard key={c.title} c={c} index={i} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mx-auto mt-8 grid w-full max-w-md gap-3.5">
                  {contactCards.map((c, i) => (
                    <ContactCard key={c.title} c={c} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-4 pt-10 pb-24 text-foreground md:pb-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          <p className="font-bold text-foreground">{SITE_NAME} · {FOOTER_TAGLINE}</p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 transition-smooth hover:text-foreground">
              <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
            </a>
            <a
              href={EMAIL_HREF}
              className="inline-flex max-w-full items-center gap-1.5 break-all transition-smooth hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" /> {EMAIL}
            </a>
            {CONTACT_LOCATION ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" /> {CONTACT_LOCATION}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" /> {HOURS}
            </span>
          </p>
          <p className="mt-3 text-xs text-white/45">NIP: {NIP}</p>
          <p className="mt-4 flex flex-col items-center justify-center gap-1 text-xs text-white/45 md:flex-row md:flex-wrap md:gap-x-1 md:gap-y-0">
            <Link
              to="/polityka-prywatnosci"
              className="underline underline-offset-2 transition-smooth hover:text-foreground"
            >
              Polityka Prywatności (RODO)
            </Link>
            <span className="md:before:mr-1 md:before:content-['·']">
              © {new Date().getFullYear()} {SITE_NAME}. Wszelkie prawa zastrzeżone.
            </span>
          </p>
        </div>
      </footer>

      <StickyCallBar />
      </div>
    </div>
  );
}

type SectionGlow = {
  x: string;
  y: string;
  cyan?: boolean;
  strong?: boolean;
  strength?: number;
};

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  glow,
  panel = false,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  glow?: SectionGlow;
  panel?: boolean;
  className?: string;
}) {
  const glowStyle = glow
    ? ({
        "--glow-x": glow.x,
        "--glow-y": glow.y,
        ...(glow.strength != null ? { "--glow-strength": String(glow.strength) } : {}),
      } as CSSProperties)
    : undefined;

  const header = (
    <Reveal className={`text-center ${eyebrow ? "mb-6 md:mb-10" : "mb-8 md:mb-12"}`}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2
        className={cn(
          "text-2xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]",
          panel ? "text-white" : "text-foreground",
          eyebrow && "mt-1.5",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-sm leading-relaxed md:text-base lg:text-lg",
            panel ? "text-white/75" : "text-muted-foreground",
            eyebrow ? "mt-1.5" : "mt-2",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden px-4 pt-10 pb-14 text-foreground md:pt-16 md:pb-20",
        className,
      )}
    >
      {glow && (
        <div
          className={cn(
            "section-glow",
            glow.cyan && "section-glow--cyan",
            glow.strong && "section-glow--strong",
          )}
          style={glowStyle}
          aria-hidden
        />
      )}
      <div className="relative mx-auto max-w-7xl">
        {panel ? (
          <div className="panel-glass rounded-2xl p-5 text-center md:p-8 lg:p-10">
            {header}
            {children}
          </div>
        ) : (
          <>
            {header}
            {children}
          </>
        )}
      </div>
    </section>
  );
}