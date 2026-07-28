import { withPresetDefaults } from "./shared";

const siteCity = "Twoje miasto i okolice";
const cityLocative = "w Twoim mieście";
const siteName = "TermoSerwis";

/** Wzorzec startowy: mix HVAC (pełna oferta grzewczo-klimatyzacyjna). */
export const verticalMixHvacPreset = withPresetDefaults({
  id: "vertical-mix-hvac",
  label: "Wzorzec: mix HVAC",
  hvacProfile: "mix-hvac",
  siteName,
  companyLegalName: "TermoSerwis Jan Kowalski",
  siteCity,
  cityLocative,
  siteDefaultUrl: "https://przyklad-hvac.pl",
  email: "kontakt@przyklad-hvac.pl",
  phoneDisplay: "500 000 000",
  phoneE164: "+48500000000",
  address: "",
  addressStreet: "",
  addressCity: "Twoje miasto",
  addressPostal: "",
  serviceArea: "Twoje miasto i okolice, dojazd do klienta",
  mapsQuery: "TermoSerwis",
  nip: "000-000-00-00",
  regon: "000000000",
  hours: "Pn - Pt: 8:00 - 17:00",
  logoUrl: "/logo.svg",
  heroImage: "/gallery/placeholder-1.svg",
  siteTitle: `Klimatyzacja i ogrzewanie ${siteCity} | ${siteName}`,
  siteKeywords:
    "klimatyzacja, pompy ciepła, wentylacja, serwis kotłów, montaż klimatyzacji, serwis klimatyzacji, rekuperacja",
  siteDescription: `Montaż i serwis klimatyzacji, pomp ciepła, wentylacji oraz urządzeń grzewczych ${cityLocative} i okolicach. Zadzwoń: 500 000 000.`,
  ogImage: "/gallery/placeholder-1.svg",
  googleRating: 4.9,
  googleReviewCount: 24,
  partners: ["Daikin", "Mitsubishi", "Gree", "Bosch", "Vaillant", "Samsung"],
  gallery: [
    {
      image: "/gallery/placeholder-1.svg",
      alt: "Montaż klimatyzacji split, realizacja instalacyjna",
      caption: "Montaż klimatyzacji",
    },
    {
      image: "/gallery/placeholder-2.svg",
      alt: "Serwis pompy ciepła, diagnostyka i konserwacja",
      caption: "Serwis pompy ciepła",
    },
    {
      image: "/gallery/placeholder-3.svg",
      alt: "Instalacja rekuperacji, wentylacja mechaniczna",
      caption: "Rekuperacja",
    },
    {
      image: "/gallery/placeholder-4.svg",
      alt: "Przegląd i serwis kotła gazowego, konserwacja",
      caption: "Serwis ogrzewania",
    },
    {
      image: "/gallery/placeholder-5.svg",
      alt: "Montaż klimatyzacji w budynku komercyjnym",
      caption: "Klimatyzacja komercyjna",
    },
  ],
  reviews: [],
  heroHeadline: "Montaż i serwis klimatyzacji",
  heroBullets: [
    "Klimatyzacja, pompy ciepła, wentylacja i ogrzewanie. Od montażu po serwis.",
    "Obsługa gwarancyjna i pogwarancyjna z dojazdem do klienta.",
  ],
  footerTagline: "Klimatyzacja, pompy ciepła i ogrzewanie",
  servicesSectionSubtitle:
    "Montaż, serwis i przeglądy klimatyzacji, pomp ciepła, wentylacji oraz urządzeń grzewczych.",
  gallerySectionSubtitle: "Wybrane realizacje montażowe i serwisowe w okolicy.",
  services: [
    {
      icon: "check-circle",
      title: "Montaż klimatyzacji",
      desc: "Dobór mocy, montaż split i multi-split. Uruchomienie i przekazanie dokumentacji.",
      image: "/gallery/services/montaz-klimatyzacji.webp",
      imageAlt: "Montaż klimatyzacji",
    },
    {
      icon: "wrench",
      title: "Serwis klimatyzacji",
      desc: "Czyszczenie, odgrzybianie, uzupełnianie czynnika i naprawa usterek.",
      image: "/gallery/services/serwis-klimatyzacji.webp",
      imageAlt: "Serwis klimatyzacji",
    },
    {
      icon: "zap",
      title: "Montaż i serwis pomp ciepła",
      desc: "Instalacja, pierwsze uruchomienie, diagnostyka i naprawy gwarancyjne oraz pogwarancyjne.",
      image: "/gallery/services/pompy-ciepla.webp",
      imageAlt: "Montaż pompy ciepła",
    },
    {
      icon: "shield-check",
      title: "Wentylacja i rekuperacja",
      desc: "Montaż i serwis instalacji wentylacyjnych. Regulacja i konserwacja rekuperatorów.",
      image: "/gallery/services/rekuperacja.webp",
      imageAlt: "Montaż rekuperacji",
    },
    {
      icon: "flame",
      title: "Serwis kotłów i ogrzewania",
      desc: "Przeglądy, naprawy i pierwsze uruchomienia kotłów gazowych i urządzeń grzewczych.",
      image: "/gallery/services/kotly-ogrzewanie.webp",
      imageAlt: "Serwis kotła",
    },
    {
      icon: "alert-triangle",
      title: "Naprawa awaryjna",
      desc: "Szybka reakcja przy awarii klimatyzacji, pompy lub ogrzewania.",
      image: "/gallery/services/naprawa-awaryjna.webp",
      imageAlt: "Naprawa awaryjna klimatyzacji lub ogrzewania",
    },
  ],
  faqs: [
    {
      q: "Czy montujecie i serwisujecie klimatyzację?",
      a: `Tak. Montaż, serwis i przeglądy klimatyzacji na terenie ${siteCity.toLowerCase()}.`,
    },
    {
      q: "Ile kosztuje montaż klimatyzacji?",
      a: "Koszt zależy od mocy urządzenia i zakresu prac. Wycenę przedstawimy po oględzinach lub rozmowie.",
    },
    {
      q: "Czy serwisujecie pompy ciepła i kotły?",
      a: `Tak. Obsługujemy pompy ciepła, wentylację oraz urządzenia grzewcze ${cityLocative} i okolicach.`,
    },
    {
      q: "Jak szybko możecie pomóc przy awarii?",
      a: "W pilnych przypadkach reagujemy jak najszybciej. Zadzwoń, a potwierdzimy możliwy termin dojazdu.",
    },
    {
      q: "Czy dojeżdżacie do klienta?",
      a: `Tak. Obsługujemy ${siteCity.toLowerCase()}. Przyjeżdżamy na miejsce.`,
    },
  ],
  serviceOptionGroups: [
    {
      label: "Klimatyzacja",
      options: [
        "Montaż klimatyzacji split",
        "Serwis i przegląd klimatyzacji",
        "Naprawa awaryjna klimatyzacji",
      ],
    },
    {
      label: "Pompy ciepła",
      options: [
        "Montaż pompy ciepła",
        "Pierwsze uruchomienie pompy ciepła",
        "Serwis gwarancyjny / pogwarancyjny",
      ],
    },
    {
      label: "Wentylacja i ogrzewanie",
      options: [
        "Montaż rekuperacji",
        "Serwis kotła gazowego",
        "Przegląd i konserwacja ogrzewania",
      ],
    },
    {
      label: "Inne",
      options: ["Potrzebuję doradztwa", "Naprawa awaryjna"],
    },
  ],
});
