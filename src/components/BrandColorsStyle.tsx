import { BRAND_COLORS } from "@/lib/site";

function brandColorCss(): string | null {
  if (!BRAND_COLORS) return null;

  const vars: string[] = [];
  if (BRAND_COLORS.brandTeal) vars.push(`--brand-teal: ${BRAND_COLORS.brandTeal}`);
  if (BRAND_COLORS.brandCyan) vars.push(`--brand-cyan: ${BRAND_COLORS.brandCyan}`);
  if (BRAND_COLORS.cta) vars.push(`--cta: ${BRAND_COLORS.cta}`);
  if (BRAND_COLORS.ctaHover) vars.push(`--cta-hover: ${BRAND_COLORS.ctaHover}`);

  return vars.length > 0 ? `:root { ${vars.join("; ")}; }` : null;
}

export function BrandColorsStyle() {
  const css = brandColorCss();
  if (!css) return null;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
