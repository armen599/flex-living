import { useState, useCallback } from 'react';
import { Review } from '@/types/reviews';
import { GoogleReviewsService } from '@/services/googleReviewsService';

interface UseGoogleReviewsState {
  loading: boolean;
  error: string | null;
  success: string | null;
  lastFetched: Date | null;
  isConfigured: boolean;
}

export const useGoogleReviews = () => {
  const [state, setState] = useState<UseGoogleReviewsState>({
    loading: false,
    error: null,
    success: null,
    lastFetched: null,
    isConfigured: GoogleReviewsService.isConfigured()
  });

  const clearMessages = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
      success: null
    }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      loading: false,
      error: null,
      success: null,
      lastFetched: null,
      isConfigured: GoogleReviewsService.isConfigured()
    });
  }, []);

  const fetchGoogleReviews = useCallback(async (
    placeId: string, 
    propertyName: string,
    existingReviews: Review[]
  ): Promise<Review[]> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      success: null
    }));

    try {
      // Create a set of existing review IDs for uniqueness checking
      const existingReviewIds = new Set(existingReviews.map(review => review.id));
      
      const newGoogleReviews = await GoogleReviewsService.getGoogleReviews(
        placeId, 
        propertyName, 
        existingReviewIds
      );
      
      if (newGoogleReviews.length === 0) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'No Google reviews found for this property'
        }));
        return [];
      }

      // Filter out any Google reviews that already exist to prevent duplicates
      const existingGoogleReviewIds = new Set(
        existingReviews
          .filter(review => review.channel === 'google')
          .map(review => review.id)
      );
      
      const uniqueNewReviews = newGoogleReviews.filter(
        review => !existingGoogleReviewIds.has(review.id)
      );
      
      if (uniqueNewReviews.length > 0) {
        setState(prev => ({
          ...prev,
          loading: false,
          lastFetched: new Date(),
          success: `Successfully fetched ${uniqueNewReviews.length} new Google review${uniqueNewReviews.length !== 1 ? 's' : ''}`
        }));
        return uniqueNewReviews;
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          success: 'All Google reviews are already loaded. No new reviews to fetch.'
        }));
        return [];
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch Google reviews';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      return [];
    }
  }, []);

  return {
    ...state,
    fetchGoogleReviews,
    clearMessages,
    resetState
  };
}; 