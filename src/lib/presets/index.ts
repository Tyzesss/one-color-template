import { defaultPreset } from "./default";
import { verticalKlimatyzacjaPreset } from "./vertical-klimatyzacja";
import { verticalKotlyPreset } from "./vertical-kotly";
import { verticalMixHvacPreset } from "./vertical-mix-hvac";
import { verticalPompyCieplaPreset } from "./vertical-pompy-ciepla";
import type { SitePreset } from "./types";

export type PresetId =
  | "default"
  | "vertical-klimatyzacja"
  | "vertical-pompy-ciepla"
  | "vertical-kotly"
  | "vertical-mix-hvac";

export const PRESETS: Record<PresetId, SitePreset> = {
  default: defaultPreset,
  "vertical-klimatyzacja": verticalKlimatyzacjaPreset,
  "vertical-pompy-ciepla": verticalPompyCieplaPreset,
  "vertical-kotly": verticalKotlyPreset,
  "vertical-mix-hvac": verticalMixHvacPreset,
};

export const PRESET_IDS = Object.keys(PRESETS) as PresetId[];

const DEFAULT_PRESET_ID: PresetId = "default";

function resolvePresetId(raw: string | undefined): PresetId | undefined {
  if (!raw) return undefined;
  if (raw in PRESETS) return raw as PresetId;
  return undefined;
}

export function getActivePreset(): SitePreset {
  const raw =
    (import.meta.env.VITE_SITE_PRESET as string | undefined) ??
    (import.meta.env.VITE_CITY_PRESET as string | undefined);

  const presetId = resolvePresetId(raw);
  if (presetId) return PRESETS[presetId];
  return PRESETS[DEFAULT_PRESET_ID];
}

export type {
  BrandColors,
  FaqItem,
  FormOptionGroup,
  GalleryItem,
  HvacProfile,
  HeroTrustBadge,
  HeroTrustBadgeIcon,
  HowItWorksStep,
  HowItWorksStepIcon,
  ReviewItem,
  SchemaType,
  SectionConfig,
  SectionTitles,
  ServiceIcon,
  ServiceItem,
  SitePreset,
} from "./types";

export { withPresetDefaults, DEFAULT_SECTIONS, DEFAULT_SECTION_TITLES } from "./shared";
