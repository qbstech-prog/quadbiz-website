import Section from "@/components/Section";

/**
 * Live Google reviews section.
 *
 * This is a server component that will fetch from the Google Places API once
 * GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are configured. Until then it
 * renders nothing — we never show fake or placeholder reviews.
 */

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
}

// TODO: wire Google Places reviews.
async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return [];

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}&fields=reviews&reviews_sort=newest&key=${apiKey}`;
    // Revalidate periodically so reviews stay fresh without hammering the API.
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { result?: { reviews?: GoogleReview[] } };
    return data.result?.reviews ?? [];
  } catch {
    return [];
  }
}

export default async function Reviews() {
  const reviews = await fetchGoogleReviews();

  // No real data yet → hide the section entirely.
  if (reviews.length === 0) return null;

  return (
    <Section id="reviews" variant="soft">
      <div className="mb-10 text-center">
        <h2 className="text-h2 font-bold">What Our Customers Say</h2>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <li
            key={`${review.author_name}-${index}`}
            className="rounded-card border border-black/5 bg-white p-6 shadow-card"
          >
            <div
              className="mb-2 flex gap-0.5 text-amber"
              aria-label={`${review.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} aria-hidden="true">
                  {i < Math.round(review.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <p className="text-ink">{review.text}</p>
            <p className="mt-4 text-sm font-semibold text-navy">
              {review.author_name}
              <span className="ml-2 font-normal text-grey">
                {review.relative_time_description}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
