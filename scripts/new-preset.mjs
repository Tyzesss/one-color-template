#!/usr/bin/env node
/**
 * Tworzy nowy preset klienta HVAC na bazie default.ts.
 * Użycie: npm run new-preset firma-krakow
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const presetsDir = join(root, "src", "lib", "presets");

const id = process.argv[2];

if (!id) {
  console.error("Podaj id presetu (kebab-case), np.: npm run new-preset firma-krakow");
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
  console.error("Id musi być w formacie kebab-case, np. firma-krakow");
  process.exit(1);
}

if (id === "default" || id.startsWith("vertical-")) {
  console.error("Użyj własnego id klienta, nie default ani vertical-*");
  process.exit(1);
}

const targetFile = join(presetsDir, `${id}.ts`);
if (existsSync(targetFile)) {
  console.error(`Plik już istnieje: src/lib/presets/${id}.ts`);
  process.exit(1);
}

const exportName = id
  .split("-")
  .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
  .join("") + "Preset";

const defaultSrc = readFileSync(join(presetsDir, "default.ts"), "utf8");
const clientSrc = defaultSrc
  .replace(/export const defaultPreset/g, `export const ${exportName}`)
  .replace(/id: "default"/, `id: "${id}"`)
  .replace(/label: "Szablon domyślny \(placeholder\)"/, `label: "${id}"`);

writeFileSync(targetFile, clientSrc, "utf8");

const indexPath = join(presetsDir, "index.ts");
let indexSrc = readFileSync(indexPath, "utf8");

if (indexSrc.includes(`"${id}"`)) {
  console.error(`Preset "${id}" jest już zarejestrowany w index.ts`);
  process.exit(1);
}

const importLine = `import { ${exportName} } from "./${id}";\n`;
if (!indexSrc.includes(importLine.trim())) {
  indexSrc = importLine + indexSrc;
}

indexSrc = indexSrc.replace(
  /export type PresetId =\n([\s\S]*?);/,
  (match, body) => {
    const ids = body
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("|"))
      .map((line) => line.replace(/^\|\s*"/, "").replace(/"\s*$/, ""));

    if (ids.includes(id)) return match;
    ids.push(id);
    const formatted = ids.map((item) => `  | "${item}"`).join("\n");
    return `export type PresetId =\n${formatted};`;
  },
);

indexSrc = indexSrc.replace(
  /export const PRESETS: Record<PresetId, SitePreset> = \{([\s\S]*?)\};/,
  (match, body) => {
    if (body.includes(`"${id}"`)) return match;
    const trimmed = body.trimEnd();
    const entry = `  "${id}": ${exportName},`;
    return `export const PRESETS: Record<PresetId, SitePreset> = {\n${trimmed}\n${entry}\n};`;
  },
);

writeFileSync(indexPath, indexSrc, "utf8");

console.log(`
✓ Utworzono preset: src/lib/presets/${id}.ts
✓ Zarejestrowano w: src/lib/presets/index.ts

Następne kroki:
  1. Edytuj src/lib/presets/${id}.ts (dane firmy, H1, usługi, FAQ, opinie)
  2. Ustaw w .env: VITE_SITE_PRESET=${id}
  3. Wgraj logo, favicon i zdjęcia do public/
  4. Dostosuj kolory w styles.css lub brandColors w presecie
  5. npm run build
`);
