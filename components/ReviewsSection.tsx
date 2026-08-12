import Section from "@/components/Section";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { getReviews, GOOGLE_BUSINESS_PROFILE_URL, type Review } from "@/lib/reviews";
import { reviewsSchema } from "@/lib/schema";

/** Five stars; filled ones in the orange accent, the rest a faint grey. */
function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex gap-0.5 text-lg leading-none" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true" className={i < rounded ? "text-orange" : "text-black/15"}>
          ★
        </span>
      ))}
    </div>
  );
}

/** Profile photo when present, otherwise an initial in a soft orange circle. */
function Avatar({ review }: { review: Review }) {
  if (review.photoUrl) {
    // Google-hosted avatar; plain <img> keeps it out of next/image optimisation.
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={review.photoUrl}
        alt=""
        className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange/10 text-sm font-semibold text-orange"
    >
      {review.author.trim().charAt(0).toUpperCase()}
    </span>
  );
}

/**
 * "What Our Customers Say" — reusable Google reviews section (server component).
 * Renders only with 2+ reviews; otherwise nothing. In production with no API
 * key configured, getReviews() returns empty, so the section is hidden and no
 * placeholder reviews are ever shown. Shared by Home and the Contact page.
 */
export default async function ReviewsSection() {
  const data = await getReviews();

  // Once live: 2+ real reviews → show; 0–1 → hide. (Sample set has 3 in dev.)
  if (data.reviews.length < 2) return null;

  // Only emit AggregateRating/Review JSON-LD from REAL fetched data.
  const emitSchema =
    !data.isSample && data.reviews.length >= 2 && data.overallRating != null;

  return (
    <Section id="reviews" surface="grey">
      {emitSchema && data.overallRating != null && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              reviewsSchema({
                ratingValue: data.overallRating,
                reviewCount: data.totalCount,
                reviews: data.reviews.map((r) => ({
                  author: r.author,
                  rating: r.rating,
                  text: r.text,
                })),
              }),
            ),
          }}
        />
      )}

      <Reveal kind="blur" className="mb-10 text-center">
        <h2 className="text-h2">What Our Customers Say</h2>
        <p className="mx-auto mt-3 max-w-xl text-grey">
          Real feedback from homeowners and businesses we&rsquo;ve helped go solar across Tamil Nadu.
        </p>
        {data.overallRating != null && (
          <p className="mt-4 inline-flex items-center gap-1.5 text-lg font-semibold text-navy">
            {data.overallRating.toFixed(1)}
            <span className="text-orange" aria-hidden="true">
              ★
            </span>
            <span className="font-normal text-grey">
              · {data.totalCount} {data.totalCount === 1 ? "review" : "reviews"}
            </span>
          </p>
        )}
      </Reveal>

      {data.isSample && (
        <p className="mx-auto mb-8 max-w-md rounded-full border border-dashed border-orange/40 bg-orange/5 px-4 py-1.5 text-center text-xs font-medium text-orange">
          Sample reviews — local dev preview only, never shown in production.
        </p>
      )}

      <RevealGroup as="ul" className="flex flex-wrap justify-center gap-6">
        {data.reviews.map((review, i) => (
          <RevealItem
            as="li"
            key={`${review.author}-${i}`}
            className="flex w-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card sm:w-[21rem]"
          >
            <Stars rating={review.rating} />
            <p className="mt-3 flex-1 leading-body text-ink">{review.text}</p>
            <div className="mt-5 flex items-center gap-3">
              <Avatar review={review} />
              <div>
                <p className="text-sm font-semibold text-navy">{review.author}</p>
                <p className="text-xs text-grey">{review.relativeTime}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Google attribution — wired for the live connection later. */}
      <div className="mt-10 flex flex-col items-center gap-1.5 text-sm text-grey">
        <span>Powered by Google</span>
        {GOOGLE_BUSINESS_PROFILE_URL ? (
          <a
            href={GOOGLE_BUSINESS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-orange hover:underline"
          >
            See all reviews on Google →
          </a>
        ) : (
          <span className="font-medium text-grey/70">See all reviews on Google →</span>
        )}
      </div>
    </Section>
  );
}
