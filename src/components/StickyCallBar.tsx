import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

export function StickyCallBar() {
  const [show, setShow] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 150);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sync = () => setNavOpen(document.body.dataset.mobileNavOpen === "true");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-mobile-nav-open"],
    });
    return () => observer.disconnect();
  }, []);

  const visible = show && !navOpen;

  return (
    <div
      className={cn(
        "relative fixed left-4 right-4 z-50 flex gap-3 rounded-2xl border border-white/10 bg-background/45 p-2.5 shadow-[0_12px_40px_-16px_oklch(0_0_0/0.45)] backdrop-blur-2xl transition-all duration-500 ease-out md:hidden",
        "before:pointer-events-none before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-cyan/30 before:to-transparent",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
      )}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      aria-hidden={!visible}
    >
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? undefined : -1}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition-smooth hover:border-brand-cyan/30 hover:bg-brand-cyan/10 active:scale-[0.98]"
        aria-label="Napisz na WhatsApp"
      >
        <WhatsAppIcon className="h-5 w-5 text-brand-cyan" />
      </a>
      <a
        href={PHONE_HREF}
        tabIndex={visible ? undefined : -1}
        className="btn-cta flex-1 bg-[color-mix(in_oklch,var(--cta)_78%,transparent)] py-3 text-sm shadow-none backdrop-blur-md hover:bg-[color-mix(in_oklch,var(--cta-hover)_88%,transparent)]"
      >
        <Phone className="h-4 w-4" />
        Zadzwoń teraz
      </a>
    </div>
  );
}
