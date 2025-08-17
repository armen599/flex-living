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
      const id = generateUniqueId('google');
      
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
    const mockReviews: Omit<GoogleReview, 'time'>[] = [
      {
        author_name: 'Sarah Johnson',
        author_url: 'https://maps.google.com/...',
        language: 'en',
        profile_photo_url: 'https://lh3.googleusercontent.com/...',
        rating: 5,
        relative_time_description: '2 months ago',
        text: 'Excellent property management! The apartment was spotless and the location is perfect for exploring London. Highly recommend!',
        translated: false
      },
      {
        author_name: 'Michael Chen',
        author_url: 'https://maps.google.com/...',
        language: 'en',
        profile_photo_url: 'https://lh3.googleusercontent.com/...',
        rating: 4,
        relative_time_description: '3 months ago',
        text: 'Great place to stay. Clean, comfortable, and well-located. The staff was very helpful and responsive.',
        translated: false
      },
      {
        author_name: 'Emma Thompson',
        author_url: 'https://maps.google.com/...',
        language: 'en',
        profile_photo_url: 'https://lh3.googleusercontent.com/...',
        rating: 5,
        relative_time_description: '4 months ago',
        text: 'Absolutely loved our stay here! The apartment exceeded our expectations. Perfect location and amazing service.',
        translated: false
      },
      {
        author_name: 'David Wilson',
        author_url: 'https://maps.google.com/...',
        language: 'en',
        profile_photo_url: 'https://lh3.googleusercontent.com/...',
        rating: 3,
        relative_time_description: '5 months ago',
        text: 'Decent place but could use some updates. Location is good but the apartment needs some maintenance.',
        translated: false
      }
    ];

    return mockReviews.map((review) => {
      const id = generateUniqueId('google');
      const rating = review.rating * 2;
      const categories: ReviewCategory[] = [
        { category: 'overall_experience', rating },
        { category: 'service_quality', rating: Math.max(1, rating - 1) },
        { category: 'value_for_money', rating: Math.max(1, rating - 1) }
      ];

      // Generate a date within the last 6 months
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - review.rating));
      const dateString = date.toISOString().replace('T', ' ').substring(0, 19);

      return {
        id,
        type: 'guest-to-host',
        status: 'published',
        rating,
        publicReview: review.text,
        reviewCategory: categories,
        submittedAt: dateString,
        guestName: review.author_name,
        listingName: propertyName,
        channel: 'google',
        isApproved: true,
        isPublic: true
      };
    });
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
            newId = generateUniqueId('google');
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
            newId = generateUniqueId('google');
          }
          existingReviewIds.add(newId);
          return { ...review, id: newId };
        });
      }
      
      return mockReviews;
    }
  }
} 