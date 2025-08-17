import { Review, FilterOptions, HostawayApiResponse } from '@/types/reviews';
import { mockReviews } from '@/data/mockReviews';

export class ReviewService {
  /**
   * Normalize review data to ensure consistent structure
   */
  static normalizeReviews(reviews: Review[]): Review[] {
    return reviews.map(review => ({
      ...review,
      channel: review.channel || 'hostaway',
      isApproved: Boolean(review.isApproved ?? (review.rating && review.rating >= 7)),
      isPublic: Boolean(review.isPublic ?? (review.rating && review.rating >= 7))
    }));
  }

  /**
   * Calculate overall rating from category ratings
   */
  private static calculateRatingFromCategories(categories: Review['reviewCategory']): number | null {
    if (categories.length === 0) return null;
    const total = categories.reduce((sum, cat) => sum + cat.rating, 0);
    return Math.round(total / categories.length);
  }

  /**
   * Apply filters to reviews
   */
  static filterReviews(reviews: Review[], filters: FilterOptions): Review[] {
    let filtered = [...reviews];

    if (filters.rating) {
      filtered = filtered.filter(review => review.rating === filters.rating);
    }

    if (filters.category) {
      filtered = filtered.filter(review => 
        review.reviewCategory.some(cat => cat.category === filters.category)
      );
    }

    if (filters.channel) {
      filtered = filtered.filter(review => review.channel === filters.channel);
    }

    if (filters.status) {
      filtered = filtered.filter(review => review.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(review =>
        review.guestName.toLowerCase().includes(searchLower) ||
        review.listingName.toLowerCase().includes(searchLower) ||
        review.publicReview.toLowerCase().includes(searchLower)
      );
    }

    if (filters.dateRange?.start || filters.dateRange?.end) {
      filtered = filtered.filter(review => {
        const reviewDate = new Date(review.submittedAt);
        if (filters.dateRange?.start && reviewDate < new Date(filters.dateRange.start)) return false;
        if (filters.dateRange?.end && reviewDate > new Date(filters.dateRange.end)) return false;
        return true;
      });
    }

    return filtered;
  }

  /**
   * Mock Hostaway API call
   */
  static async fetchHostawayReviews(): Promise<HostawayApiResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      return {
        status: 'success',
        result: mockReviews
      };
    } catch (error) {
      console.error('Error fetching Hostaway reviews:', error);
      throw new Error('Failed to fetch reviews from Hostaway API');
    }
  }

  /**
   * Update review status
   */
  static updateReviewStatus(reviews: Review[], reviewId: number, action: string): Review[] {
    return reviews.map(review => {
      if (review.id === reviewId) {
        switch (action) {
          case 'approve':
            return { ...review, isApproved: true };
          case 'reject':
            return { ...review, isApproved: false };
          case 'publish':
            return { ...review, isPublic: true };
          case 'unpublish':
            return { ...review, isPublic: false };
          default:
            return review;
        }
      }
      return review;
    });
  }
} 