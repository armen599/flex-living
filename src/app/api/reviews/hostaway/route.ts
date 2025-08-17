import { NextRequest, NextResponse } from 'next/server';
import { ReviewService } from '@/services/reviewService';
import { ApiResponse, ReviewAction } from '@/types/reviews';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters for filtering
    const rating = searchParams.get('rating');
    const category = searchParams.get('category');
    const channel = searchParams.get('channel');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Fetch reviews from Hostaway
    const hostawayResponse = await ReviewService.fetchHostawayReviews();
    
    if (hostawayResponse.status !== 'success') {
      return NextResponse.json(
        { error: 'Failed to fetch reviews from Hostaway' },
        { status: 500 }
      );
    }
    
    // Normalize the reviews
    const normalizedReviews = ReviewService.normalizeReviews(hostawayResponse.result);
    
    // Apply filters
    const filters = {
      rating: rating ? parseInt(rating) : undefined,
      category: category || undefined,
      channel: channel || undefined,
      status: status || undefined,
      search: search || undefined,
      dateRange: {
        start: startDate || undefined,
        end: endDate || undefined
      }
    };
    
    const filteredReviews = ReviewService.filterReviews(normalizedReviews, filters);
    
    // Return structured response
    const response: ApiResponse<{
      reviews: typeof filteredReviews;
      total: number;
      filters: typeof filters;
    }> = {
      status: 'success',
      data: {
        reviews: filteredReviews,
        total: filteredReviews.length,
        filters
      }
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ReviewAction = await request.json();
    const { reviewId, action } = body;
    
    if (!reviewId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: reviewId and action' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would update the review in the database
    // For now, we'll just return a success response
    const response: ApiResponse<{ reviewId: number; action: string }> = {
      status: 'success',
      message: `Review ${reviewId} ${action} successfully`,
      data: { reviewId, action }
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 