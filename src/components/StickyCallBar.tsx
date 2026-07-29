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
        "relative fixed left-4 right-4 z-50 flex gap-3 rounded-2xl border border-border bg-card p-2.5 shadow-[0_12px_40px_-16px_rgb(15_30_75/0.18)] transition-all duration-500 ease-out md:hidden",
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
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-foreground transition-smooth hover:border-primary/40 hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
        aria-label="Napisz na WhatsApp"
      >
        <WhatsAppIcon className="h-5 w-5 text-primary" />
      </a>
      <a
        href={PHONE_HREF}
        tabIndex={visible ? undefined : -1}
        className="btn-cta flex-1 py-3 text-sm"
      >
        <Phone className="h-4 w-4" />
        Zadzwoń teraz
      </a>
    </div>
  );
}
