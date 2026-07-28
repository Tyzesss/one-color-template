import { LOGO_INCLUDES_NAME, LOGO_URL, SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function SiteLogo({ className, imageClassName }: SiteLogoProps) {
  if (LOGO_URL) {
    return (
      <span className={cn("flex items-center gap-3", className)}>
        <img
          src={LOGO_URL}
          alt={LOGO_INCLUDES_NAME ? SITE_NAME : ""}
          className={cn(
            "h-14 w-auto object-contain",
            LOGO_INCLUDES_NAME ? "max-w-[340px]" : "max-w-[220px]",
            imageClassName,
          )}
          width={280}
          height={56}
        />
        {!LOGO_INCLUDES_NAME ? (
          <span className="text-xl font-bold tracking-tight text-foreground">{SITE_NAME}</span>
        ) : (
          <span className="sr-only">{SITE_NAME}</span>
        )}
      </span>
    );
  }

  return (
    <span className={cn("text-xl font-bold tracking-tight text-foreground", className)}>
      {SITE_NAME}
    </span>
  );
}
