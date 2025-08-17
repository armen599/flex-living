import { Review } from '@/types/reviews';

export const reviewUtils = {
  /**
   * Get rating color based on rating value
   */
  getRatingColor: (rating: number): string => {
    if (rating >= 9) return 'text-green-600';
    if (rating >= 8) return 'text-blue-600';
    if (rating >= 7) return 'text-yellow-600';
    if (rating >= 6) return 'text-orange-600';
    return 'text-red-600';
  },

  /**
   * Get status badge styling
   */
  getStatusBadge: (status: string): string => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (status) {
      case 'published':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  },

  /**
   * Get channel badge styling
   */
  getChannelBadge: (channel: string): string => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (channel) {
      case 'hostaway':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'google':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'airbnb':
        return `${baseClasses} bg-pink-100 text-pink-800`;
      case 'vrbo':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  },

  /**
   * Calculate review statistics
   */
  calculateStats: (reviews: Review[]) => {
    const totalReviews = reviews.length;
    const highRatings = reviews.filter(r => r.rating && r.rating >= 8).length;
    const publicReviews = reviews.filter(r => r.isPublic).length;
    const approvedReviews = reviews.filter(r => r.isApproved).length;

    return {
      totalReviews,
      highRatings,
      publicReviews,
      approvedReviews
    };
  },

  /**
   * Format category name for display
   */
  formatCategoryName: (category: string): string => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}; 