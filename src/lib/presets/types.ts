export type HeroTrustBadgeIcon = "shield-check" | "snowflake" | "map-pin";

export type HeroTrustBadge = {
  label: string;
  icon: HeroTrustBadgeIcon;
};

export type GalleryItem = {
  image: string;
  alt: string;
  caption?: string;
};

export type ReviewItem = {
  name?: string;
  text: string;
  source?: "google";
  rating?: number;
  publishedAt?: string;
  relativeTime?: string;
  postedAt?: string;
};

export type ServiceIcon =
  | "wrench"
  | "shield-check"
  | "zap"
  | "alert-triangle"
  | "check-circle"
  | "flame"
  | "snowflake"
  | "wind";

export type ServiceItem = {
  icon: ServiceIcon;
  title: string;
  desc: string;
  /** Zdjęcie usługi — wrzuć plik do public/gallery/services/ */
  image?: string;
  imageAlt?: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type FormOptionGroup = {
  label: string;
  options: string[];
};

export type HvacProfile =
  | "klimatyzacja"
  | "pompy-ciepla"
  | "kotly-ogrzewanie"
  | "wentylacja"
  | "mix-hvac"
  | "serwis-awaryjny";

export type SchemaType = "HVACBusiness" | "LocalBusiness";

export type HowItWorksStepIcon = "phone" | "calendar" | "clipboard-check";

export type HowItWorksStep = {
  step: number;
  icon: HowItWorksStepIcon;
  title: string;
  desc: string;
  descShort: string;
};

export type SectionConfig = {
  partners: boolean;
  gallery: boolean;
  reviews: boolean;
  howItWorks: boolean;
  faq: boolean;
  contactForm: boolean;
};

export type SectionTitles = {
  servicesEyebrow: string;
  servicesTitle: string;
  reviewsEyebrow: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  galleryEyebrow: string;
  galleryTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  faqSubtitle: string;
  howItWorksEyebrow: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  contactEyebrow: string;
  contactTitle: string;
  contactSubtitle: string;
  formHeadline: string;
  formSubline: string;
};

export type BrandColors = {
  brandTeal?: string;
  brandCyan?: string;
  cta?: string;
  ctaHover?: string;
};

export type SitePreset = {
  id: string;
  label: string;
  hvacProfile: HvacProfile;
  schemaType: SchemaType;
  sections: SectionConfig;
  sectionTitles: SectionTitles;
  howItWorksSteps: HowItWorksStep[];
  whatsappPrefillMessage: string;
  brandColors?: BrandColors;
  siteName: string;
  companyLegalName: string;
  siteCity: string;
  cityLocative: string;
  siteDefaultUrl: string;
  email: string;
  phoneDisplay: string;
  phoneE164: string;
  address: string;
  addressStreet: string;
  addressCity: string;
  addressPostal: string;
  /** Gdy brak siedziby — tekst zamiast adresu, np. „Miasto i okolice, dojazd do klienta”. */
  serviceArea?: string;
  mapsQuery: string;
  mapsUrl?: string;
  nip: string;
  regon: string;
  hours: string;
  logoUrl?: string;
  /** Gdy false (domyślnie) — obok logo wyświetla się widoczny `siteName` (dla logotypów bez napisu). */
  logoIncludesName?: boolean;
  /** Ikona zakładki; domyślnie = logoUrl. Ustaw wycinek/kwadrat logo jako favicon. */
  faviconUrl?: string;
  heroImage?: string;
  siteTitle: string;
  siteKeywords: string;
  siteDescription?: string;
  ogImage: string;
  googleRating: number;
  /** Łączna liczba opinii widoczna na profilu Google Maps — NIE długość tablicy reviews[]. */
  googleReviewCount: number;
  googlePlaceId?: string;
  googleReviewsUrl?: string;
  googleWriteReviewUrl?: string;
  partners?: string[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  heroHeadline: string;
  /** Jawny podział H1 na mobile (desktop używa heroHeadline). */
  heroHeadlineMobileLines?: string[];
  /** Krótki pill nad H1 (np. status / USP). */
  heroBadge?: string;
  heroBullets: string[];
  /** Krótki opis pod miastem — tylko desktop (zamiast bulletów). */
  heroDescription?: string;
  /** Trust badge’e pod miastem — tylko desktop. */
  heroTrustBadges?: HeroTrustBadge[];
  footerTagline: string;
  servicesSectionSubtitle: string;
  gallerySectionSubtitle: string;
  services: ServiceItem[];
  faqs: FaqItem[];
  serviceOptionGroups: FormOptionGroup[];
};
