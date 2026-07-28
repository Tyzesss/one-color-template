# Architektura szablonu-matki HVAC

## Przepływ danych

```
.env (VITE_SITE_PRESET, VITE_SITE_URL)
        ↓
src/lib/presets/[klient].ts   ← JEDYNY plik do edycji treści i konfiguracji
        ↓
src/lib/presets/index.ts      ← rejestr presetów, wybór aktywnego
        ↓
src/lib/site.ts               ← eksport stałych (nie edytuj przy personalizacji)
        ↓
komponenty + strony           ← layout (nie edytuj przy personalizacji)
```

## Warstwy

| Warstwa | Odpowiedzialność |
|---------|------------------|
| **Preset** | Wszystkie dane klienta, copy, SEO, sekcje, kolory |
| **site.ts** | Mapowanie presetu na stałe eksportowane do komponentów |
| **Komponenty** | Render UI, zero hardcodów danych klienta |
| **styles.css** | Domyślna paleta matki; nadpisywana przez `brandColors` w presecie |

## Pola konfiguracyjne presetu

### Profil branżowy

- `hvacProfile` — `klimatyzacja` \| `pompy-ciepla` \| `kotly-ogrzewanie` \| `wentylacja` \| `mix-hvac` \| `serwis-awaryjny`
- `schemaType` — domyślnie `HVACBusiness`

### Sekcje (`sections`)

| Flaga | Sekcja |
|-------|--------|
| `partners` | Marki partnerów pod usługami |
| `gallery` | Realizacje |
| `reviews` | Opinie Google |
| `howItWorks` | Jak to działa |
| `faq` | Najczęstsze pytania |
| `contactForm` | Formularz w hero i kontakcie |

### Nagłówki (`sectionTitles`)

Tytuły sekcji, podtytuły, teksty formularza — wszystko konfigurowalne z presetu.

### Inne

- `howItWorksSteps` — 3 kroki procesu (ikony: `phone`, `calendar`, `clipboard-check`)
- `whatsappPrefillMessage` — tekst domyślny WhatsApp
- `brandColors` — opcjonalne nadpisanie CSS variables

## Co edytować przy personalizacji

| Plik | Kiedy |
|------|-------|
| `src/lib/presets/[klient].ts` | Zawsze |
| `src/styles.css` | Kolory marki (gdy brak `brandColors`) |
| `public/*` | Logo, favicon, galeria |
| `.env` | `VITE_SITE_PRESET`, `VITE_SITE_URL` |

## Czego NIE edytować

- `src/routes/index.tsx` — layout
- `src/components/*` — komponenty UI
- `src/lib/site.ts` — eksport presetu
- `src/lib/schema.ts` — JSON-LD (czyta z site.ts)

Wyjątek: nowa sekcja lub inny układ strony.

## Nowy klient — 5 kroków

1. `npm run new-preset firma-miasto`
2. Edytuj preset (dane, H1, usługi, FAQ, opinie Maps)
3. Wgraj assety do `public/`
4. Ustaw `.env`: `VITE_SITE_PRESET=firma-miasto`, `VITE_SITE_URL=...`
5. `npm run build` + przegląd wizualny desktop/mobile

## Presety-wzorce

Zamiast `default.ts` możesz skopiować wzorzec profilu:

- `vertical-klimatyzacja.ts`
- `vertical-pompy-ciepla.ts`
- `vertical-kotly.ts`
- `vertical-mix-hvac.ts`

Każdy ma spójny H1, usługi, FAQ i formularz pod dany profil HVAC.
