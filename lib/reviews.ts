/**
 * Reviews data source.
 *
 * Real Google reviews are fetched server-side (cached via ISR) once
 * GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set. Until then:
 *   - development, no key → clearly-labelled SAMPLE data (layout preview only)
 *   - production,  no key → empty  → the section renders nothing
 *
 * We NEVER show fake/sample reviews in production.
 */

export interface Review {
  author: string;
  rating: number; // 1–5
  text: string;
  relativeTime: string;
  photoUrl?: string;
  /** True only for dev-preview placeholder data — never set in production. */
  sample?: boolean;
}

export interface ReviewsData {
  reviews: Review[];
  /** Overall business rating (Google `rating`), or null when unknown. */
  overallRating: number | null;
  /** Total number of ratings (Google `user_ratings_total`). */
  totalCount: number;
  /** True when the payload is dev-only placeholder data. */
  isSample: boolean;
}

/**
 * Public Google Business Profile URL for the "See all reviews on Google" link.
 * TODO: fill in once the Business Profile is confirmed, e.g.
 * "https://g.page/r/XXXXXXXX/review" or the Maps place URL.
 */
export const GOOGLE_BUSINESS_PROFILE_URL = "";

const EMPTY: ReviewsData = {
  reviews: [],
  overallRating: null,
  totalCount: 0,
  isSample: false,
};

/**
 * Obviously-placeholder reviews for LOCAL DEV ONLY, so the layout can be
 * positioned. Names and copy are intentionally generic and self-identifying so
 * they can never be mistaken for real customers. Never returned in production.
 */
const SAMPLE_REVIEWS: Review[] = [
  {
    author: "Sample Review 1",
    rating: 5,
    text: "Placeholder text for layout preview only — not a real customer review. Real Google reviews will appear here once the API is connected.",
    relativeTime: "2 weeks ago",
    sample: true,
  },
  {
    author: "Sample Review 2",
    rating: 5,
    text: "Sample content used to position the review cards during development. This is not live and is hidden in production.",
    relativeTime: "1 month ago",
    sample: true,
  },
  {
    author: "Sample Review 3",
    rating: 4,
    text: "Generic placeholder review shown only in local development so spacing and alignment can be checked.",
    relativeTime: "3 months ago",
    sample: true,
  },
];

interface GooglePlaceReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
}

async function fetchGooglePlaces(apiKey: string, placeId: string): Promise<ReviewsData> {
  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}&fields=reviews,rating,user_ratings_total&reviews_sort=newest&key=${apiKey}`;
    // Revalidate daily so reviews stay fresh without hammering the API.
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) return EMPTY;
    const data = (await res.json()) as {
      result?: {
        reviews?: GooglePlaceReview[];
        rating?: number;
        user_ratings_total?: number;
      };
    };
    const raw = data.result?.reviews ?? [];
    const reviews: Review[] = raw.map((r) => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      relativeTime: r.relative_time_description,
      photoUrl: r.profile_photo_url,
    }));
    return {
      reviews,
      overallRating: data.result?.rating ?? null,
      totalCount: data.result?.user_ratings_total ?? reviews.length,
      isSample: false,
    };
  } catch {
    return EMPTY;
  }
}

/** Server-side reviews fetch. Safe to call from server components. */
export async function getReviews(): Promise<ReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (apiKey && placeId) {
    return fetchGooglePlaces(apiKey, placeId);
  }

  // No API key configured yet.
  if (process.env.NODE_ENV === "development") {
    return {
      reviews: SAMPLE_REVIEWS,
      overallRating: 4.9,
      totalCount: SAMPLE_REVIEWS.length,
      isSample: true,
    };
  }

  // Production without a key → render nothing. Never show fake reviews.
  return EMPTY;
}
