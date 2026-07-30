import type { HowItWorksStep, SectionConfig, SectionTitles, SitePreset } from "./types";

export const DEFAULT_SECTIONS: SectionConfig = {
  partners: true,
  gallery: true,
  reviews: true,
  howItWorks: true,
  faq: true,
  contactForm: true,
};

export const DEFAULT_SECTION_TITLES: SectionTitles = {
  servicesEyebrow: "Usługi",
  servicesTitle: "Nasze usługi",
  reviewsEyebrow: "Opinie Google",
  reviewsTitle: "Opinie klientów",
  reviewsSubtitle:
    "Sprawdzone recenzje z profilu Google Maps. Możesz je zweryfikować jednym kliknięciem.",
  galleryEyebrow: "Portfolio",
  galleryTitle: "Nasze realizacje",
  faqEyebrow: "FAQ",
  faqTitle: "Najczęstsze pytania",
  faqSubtitle: "Najczęstsze pytania o montaż, serwis i wycenę.",
  howItWorksEyebrow: "Proces",
  howItWorksTitle: "Jak to działa?",
  howItWorksSubtitle: "Od zgłoszenia do gotowej realizacji: montaż, serwis lub przegląd.",
  contactEyebrow: "Kontakt",
  contactTitle: "Skontaktuj się z nami",
  contactSubtitle: "Zadzwoń, napisz lub zostaw numer.",
  formHeadline: "Zostaw nam swój numer",
  formSubline: "Oddzwonimy do Ciebie",
};

export const DEFAULT_HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: 1,
    icon: "phone",
    title: "Zgłoszenie",
    desc: "Zadzwoń, napisz na WhatsApp lub zostaw numer w formularzu. Oddzwonimy z propozycją terminu.",
    descShort: "Telefon, WhatsApp lub formularz. Oddzwonimy z terminem.",
  },
  {
    step: 2,
    icon: "calendar",
    title: "Ustalenie terminu",
    desc: "Doprecyzujemy zakres prac (montaż, serwis, wycena) i ustalimy dogodny termin wizyty.",
    descShort: "Ustalimy zakres prac i termin wizyty.",
  },
  {
    step: 3,
    icon: "clipboard-check",
    title: "Realizacja u klienta",
    desc: "Dojazd na miejsce: montaż, przegląd lub naprawa. Koszt i zakres potwierdzamy przed rozpoczęciem prac.",
    descShort: "Montaż lub serwis na miejscu. Wycena przed startem prac.",
  },
];

export const DEFAULT_WHATSAPP_MESSAGE = "Dzień dobry, chciałbym zgłosić zlecenie serwisowe.";

type PresetInput = Omit<
  SitePreset,
  "sections" | "sectionTitles" | "howItWorksSteps" | "whatsappPrefillMessage" | "schemaType"
> &
  Partial<
    Pick<
      SitePreset,
      "sections" | "sectionTitles" | "howItWorksSteps" | "whatsappPrefillMessage" | "schemaType"
    >
  >;

/** Scala domyślne pola konfiguracyjne matki z danymi presetu klienta. */
export function withPresetDefaults(preset: PresetInput): SitePreset {
  const { sections, sectionTitles, howItWorksSteps, whatsappPrefillMessage, schemaType, ...rest } =
    preset;

  return {
    ...rest,
    schemaType: schemaType ?? "HVACBusiness",
    sections: { ...DEFAULT_SECTIONS, ...sections },
    sectionTitles: { ...DEFAULT_SECTION_TITLES, ...sectionTitles },
    howItWorksSteps: howItWorksSteps ?? DEFAULT_HOW_IT_WORKS_STEPS,
    whatsappPrefillMessage: whatsappPrefillMessage ?? DEFAULT_WHATSAPP_MESSAGE,
  };
}
