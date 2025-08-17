import { GoogleReviewsService } from './googleReviewsService';
import { Review } from '@/types/reviews';

export interface GoogleReviewsBackendResponse {
  success: boolean;
  reviews: Review[];
  total: number;
  source: 'google' | 'mock';
  configured: boolean;
  message?: string;
}

export class GoogleReviewsBackendService {
  /**
   * Fetch Google Reviews for a property
   */
  static async fetchReviews(placeId: string, propertyName: string): Promise<GoogleReviewsBackendResponse> {
    try {
      // Validate input parameters
      if (!placeId || !propertyName) {
        return {
          success: false,
          reviews: [],
          total: 0,
          source: 'mock',
          configured: false,
          message: 'Missing required parameters: placeId and propertyName'
        };
      }

      // Fetch reviews using the main service
      const reviews = await GoogleReviewsService.getGoogleReviews(placeId, propertyName);
      
      return {
        success: true,
        reviews,
        total: reviews.length,
        source: GoogleReviewsService.isConfigured() ? 'google' : 'mock',
        configured: GoogleReviewsService.isConfigured(),
        message: `Successfully fetched ${reviews.length} review${reviews.length !== 1 ? 's' : ''}`
      };

    } catch (error) {
      console.error('Google Reviews Backend Service Error:', error);
      
      return {
        success: false,
        reviews: [],
        total: 0,
        source: 'mock',
        configured: false,
        message: error instanceof Error ? error.message : 'Failed to fetch Google reviews'
      };
    }
  }

  /**
   * Validate Google Places API configuration
   */
  static validateConfiguration(): { configured: boolean; message: string } {
    const isConfigured = GoogleReviewsService.isConfigured();
    
    return {
      configured: isConfigured,
      message: isConfigured 
        ? 'Google Places API is properly configured'
        : 'Google Places API not configured. Using mock data for demonstration.'
    };
  }

  /**
   * Get configuration status for monitoring
   */
  static getConfigurationStatus() {
    return {
      apiConfigured: GoogleReviewsService.isConfigured(),
      serviceAvailable: true,
      timestamp: new Date().toISOString()
    };
  }
} 