import { withPresetDefaults } from "./shared";

const siteCity = "Wrocław i okolice";
const cityLocative = "we Wrocławiu";
const siteName = "PompaTerm";

/** Wzorzec startowy: firma od pomp ciepła. */
export const verticalPompyCieplaPreset = withPresetDefaults({
  id: "vertical-pompy-ciepla",
  label: "Wzorzec: pompy ciepła",
  hvacProfile: "pompy-ciepla",
  siteName,
  companyLegalName: "PompaTerm Sp. z o.o.",
  siteCity,
  cityLocative,
  siteDefaultUrl: "https://przyklad-pompy.pl",
  email: "kontakt@przyklad-pompy.pl",
  phoneDisplay: "71 234 56 78",
  phoneE164: "+48712345678",
  address: "",
  addressStreet: "",
  addressCity: "Wrocław",
  addressPostal: "",
  serviceArea: "Wrocław i okolice, dojazd do klienta",
  mapsQuery: "PompaTerm Wrocław",
  nip: "000-000-00-00",
  regon: "000000000",
  hours: "Pn - Pt: 8:00 - 17:00",
  logoUrl: "/logo.svg",
  heroImage: "/gallery/placeholder-2.svg",
  siteTitle: `Pompy ciepła ${siteCity} | ${siteName}`,
  siteKeywords:
    "pompy ciepła, montaż pompy ciepła, serwis pompy ciepła, pierwsze uruchomienie, naprawa awaryjna",
  siteDescription: `Montaż i serwis pomp ciepła ${cityLocative} i okolicach. Pierwsze uruchomienie, diagnostyka, serwis gwarancyjny. Zadzwoń: 71 234 56 78.`,
  ogImage: "/gallery/placeholder-2.svg",
  googleRating: 4.8,
  googleReviewCount: 12,
  partners: ["Vaillant", "Bosch", "Daikin", "Mitsubishi"],
  gallery: [
    {
      image: "/gallery/placeholder-2.svg",
      alt: "Montaż pompy ciepła powietrze-woda",
      caption: "Montaż pompy ciepła",
    },
    {
      image: "/gallery/placeholder-1.svg",
      alt: "Serwis i diagnostyka pompy ciepła",
      caption: "Serwis pompy ciepła",
    },
  ],
  reviews: [],
  heroHeadline: "Montaż i serwis pomp ciepła",
  heroBullets: [
    "Instalacja, pierwsze uruchomienie i regulacja parametrów pracy.",
    "Serwis gwarancyjny i pogwarancyjny z dojazdem do klienta.",
  ],
  footerTagline: "Pompy ciepła i ogrzewanie",
  servicesSectionSubtitle:
    "Montaż, uruchomienie i serwis pomp ciepła. Dobór mocy pod budynek i zapotrzebowanie na ciepło.",
  gallerySectionSubtitle: "Realizacje montażowe i serwisowe pomp ciepła w okolicy.",
  services: [
    {
      icon: "check-circle",
      title: "Montaż pompy ciepła",
      desc: "Dobór mocy, montaż jednostek, podłączenie i uruchomienie instalacji.",
      image: "/gallery/services/montaz-pompy-ciepla.webp",
      imageAlt: "Montaż pompy ciepła",
    },
    {
      icon: "zap",
      title: "Pierwsze uruchomienie",
      desc: "Regulacja parametrów, szkolenie użytkownika i przekazanie dokumentacji.",
      image: "/gallery/services/uruchomienie-pompy.webp",
      imageAlt: "Uruchomienie pompy ciepła",
    },
    {
      icon: "wrench",
      title: "Serwis pomp ciepła",
      desc: "Diagnostyka, konserwacja i naprawy gwarancyjne oraz pogwarancyjne.",
      image: "/gallery/services/serwis-pomp-ciepla.webp",
      imageAlt: "Serwis pompy ciepła",
    },
    {
      icon: "shield-check",
      title: "Przeglądy okresowe",
      desc: "Kontrola ciśnienia, filtrów i parametrów pracy przed sezonem grzewczym.",
      image: "/gallery/services/przeglady-pomp-ciepla.webp",
      imageAlt: "Przegląd pompy ciepła",
    },
    {
      icon: "alert-triangle",
      title: "Awaria pompy ciepła",
      desc: "Szybka diagnostyka i naprawa. Termin ustalamy telefonicznie.",
      image: "/gallery/services/naprawa-awaryjna.webp",
      imageAlt: "Awaria pompy ciepła",
    },
  ],
  faqs: [
    {
      q: "Czy montujecie pompy ciepła powietrze-woda?",
      a: `Tak. Montujemy i uruchamiamy pompy ciepła ${cityLocative} i okolicach.`,
    },
    {
      q: "Czy robicie pierwsze uruchomienie po montażu?",
      a: "Tak. Regulujemy parametry, sprawdzamy instalację i przekazujemy dokumentację.",
    },
    {
      q: "Czy serwisujecie pompy różnych marek?",
      a: "Tak. Oferujemy serwis gwarancyjny i pogwarancyjny. Zakres ustalamy po modelu urządzenia.",
    },
    {
      q: "Co zrobić przy awarii zimą?",
      a: "Zadzwoń. W pilnych przypadkach reagujemy jak najszybciej i ustalamy termin dojazdu.",
    },
    {
      q: "Czy dojeżdżacie do klienta?",
      a: `Tak. Obsługujemy ${siteCity.toLowerCase()}. Przyjeżdżamy na montaż i serwis.`,
    },
  ],
  serviceOptionGroups: [
    {
      label: "Pompy ciepła",
      options: [
        "Montaż pompy ciepła",
        "Pierwsze uruchomienie pompy ciepła",
        "Serwis gwarancyjny / pogwarancyjny",
        "Awaria pompy ciepła",
      ],
    },
    {
      label: "Inne",
      options: ["Potrzebuję doradztwa", "Wycena montażu"],
    },
  ],
});
