import { withPresetDefaults } from "./shared";

const siteCity = "Gdańsk i okolice";
const cityLocative = "w Gdańsku";
const siteName = "KotłSerwis";

/** Wzorzec startowy: firma od kotłów i ogrzewania. */
export const verticalKotlyPreset = withPresetDefaults({
  id: "vertical-kotly",
  label: "Wzorzec: kotły i ogrzewanie",
  hvacProfile: "kotly-ogrzewanie",
  siteName,
  companyLegalName: "KotłSerwis Jan Nowak",
  siteCity,
  cityLocative,
  siteDefaultUrl: "https://przyklad-kotly.pl",
  email: "kontakt@przyklad-kotly.pl",
  phoneDisplay: "58 765 43 21",
  phoneE164: "+48587654321",
  address: "",
  addressStreet: "",
  addressCity: "Gdańsk",
  addressPostal: "",
  serviceArea: "Gdańsk i okolice, dojazd do klienta",
  mapsQuery: "KotłSerwis Gdańsk",
  nip: "000-000-00-00",
  regon: "000000000",
  hours: "Pn - Pt: 8:00 - 17:00",
  logoUrl: "/logo.svg",
  heroImage: "/gallery/placeholder-4.svg",
  siteTitle: `Serwis kotłów ${siteCity} | ${siteName}`,
  siteKeywords:
    "serwis kotłów, naprawa kotła, przegląd kotła gazowego, pierwsze uruchomienie, ogrzewanie",
  siteDescription: `Serwis i naprawa kotłów gazowych ${cityLocative} i okolicach. Przeglądy, pierwsze uruchomienia, awarie. Zadzwoń: 58 765 43 21.`,
  ogImage: "/gallery/placeholder-4.svg",
  googleRating: 4.9,
  googleReviewCount: 31,
  partners: ["Vaillant", "Bosch", "Junkers", "Viessmann"],
  gallery: [
    {
      image: "/gallery/placeholder-4.svg",
      alt: "Serwis kotła gazowego w Gdańsku",
      caption: "Serwis kotła",
    },
    {
      image: "/gallery/placeholder-2.svg",
      alt: "Przegląd instalacji grzewczej",
      caption: "Przegląd ogrzewania",
    },
  ],
  reviews: [],
  heroHeadline: "Serwis i naprawa kotłów",
  heroBullets: [
    "Przeglądy, naprawy i pierwsze uruchomienia kotłów gazowych.",
    "Autoryzowany serwis wybranych marek. Dojazd do klienta.",
  ],
  footerTagline: "Serwis kotłów i ogrzewania",
  servicesSectionSubtitle:
    "Przeglądy, naprawy i konserwacja kotłów oraz instalacji grzewczych. Obsługa gwarancyjna i pogwarancyjna.",
  gallerySectionSubtitle: "Realizacje serwisowe i montażowe ogrzewania w okolicy.",
  services: [
    {
      icon: "wrench",
      title: "Serwis kotłów gazowych",
      desc: "Diagnostyka, naprawa usterek i wymiana zużytych elementów.",
      image: "/gallery/services/serwis-kotlow.webp",
      imageAlt: "Serwis kotła gazowego",
    },
    {
      icon: "shield-check",
      title: "Przeglądy okresowe",
      desc: "Kontrola szczelności, spalania i parametrów pracy urządzenia.",
      image: "/gallery/services/przeglady-kotlow.webp",
      imageAlt: "Przegląd kotła",
    },
    {
      icon: "flame",
      title: "Pierwsze uruchomienie",
      desc: "Uruchomienie nowego kotła, regulacja i przekazanie dokumentacji.",
      image: "/gallery/services/uruchomienie-kotla.webp",
      imageAlt: "Uruchomienie kotła",
    },
    {
      icon: "alert-triangle",
      title: "Naprawa awaryjna",
      desc: "Szybka reakcja przy awarii ogrzewania. Termin potwierdzamy telefonicznie.",
      image: "/gallery/services/naprawa-awaryjna.webp",
      imageAlt: "Naprawa awaryjna ogrzewania",
    },
    {
      icon: "check-circle",
      title: "Modernizacja ogrzewania",
      desc: "Wymiana urządzeń i optymalizacja istniejącej instalacji grzewczej.",
      image: "/gallery/services/modernizacja-ogrzewania.webp",
      imageAlt: "Modernizacja instalacji grzewczej",
    },
  ],
  faqs: [
    {
      q: "Czy robicie przeglądy kotłów gazowych?",
      a: `Tak. Wykonujemy przeglądy i konserwację kotłów ${cityLocative} i okolicach.`,
    },
    {
      q: "Ile kosztuje serwis kotła?",
      a: "Koszt zależy od modelu i zakresu prac. Wycenę podamy po krótkiej rozmowie lub oględzinach.",
    },
    {
      q: "Czy jesteście autoryzowanym serwisem marek?",
      a: "Serwisujemy wybrane marki. Potwierdź telefonicznie, czy obsługujemy Twój model.",
    },
    {
      q: "Co zrobić przy awarii ogrzewania?",
      a: "Zadzwoń. W pilnych przypadkach reagujemy jak najszybciej i ustalamy termin dojazdu.",
    },
    {
      q: "Czy dojeżdżacie do klienta?",
      a: `Tak. Obsługujemy ${siteCity.toLowerCase()}. Przyjeżdżamy na serwis i naprawy.`,
    },
  ],
  serviceOptionGroups: [
    {
      label: "Kotły i ogrzewanie",
      options: [
        "Serwis kotła gazowego",
        "Przegląd i konserwacja ogrzewania",
        "Pierwsze uruchomienie kotła",
        "Naprawa awaryjna ogrzewania",
      ],
    },
    {
      label: "Inne",
      options: ["Potrzebuję doradztwa", "Wycena serwisu"],
    },
  ],
});
