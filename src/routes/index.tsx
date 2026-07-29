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
  HERO_HEADLINE,
  HERO_HEADLINE_MOBILE_LINES,
  HERO_BADGE,
  HERO_BULLETS,
  HERO_DESCRIPTION,
  HERO_TRUST_BADGES,
  HERO_IMAGE,
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


function HeroReviewStamp({
  rating,
  reviewCount,
  profileUrl,
  className,
}: {
  rating: number;
  reviewCount: number;
  profileUrl: string;
  className?: string;
}) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex max-w-[calc(100vw-2rem)] items-center gap-2 whitespace-nowrap rounded-2xl border border-transparent bg-muted px-3.5 py-2.5 transition-colors duration-300 hover:bg-[#eef2f7] md:gap-2.5 md:px-5 md:py-3",
        className,
      )}
      aria-label={`${rating.toFixed(1)} / 5 · ${reviewCount} opinii Google`}
    >
      <div className="flex shrink-0 items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400 md:h-[1.125rem] md:w-[1.125rem]" />
        ))}
      </div>
      <span className="text-lg font-bold leading-none text-primary md:text-2xl">
        {rating.toFixed(1)}
      </span>
      <span className="text-xs text-muted-foreground md:text-sm">
        {reviewCount} opinii Google
      </span>
    </a>
  );
}

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={PHONE_HREF}
      className={cn(
        "btn-cta px-6 py-3.5 text-sm md:px-12 md:py-5 md:text-xl",
        className,
      )}
    >
      <Phone className="h-6 w-6 shrink-0 md:h-7 md:w-7" />
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
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-primary md:h-9 md:w-9"
              aria-hidden
            >
              <Icon className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" strokeWidth={2.25} />
            </span>
            <span className="text-base leading-snug text-foreground md:text-lg">{badge.label}</span>
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
    "h-11 w-full rounded-xl border border-[#e2e8f0] bg-card px-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/20";

  const labelClass = "text-xs font-medium text-foreground";

  const selectTriggerClass = cn(
    "h-11 w-full rounded-xl border-[#e2e8f0] bg-card text-sm text-foreground shadow-none focus:border-primary focus:ring-2 focus:ring-primary/20 data-[placeholder]:text-muted-foreground",
  );

  const extraFields = (
    <>
      <div className="grid gap-1.5">
        <Label htmlFor={nameId} className={labelClass}>
          Imię <span className="text-muted-foreground">(opcjonalnie)</span>
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
          Rodzaj usługi <span className="text-muted-foreground">(opcjonalnie)</span>
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
            className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-smooth hover:text-primary"
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
          collapseExtras ? "text-[11px] text-muted-foreground" : "text-xs text-muted-foreground",
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
            className="pointer-events-none flex h-4 w-4 items-center justify-center rounded border-2 border-[#94a3b8] bg-white transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:[&_svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40"
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
          <Link to="/polityka-prywatnosci" className="text-primary underline underline-offset-2 hover:text-brand-navy">
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
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-transparent bg-muted text-left transition-all duration-500 md:rounded-[2.5rem]",
        "md:hover:border-[#f1f5f9] md:hover:bg-white md:hover:shadow-md",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-brand-deep">
        {showImage ? (
          <img
            src={s.image}
            alt={s.imageAlt ?? s.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-deep via-brand-navy to-brand-deep px-6"
            aria-hidden
          >
            <Icon className="h-9 w-9 text-brand-cyan/35" />
            <span className="text-center text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/60">
              Zdjęcie usługi
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-foreground/20 to-transparent" />
        <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-white text-primary shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-transparent group-hover:bg-primary group-hover:text-white">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors duration-500 md:text-lg">
          {s.title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-snug text-muted-foreground transition-colors duration-500 group-hover:text-foreground/70 md:text-[0.9375rem] md:leading-relaxed">
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
          <div className="gallery-lightbox__frame overflow-hidden rounded-[1.75rem] border border-[#f1f5f9] bg-muted shadow-card">
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-6 py-3 text-sm font-semibold text-primary shadow-none transition-all duration-300 hover:border-primary/45 hover:bg-primary/15 hover:text-primary active:scale-[0.98]"
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
        className="relative block w-full aspect-[4/3] cursor-zoom-in overflow-hidden rounded-[1.5rem] border border-[#f1f5f9] bg-muted text-left shadow-card transition-all duration-500 md:group-hover:-translate-y-0.5 md:group-hover:shadow-md"
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
  stretch = false,
}: {
  c: (typeof contactCards)[number];
  index?: number;
  stretch?: boolean;
}) {
  const Icon = c.icon;
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  const inner = (
    <div
      ref={ref}
      className={cn(
        "group flex w-full min-w-0 items-center gap-4 px-5 text-left transition-all duration-300 md:px-5",
        stretch ? "h-full min-h-[5.5rem] md:min-h-24" : "h-[5.5rem] md:h-24",
        "rounded-[1.5rem] border border-[#f1f5f9] bg-white shadow-card",
        "hover:border-[#e2e8f0] hover:bg-white hover:shadow-md",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white md:h-12 md:w-12"
        aria-hidden
      >
        <Icon className="h-5 w-5 md:h-[1.35rem] md:w-[1.35rem]" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-muted-foreground md:text-xs">
          {c.title}
        </p>
        <p
          className={cn(
            "mt-1 text-[0.9375rem] font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary md:text-lg",
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
      className={cn("block w-full min-w-0", stretch && "flex-1")}
    >
      {inner}
    </a>
  ) : (
    <div className={cn("w-full min-w-0", stretch && "flex-1")}>{inner}</div>
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
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  const solid = scrolled || menuOpen;

  return (
    <>
      <button
        type="button"
        tabIndex={menuOpen ? 0 : -1}
        aria-label="Zamknij menu"
        onClick={() => setMenuOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/25 transition-opacity duration-300 md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[border-color,border-radius,box-shadow,padding,background-color] duration-500 ease-out",
          solid
            ? "rounded-b-[2rem] border-b border-[#f1f5f9] bg-white py-1.5 shadow-card md:rounded-b-[3rem] md:py-2"
            : "rounded-none border-b border-transparent bg-transparent py-3 md:py-5",
          menuOpen && "bg-white",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-[5.25rem]">
          <a
            href="#top"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              goTo("#top");
            }}
          >
            <SiteLogo imageClassName="h-12 max-w-[240px] md:h-16 md:max-w-[360px]" />
          </a>

          <nav className="hidden items-center gap-7 text-base font-medium md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-smooth hover:text-primary hover:underline hover:underline-offset-4"
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
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-smooth hover:bg-muted md:hidden"
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

        <div
          id="mobile-nav"
          className={cn(
            "grid bg-white transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
            menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
          aria-hidden={!menuOpen}
          inert={!menuOpen ? true : undefined}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[#f1f5f9] px-4 pb-3 pt-2">
              <nav className="flex flex-col gap-0.5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    tabIndex={menuOpen ? undefined : -1}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(link.href);
                    }}
                    className="rounded-xl px-3.5 py-2.5 text-[0.95rem] font-semibold tracking-tight text-foreground transition-colors duration-200 hover:bg-muted hover:text-primary active:bg-muted"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-1.5 border-t border-[#f1f5f9] pt-2.5">
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
          </div>
        </div>
      </header>
    </>
  );
}

function Index() {
  const { googleReviews } = Route.useLoaderData();

  return (
    <div className="page-shell">
      <div className="page-content">
      <SiteHeader />

      <div className="hero-services-unit">
        <section
          id="top"
          className="relative z-10 flex min-h-dvh flex-col scroll-mt-24 bg-white pt-24 text-foreground md:min-h-svh md:pt-40"
        >
        <div
          className={cn(
            "relative mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 px-4 md:grid-cols-[minmax(0,1.12fr)_minmax(0,0.98fr)] md:items-stretch md:gap-9 lg:gap-11",
          )}
        >
          <div
            className="flex flex-col items-center text-center md:col-start-1 md:row-start-1 md:items-start md:text-left"
          >
            {HERO_BADGE ? (
              <p className="hero-enter mb-3 inline-flex items-center gap-2 rounded-full bg-muted px-3.5 py-1.5 text-sm font-semibold text-foreground md:mb-4">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                {HERO_BADGE}
              </p>
            ) : null}
            <h1 className="hero-enter hero-enter-delay-1 relative font-extrabold leading-[1.2] text-foreground max-md:mx-auto md:text-[clamp(2.5rem,2.65vw+1.1rem,3.75rem)] md:leading-[1.22]">
              {HERO_HEADLINE_MOBILE_LINES?.length ? (
                <>
                  <span className="hero-headline-mobile md:hidden">
                    {HERO_HEADLINE_MOBILE_LINES.map((line, i) => {
                      const isAccent = i === HERO_HEADLINE_MOBILE_LINES.length - 1;
                      return (
                        <span
                          key={line}
                          className={cn(
                            "hero-headline-mobile__line",
                            isAccent && "text-gradient-pro",
                          )}
                        >
                          {line}
                        </span>
                      );
                    })}
                  </span>
                  <span className="hidden md:block">
                    {HERO_HEADLINE_MOBILE_LINES.map((line, i) => {
                      const isAccent = i === HERO_HEADLINE_MOBILE_LINES.length - 1;
                      return (
                        <span
                          key={line}
                          className={cn(
                            "block",
                            isAccent ? "text-gradient-pro leading-[1.28]" : "whitespace-nowrap",
                          )}
                        >
                          {line}
                        </span>
                      );
                    })}
                  </span>
                </>
              ) : (
                (() => {
                  const accent = "i klimatyzacyjne";
                  const idx = HERO_HEADLINE.indexOf(accent);
                  if (idx === -1) return HERO_HEADLINE;
                  return (
                    <>
                      {HERO_HEADLINE.slice(0, idx)}
                      <span className="text-gradient-pro">{accent}</span>
                      {HERO_HEADLINE.slice(idx + accent.length)}
                    </>
                  );
                })()
              )}
            </h1>

            <p className="hero-enter hero-enter-delay-2 mt-1.5 text-lg font-medium text-brand-navy md:mt-3.5 md:text-[1.7rem]">
              {SITE_CITY}
            </p>

            {HERO_TRUST_BADGES.length > 0 ? (
              <div className="hero-enter hero-enter-delay-3 mt-5 hidden md:mt-6 md:block">
                <HeroTrustBadges badges={HERO_TRUST_BADGES} />
              </div>
            ) : HERO_DESCRIPTION ? (
              <p className="hero-enter hero-enter-delay-3 mt-5 hidden max-w-lg text-left text-base leading-relaxed text-muted-foreground md:mt-6 md:block lg:text-[1.0625rem] lg:leading-[1.65]">
                {HERO_DESCRIPTION}
              </p>
            ) : (
              <ul className="hero-enter hero-enter-delay-3 mx-auto mt-4 hidden max-w-xl space-y-2.5 text-left text-base leading-snug text-foreground md:mx-0 md:mt-6 md:block md:max-w-none md:space-y-3.5 md:text-[1.25rem] md:leading-relaxed">
                {HERO_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 md:gap-3">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary md:mt-3 md:h-2 md:w-2"
                      aria-hidden
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            <div className="hero-enter hero-enter-delay-4 mt-5 hidden md:mt-8 md:block">
              <CTAButton className="md:px-12 md:py-5 md:text-xl" />
            </div>

            <div className="hero-enter hero-enter-delay-5 mt-5 flex justify-center md:hidden">
              <CTAButton className="px-8 py-4 text-base" />
            </div>
          </div>

          <div className="relative mt-2 w-full max-md:pb-8 md:col-start-2 md:row-start-1 md:mt-0 md:min-h-0 md:pb-0">
            <div className="hero-enter hero-enter-delay-7 relative max-md:aspect-[5/4] md:absolute md:inset-0">
              <div className="h-full overflow-hidden rounded-[1.75rem] shadow-card md:rounded-[2.5rem] lg:rounded-[3rem]">
                <img
                  src={HERO_IMAGE ?? "/hero-klimatyzacja.png"}
                  alt="Pompa ciepła — montaż zewnętrzny i zasobnik ciepła"
                  className="h-full w-full object-cover object-center"
                  width={900}
                  height={900}
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <HeroReviewStamp
                rating={googleReviews.rating}
                reviewCount={googleReviews.reviewCount}
                profileUrl={googleReviews.profileUrl || GOOGLE_REVIEWS_URL}
                className="absolute z-10 max-md:bottom-0 max-md:left-1/2 max-md:-translate-x-1/2 max-md:translate-y-1/2 md:-bottom-5 md:-left-5"
              />
            </div>
          </div>
        </div>

          <div className="relative z-10 mt-auto flex justify-center pb-8 pt-5 md:pb-7 md:pt-6">
            <a
              href="#uslugi"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#uslugi");
              }}
              className="hero-scroll-cue flex flex-col items-center gap-1.5 text-primary transition-smooth hover:text-primary/80"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] md:text-sm">
                Przewiń
              </span>
              <ChevronDown className="hero-scroll-cue__icon h-6 w-6 md:h-7 md:w-7" strokeWidth={2} aria-hidden />
            </a>
          </div>
        </section>

        <Section
          id="uslugi"
          tone="white"
          className="max-md:pb-6"
          eyebrow={SECTION_TITLES.servicesEyebrow}
          title={SECTION_TITLES.servicesTitle}
          subtitle={SERVICES_SECTION_SUBTITLE}
        >
          <MobileCarousel items={services} renderItem={(s) => <ServiceCard s={s} index={services.indexOf(s)} />} />
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
          tone="white"
          eyebrow={SECTION_TITLES.galleryEyebrow}
          title={SECTION_TITLES.galleryTitle}
          subtitle={GALLERY_SECTION_SUBTITLE}
        >
          <GallerySection />
        </Section>
      ) : null}

      {SECTIONS.reviews ? (
        <Section
          id="opinie"
          tone="muted"
          eyebrow={SECTION_TITLES.reviewsEyebrow}
          title={SECTION_TITLES.reviewsTitle}
          subtitle={SECTION_TITLES.reviewsSubtitle}
        >
          <GoogleReviewsSection data={googleReviews} />
        </Section>
      ) : null}

      {SECTIONS.faq ? (
        <Section
          id="faq"
          tone="white"
          eyebrow={SECTION_TITLES.faqEyebrow}
          title={SECTION_TITLES.faqTitle}
          subtitle={SECTION_TITLES.faqSubtitle}
        >
        <Reveal>
          <Accordion
            type="single"
            collapsible
            className="mx-auto flex w-full max-w-3xl flex-col gap-3 text-left md:max-w-4xl"
          >
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-[1.5rem] border border-transparent border-b-0 bg-muted transition-all duration-300 hover:border-[#f1f5f9] hover:bg-white hover:shadow-md data-[state=open]:border-[#f1f5f9] data-[state=open]:bg-white data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="group gap-4 px-5 py-5 text-left text-base font-bold tracking-tight text-foreground hover:no-underline hover:text-primary data-[state=open]:text-primary [&>svg]:hidden [&[data-state=open]>div]:rotate-180 [&[data-state=open]>div]:bg-primary [&[data-state=open]>div]:text-white">
                  <span className="flex-1">{f.q}</span>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-muted-foreground shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-t border-white/80 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>
      ) : null}

      {/* KONTAKT + WYCENA */}
      <section
        id="kontakt"
        className="relative scroll-mt-24 overflow-hidden rounded-[2rem] bg-muted px-4 pt-10 pb-14 text-foreground md:rounded-[3rem] md:pt-16 md:pb-20"
      >
        <div className="relative mx-auto max-w-7xl">
          <div id="wycena" className="scroll-mt-24">
            <Reveal className="text-center md:hidden">
              <p className="section-eyebrow">{SECTION_TITLES.contactEyebrow}</p>
              <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">
                {SECTION_TITLES.contactTitle}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {SECTION_TITLES.contactSubtitle}
              </p>
            </Reveal>

            <div className="mt-6 flex flex-col gap-3 md:hidden">
              {contactCards.map((c, i) => (
                <ContactCard key={c.title} c={c} index={i} />
              ))}
            </div>

            {SECTIONS.contactForm ? (
              <>
                <div className="mx-6 my-6 flex items-center gap-3 md:hidden" aria-hidden>
                  <span className="h-px flex-1 bg-[#cbd5e1]" />
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">lub</span>
                  <span className="h-px flex-1 bg-[#cbd5e1]" />
                </div>

                <Reveal delay={80} className="md:hidden">
                  <div className="rounded-[1.5rem] bg-white p-5 shadow-card">
                    <p className="text-center text-base font-semibold text-foreground">{SECTION_TITLES.formHeadline}</p>
                    <p className="mt-1 text-center text-xs text-muted-foreground">{SECTION_TITLES.formSubline}</p>
                    <div className="mt-3.5 [&_form]:text-left">
                      <LeadForm idPrefix="contact-mobile" collapseExtras />
                    </div>
                  </div>
                </Reveal>
              </>
            ) : null}

            <div className="mx-auto hidden max-w-[60rem] md:block">
              <Reveal className="text-center">
                <p className="section-eyebrow">{SECTION_TITLES.contactEyebrow}</p>
                <h2 className="mt-1.5 text-4xl font-bold tracking-tight text-foreground lg:text-[2.75rem]">
                  {SECTION_TITLES.contactTitle}
                </h2>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground lg:text-lg">
                  {SECTION_TITLES.contactSubtitle}
                </p>
              </Reveal>

              {SECTIONS.contactForm ? (
                <div className="mx-auto mt-8 grid w-full md:grid-cols-[minmax(0,30rem)_minmax(0,24rem)] md:items-stretch md:justify-center md:gap-7 lg:mt-10 lg:gap-8">
                  <Reveal className="flex h-full w-full text-left">
                    <div className="flex h-full w-full flex-col rounded-[1.5rem] bg-white p-5 shadow-card md:p-6">
                      <p className="text-sm font-semibold text-foreground">Nie możesz się skontaktować?</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Zostaw numer, oddzwonimy do Ciebie.
                      </p>
                      <div className="mt-4 flex flex-col">
                        <LeadForm idPrefix="contact-desktop" />
                      </div>
                    </div>
                  </Reveal>

                  <div className="flex h-full w-full flex-col gap-3.5">
                    {contactCards.map((c, i) => (
                      <ContactCard key={c.title} c={c} index={i} stretch />
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
      <footer className="relative rounded-t-[2rem] bg-primary px-4 pt-10 pb-24 text-white md:rounded-t-[3rem] md:pb-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-white/80">
          <p className="font-bold text-white">{SITE_NAME} · {FOOTER_TAGLINE}</p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 transition-smooth hover:text-white">
              <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
            </a>
            <a
              href={EMAIL_HREF}
              className="inline-flex max-w-full items-center gap-1.5 break-all transition-smooth hover:text-white"
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
          <p className="mt-3 text-xs text-white/65">NIP: {NIP}</p>
          <p className="mt-4 flex flex-col items-center justify-center gap-1 text-xs text-white/65 md:flex-row md:flex-wrap md:gap-x-1 md:gap-y-0">
            <Link
              to="/polityka-prywatnosci"
              className="underline underline-offset-2 transition-smooth hover:text-white"
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
  tone = "white",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  glow?: SectionGlow;
  panel?: boolean;
  /** Full-bleed section surface — Nordic white / slate-50 alternation */
  tone?: "white" | "muted";
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
          "text-2xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]",
          eyebrow && "mt-1.5",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-sm leading-relaxed text-muted-foreground md:text-base lg:text-lg",
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
        tone === "muted"
          ? "rounded-[2rem] bg-muted md:rounded-[3rem]"
          : "bg-white",
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
          <div className="panel-glass rounded-[2rem] p-5 text-center md:p-8 lg:p-10">
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