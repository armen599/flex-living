import { Review, ReviewCategory } from '@/types/reviews';
import { env } from '@/config/env';
import { generateUniqueId } from '@/utils/idUtils';

export interface GoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

export interface GooglePlaceResponse {
  status: string;
  result: {
    place_id: string;
    name: string;
    formatted_address: string;
    reviews: GoogleReview[];
    rating: number;
    user_ratings_total: number;
  };
}

export class GoogleReviewsService {
  private static readonly API_KEY = env.GOOGLE.PLACES_API_KEY;
  private static readonly BASE_URL = env.GOOGLE.PLACES_BASE_URL;

  /**
   * Check if Google Places API is configured
   */
  static isConfigured(): boolean {
    return !!this.API_KEY;
  }

  /**
   * Fetch Google Reviews for a specific place
   */
  static async fetchGoogleReviews(placeId: string): Promise<Review[]> {
    if (!this.isConfigured()) {
      throw new Error('Google Places API key not configured');
    }

    try {
      const url = `${this.BASE_URL}/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${this.API_KEY}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status}`);
      }

      const data: GooglePlaceResponse = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(`Google Places API error: ${data.status}`);
      }

      return this.transformGoogleReviews(data.result.reviews, data.result.name);
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      throw new Error('Failed to fetch Google reviews');
    }
  }

  /**
   * Transform Google reviews to our Review format
   */
  private static transformGoogleReviews(googleReviews: GoogleReview[], propertyName: string): Review[] {
    return googleReviews.map((googleReview) => {
      // Create a unique ID for Google reviews using the utility
      const id = generateUniqueId();
      
      // Convert Google rating (1-5) to our scale (1-10)
      const rating = googleReview.rating * 2;
      
      // Create review categories based on the overall rating
      const categories: ReviewCategory[] = [
        { category: 'overall_experience', rating },
        { category: 'service_quality', rating: Math.max(1, rating - 1) },
        { category: 'value_for_money', rating: Math.max(1, rating - 1) }
      ];

      // Convert timestamp to date string
      const date = new Date(googleReview.time * 1000).toISOString().replace('T', ' ').substring(0, 19);

      return {
        id,
        type: 'guest-to-host',
        status: 'published',
        rating,
        publicReview: googleReview.text,
        reviewCategory: categories,
        submittedAt: date,
        guestName: googleReview.author_name,
        listingName: propertyName,
        channel: 'google',
        isApproved: true, // Google reviews are pre-approved
        isPublic: true    // Google reviews are public by default
      };
    });
  }

  /**
   * Mock Google Reviews for development (when API key is not available)
   */
  static getMockGoogleReviews(propertyName: string): Review[] {
    // Generate mock Google reviews based on the property name
    const mockReviews = [
      {
        id: generateUniqueId(),
        type: 'guest-to-host' as const,
        status: 'published' as const,
        rating: 9,
        publicReview: `Excellent stay at ${propertyName}! The property was immaculate and the location was perfect. Highly recommend for anyone visiting the area.`,
        reviewCategory: [
          { category: 'cleanliness', rating: 9 },
          { category: 'communication', rating: 9 },
          { category: 'check_in', rating: 9 },
          { category: 'accuracy', rating: 9 },
          { category: 'location', rating: 9 },
          { category: 'value', rating: 9 }
        ],
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        guestName: 'Sarah Johnson',
        listingName: propertyName,
        channel: 'google' as const,
        isApproved: true,
        isPublic: true
      },
      {
        id: generateUniqueId(),
        type: 'guest-to-host' as const,
        status: 'published' as const,
        rating: 8,
        publicReview: `Great experience at ${propertyName}. The property was well-maintained and the amenities were as described. Would stay again!`,
        reviewCategory: [
          { category: 'cleanliness', rating: 8 },
          { category: 'communication', rating: 8 },
          { category: 'check_in', rating: 8 },
          { category: 'accuracy', rating: 8 },
          { category: 'location', rating: 8 },
          { category: 'value', rating: 8 }
        ],
        submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        guestName: 'Michael Chen',
        listingName: propertyName,
        channel: 'google' as const,
        isApproved: true,
        isPublic: true
      },
      {
        id: generateUniqueId(),
        type: 'guest-to-host' as const,
        status: 'published' as const,
        rating: 10,
        publicReview: `Absolutely perfect stay at ${propertyName}! Everything exceeded our expectations. The property manager was incredibly responsive and helpful.`,
        reviewCategory: [
          { category: 'cleanliness', rating: 10 },
          { category: 'communication', rating: 10 },
          { category: 'check_in', rating: 10 },
          { category: 'accuracy', rating: 10 },
          { category: 'location', rating: 10 },
          { category: 'value', rating: 10 }
        ],
        submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        guestName: 'Emma Rodriguez',
        listingName: propertyName,
        channel: 'google' as const,
        isApproved: true,
        isPublic: true
      },
      {
        id: generateUniqueId(),
        type: 'guest-to-host' as const,
        status: 'published' as const,
        rating: 7,
        publicReview: `Good stay at ${propertyName}. The property was clean and comfortable. Some minor issues but overall a positive experience.`,
        reviewCategory: [
          { category: 'cleanliness', rating: 7 },
          { category: 'communication', rating: 7 },
          { category: 'check_in', rating: 7 },
          { category: 'accuracy', rating: 7 },
          { category: 'location', rating: 7 },
          { category: 'value', rating: 7 }
        ],
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        guestName: 'David Thompson',
        listingName: propertyName,
        channel: 'google' as const,
        isApproved: true,
        isPublic: true
      }
    ];

    return mockReviews;
  }

  /**
   * Get Google Reviews (real API or mock based on configuration)
   */
  static async getGoogleReviews(placeId: string, propertyName: string, existingReviewIds?: Set<number>): Promise<Review[]> {
    try {
      let reviews: Review[];
      
      if (this.isConfigured()) {
        reviews = await this.fetchGoogleReviews(placeId);
      } else {
        reviews = this.getMockGoogleReviews(propertyName);
      }
      
      // If we have existing review IDs, ensure our new reviews have unique IDs
      if (existingReviewIds && existingReviewIds.size > 0) {
        reviews = reviews.map(review => {
          let newId = review.id;
          while (existingReviewIds.has(newId)) {
            newId = generateUniqueId();
          }
          existingReviewIds.add(newId);
          return { ...review, id: newId };
        });
      }
      
      return reviews;
    } catch (error) {
      console.error('Falling back to mock Google reviews:', error);
      const mockReviews = this.getMockGoogleReviews(propertyName);
      
      // Ensure unique IDs even for fallback reviews
      if (existingReviewIds && existingReviewIds.size > 0) {
        return mockReviews.map(review => {
          let newId = review.id;
          while (existingReviewIds.has(newId)) {
            newId = generateUniqueId();
          }
          existingReviewIds.add(newId);
          return { ...review, id: newId };
        });
      }
      
      return mockReviews;
    }
  }
} 