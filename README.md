# Szablon-matka — landing page HVAC

Responsywny one-page dla firm z branży **grzewczo-klimatyzacyjnej**. Domyślny preset to demo **KLIMATPRO** — gotowa wizytówka z logo, zdjęciami i copy (miasto jako placeholder).

**Matka = szata graficzna + UX + silnik konfiguracji.** Przy personalizacji **H1, bullety hero i usługi muszą odzwierciedlać priorytety firmy** — patrz [PROMPT-PERSONALIZACJA.md](./PROMPT-PERSONALIZACJA.md).

## Szybki start

```bash
npm install
cp .env.example .env
npm run dev
```

Strona: `http://localhost:5173`

## Nowy klient HVAC (~15–30 min)

### 1. Utwórz preset

```bash
npm run new-preset firma-krakow
```

Edytuj `src/lib/presets/firma-krakow.ts` — dane firmy, usługi, FAQ, galerię, opinie.

Alternatywnie skopiuj **wzorzec profilu** jako punkt startowy:

- `vertical-klimatyzacja` — firma od klimy
- `vertical-pompy-ciepla` — pompy ciepła
- `vertical-kotly` — kotły i ogrzewanie
- `vertical-mix-hvac` — pełny mix HVAC

Ustaw w `.env`: `VITE_SITE_PRESET=firma-krakow`

### 2. Zmienne środowiskowe (`.env`)

| Zmienna                     | Opis                                        |
| --------------------------- | ------------------------------------------- |
| `VITE_SITE_URL`             | Domena produkcyjna (canonical, OG, sitemap) |
| `VITE_SITE_PRESET`          | Id presetu klienta, np. `firma-krakow`      |
| `VITE_WEB3FORMS_ACCESS_KEY` | Klucz Web3Forms (formularz kontaktowy)      |

`VITE_CITY_PRESET` nadal działa (deprecated).

### 3. Assety

| Plik                           | Opis               |
| ------------------------------ | ------------------ |
| `public/logo.svg` (lub `.png`) | Logo firmy         |
| `public/gallery/*`             | Realizacje klienta |
| `public/favicon.svg`           | Ikona strony       |

Po wgraniu JPG: `node scripts/optimize-gallery.mjs`

### 4. Checklist przed oddaniem klientowi

- [ ] Ustaw `VITE_SITE_URL` i `VITE_SITE_PRESET` w `.env` / Vercel
- [ ] Uzupełnij NIP, REGON, telefon, e-mail, obszar działania w presecie
- [ ] Podmień logo, hero, galerię (`heroImage`, `ogImage`, `gallery[]`)
- [ ] Dostosuj usługi, FAQ, partnerów, opinie w presecie
- [ ] Ustaw link Google Maps (`mapsUrl`, `googleReviewsUrl`)
- [ ] Uruchom `npm run generate:seo` (lub `npm run build`)
- [ ] Sprawdź formularz i toast po wysłaniu
- [ ] Sprawdź mobile: sticky bar (telefon + WhatsApp)

### 5. Kolory marki

W presecie (opcjonalnie):

```ts
brandColors: {
  brandTeal: "oklch(...)",
  brandCyan: "oklch(...)",
  cta: "oklch(...)",
  ctaHover: "oklch(...)",
},
```

Lub edytuj `src/styles.css`: `--brand-teal`, `--brand-cyan`, `--cta`, `--cta-hover`.

---

## Co jest w presecie

Jeden plik (`src/lib/presets/*.ts`) zawiera **wszystkie dane i konfigurację klienta**:

- Tożsamość firmy, SEO, hero, usługi, FAQ, formularz
- Galeria, opinie, partnerzy, godziny, Maps
- Profil HVAC (`hvacProfile`), schema.org (`schemaType`)
- Sekcje włącz/wyłącz (`sections`), nagłówki (`sectionTitles`)
- Kroki „Jak to działa”, WhatsApp, opcjonalne kolory marki

Komponenty czytają dane przez `src/lib/site.ts` — **nie edytuj ich** przy personalizacji.

---

## Presety-wzorce (profile HVAC)

| Id presetu              | Profil                                                        |
| ----------------------- | ------------------------------------------------------------- |
| `default`               | Demo KLIMATPRO (matka z logo i zdjęciami, uniwersalne miasto) |
| `vertical-klimatyzacja` | Klimatyzacja                                                  |
| `vertical-pompy-ciepla` | Pompy ciepła                                                  |
| `vertical-kotly`        | Kotły i ogrzewanie                                            |
| `vertical-mix-hvac`     | Mix HVAC                                                      |

Podgląd wzorca: ustaw `VITE_SITE_PRESET=vertical-klimatyzacja` w `.env`.

---

## SEO (wbudowane)

- Meta title, description, keywords, canonical, Open Graph
- JSON-LD (`HVACBusiness` domyślnie, konfigurowalne w presecie)
- `robots.txt` + `sitemap.xml` — `npm run generate:seo`
- Polityka RODO z NIP, REGON, cookies

---

## Komendy

```bash
npm run dev             # development
npm run new-preset      # nowy preset klienta
npm run generate:seo    # robots.txt + sitemap.xml
npm run build           # produkcja
npm run preview         # podgląd buildu
npm run lint            # ESLint
```

## Struktura projektu

```
src/lib/site.ts              ← eksport aktywnego presetu
src/lib/presets/             ← dane per klient (TU PERSONALIZUJESZ)
  default.ts                 ← placeholder matki
  vertical-*.ts              ← wzorce profili HVAC
  shared.ts                  ← domyślne sekcje, kroki, helper
src/lib/schema.ts            ← JSON-LD
src/routes/index.tsx         ← layout (bez danych klienta)
scripts/new-preset.mjs       ← generator presetu
```

## Deploy (Vercel)

- Build Command: `npm run build`
- Output Directory: _(puste — Nitro generuje `.vercel/output`)_
- Env: `VITE_SITE_URL`, `VITE_SITE_PRESET`, `VITE_WEB3FORMS_ACCESS_KEY`

---

Szczegółowy przewodnik: [TEMPLATE.md](./TEMPLATE.md) · Architektura: [ARCHITECTURE.md](./ARCHITECTURE.md) · Prompt pod leada: [PROMPT-PERSONALIZACJA.md](./PROMPT-PERSONALIZACJA.md)
