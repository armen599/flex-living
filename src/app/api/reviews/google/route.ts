import { NextRequest, NextResponse } from 'next/server';
import { GoogleReviewsBackendService } from '@/services/googleReviewsBackendService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId');
    const propertyName = searchParams.get('propertyName');

    // Use the backend service to fetch reviews
    const result = await GoogleReviewsBackendService.fetchReviews(
      placeId || '', 
      propertyName || ''
    );

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { error: result.message || 'Failed to fetch Google reviews' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Google Reviews API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add a configuration check endpoint
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'check-config') {
      const configStatus = GoogleReviewsBackendService.getConfigurationStatus();
      return NextResponse.json({ success: true, ...configStatus });
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Google Reviews Config API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 