export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface Review {
  id: number;
  type: 'host-to-guest' | 'guest-to-host';
  status: 'published' | 'pending' | 'rejected';
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel?: 'hostaway' | 'google' | 'airbnb' | 'vrbo';
  isApproved?: boolean;
  isPublic?: boolean;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
  categoryAverages: Record<string, number>;
  channelBreakdown: Record<string, number>;
  recentTrends: {
    date: string;
    averageRating: number;
    reviewCount: number;
  }[];
}

export interface Property {
  id: string;
  name: string;
  address: string;
  reviewStats: ReviewStats;
  reviews: Review[];
}

export interface FilterOptions {
  rating?: number;
  category?: string;
  channel?: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
  status?: string;
  search?: string;
}

export interface HostawayApiResponse {
  status: string;
  result: Review[];
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface ReviewAction {
  reviewId: number;
  action: 'approve' | 'reject' | 'publish' | 'unpublish';
} 