import { useState, useEffect, useCallback } from 'react';
import { Review, FilterOptions } from '@/types/reviews';
import { ReviewService } from '@/services/reviewService';
import { ToastMessage } from '@/components/ui/Toast';

export const useReviews = (initialReviews: Review[] = []) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(initialReviews);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply filters whenever reviews or filters change
  useEffect(() => {
    const filtered = ReviewService.filterReviews(reviews, filters);
    setFilteredReviews(filtered);
  }, [reviews, filters]);

  // Add toast message
  const addToast = useCallback((type: 'success' | 'error' | 'warning', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  // Remove toast message
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Update review status
  const updateReviewStatus = useCallback(async (reviewId: number, action: string) => {
    try {
      setLoading(true);
      
      // Call API
      const response = await fetch('/api/reviews/hostaway', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, action })
      });
      
      if (response.ok) {
        // Update local state immediately
        setReviews(prev => {
          const updatedReviews = ReviewService.updateReviewStatus(prev, reviewId, action);
          return updatedReviews;
        });
        
        // Force a re-render by updating filtered reviews
        setTimeout(() => {
          setFilteredReviews(() => {
            const filtered = ReviewService.filterReviews(reviews, filters);
            return filtered;
          });
        }, 100);
        
        // Show success toast
        addToast('success', `Review ${action} successfully`);
        return true;
      } else {
        addToast('error', `Failed to ${action} review`);
        return false;
      }
    } catch (error) {
      addToast('error', `Error updating review: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [addToast, reviews, filters]);

  // Set reviews
  const setReviewsData = useCallback((newReviews: Review[]) => {
    setReviews(newReviews);
  }, []);

  return {
    reviews,
    filteredReviews,
    filters,
    loading,
    toasts,
    updateFilters,
    clearFilters,
    updateReviewStatus,
    setReviewsData,
    addToast,
    removeToast
  };
}; 