import { ExternalLink, Star } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import { GoogleIcon } from "@/components/GoogleIcon";
import { MobileCarousel } from "@/components/MobileCarousel";
import { Reveal } from "@/components/Reveal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useReveal } from "@/hooks/use-reveal";
import type { GoogleReviewDisplay, GoogleReviewsPayload } from "@/lib/google-reviews-shared";
import { GOOGLE_WRITE_REVIEW_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

type GoogleReviewsSectionProps = {
  data: GoogleReviewsPayload;
};

function formatReviewDate(review: GoogleReviewDisplay): string | null {
  if (review.relativeTime) {
    return review.relativeTime;
  }
  if (!review.publishedAt) {
    return null;
  }
  try {
    return format(new Date(review.publishedAt), "LLLL yyyy", { locale: pl });
  } catch {
    return null;
  }
}

function authorInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "G";
  }
  if (parts.length === 1) {
    return parts[0]!.slice(0, 1).toUpperCase();
  }
  return `${parts[0]!.slice(0, 1)}${parts[1]!.slice(0, 1)}`.toUpperCase();
}

function GoogleReviewCard({
  review,
  profileUrl,
  index = 0,
}: {
  review: GoogleReviewDisplay;
  profileUrl: string;
  index?: number;
}) {
  const verifyUrl = review.authorProfileUrl ?? profileUrl;
  const dateLabel = formatReviewDate(review);
  const isNamedUser = review.authorName !== "Użytkownik Google Maps";
  const { ref, className: revealClass } = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={cn(
        "group flex h-full flex-col rounded-[1.5rem] border border-transparent bg-white p-5 text-left shadow-card transition-all duration-500 md:p-6",
        "md:hover:-translate-y-1 md:hover:border-[#e8eef5] md:hover:shadow-md",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 ring-1 ring-[#e8eef5] transition-all duration-500 md:h-11 md:w-11 md:group-hover:scale-110 md:group-hover:ring-primary/25">
          {review.authorPhotoUrl ? <AvatarImage src={review.authorPhotoUrl} alt="" /> : null}
          <AvatarFallback className="bg-muted text-sm font-semibold text-foreground transition-colors duration-500 md:group-hover:bg-primary md:group-hover:text-white">
            {isNamedUser ? authorInitials(review.authorName) : <GoogleIcon className="h-5 w-5" />}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-semibold text-foreground transition-colors duration-500 md:group-hover:text-primary">
            {review.authorName}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <div className="flex" aria-hidden>
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            {dateLabel ? (
              <span className="text-[0.6875rem] text-muted-foreground">{dateLabel}</span>
            ) : null}
            <span className="hidden items-center gap-1 text-[0.6875rem] text-muted-foreground md:inline-flex">
              <GoogleIcon className="h-3 w-3" />
              Google Maps
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-foreground/85 transition-colors duration-500 md:mt-4 md:group-hover:text-foreground">
        &ldquo;{review.text}&rdquo;
      </p>

      <a
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 hidden items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-500 hover:text-primary md:inline-flex md:group-hover:text-primary"
      >
        Zobacz na Google Maps
        <ExternalLink className="h-3.5 w-3.5 transition-transform duration-500 md:group-hover:translate-x-0.5" />
      </a>
    </article>
  );
}

export function GoogleReviewsSection({ data }: GoogleReviewsSectionProps) {
  const { rating, reviewCount, profileUrl, reviews } = data;
  return (
    <>
      {/* Mobile: compact rating line */}
      <Reveal className="mb-5 flex justify-center md:hidden">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-foreground transition-smooth hover:text-primary"
        >
          <span className="flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </span>
          <span className="font-bold">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground">· {reviewCount} opinii</span>
        </a>
      </Reveal>

      {/* Desktop: rating card */}
      <Reveal className="mb-10 hidden justify-center md:flex">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-2xl border border-[#e8eef5] bg-white px-5 py-3 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-2xl font-bold leading-none text-foreground">
            {rating.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            / 5 · {reviewCount} opinii
          </span>
        </a>
      </Reveal>

      <MobileCarousel
        items={reviews}
        renderItem={(review, idx) => (
          <GoogleReviewCard key={review.id} review={review} profileUrl={profileUrl} index={idx} />
        )}
      />
      <div className="hidden gap-5 md:grid md:grid-cols-3">
        {reviews.map((review, i) => (
          <GoogleReviewCard key={review.id} review={review} profileUrl={profileUrl} index={i} />
        ))}
      </div>

      <Reveal delay={150} className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-10">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta px-5 py-2.5 text-sm md:px-6 md:py-3"
        >
          <GoogleIcon className="h-4 w-4" />
          <span className="md:hidden">Wszystkie opinie ({reviewCount})</span>
          <span className="hidden md:inline">Zobacz wszystkie opinie ({reviewCount})</span>
        </a>
        {GOOGLE_WRITE_REVIEW_URL ? (
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary hidden px-6 py-3 text-sm md:!inline-flex"
          >
            <Star className="h-4 w-4" />
            Dodaj opinię w Google
          </a>
        ) : null}
      </Reveal>
    </>
  );
}
