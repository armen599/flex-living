import { useEffect } from 'react';
import { Review } from '@/types/reviews';
import { StarIcon, GlobeAltIcon, ExclamationTriangleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';
import Link from 'next/link';

interface GoogleReviewsIntegrationProps {
  propertyName: string;
  propertyId: string;
  onReviewsFetched: (reviews: Review[]) => void;
  existingReviews: Review[];
}

export default function GoogleReviewsIntegration({ 
  propertyName, 
  propertyId,
  onReviewsFetched, 
  existingReviews 
}: GoogleReviewsIntegrationProps) {
  const {
    loading,
    error,
    success,
    lastFetched,
    isConfigured,
    fetchGoogleReviews,
    clearMessages,
    resetState
  } = useGoogleReviews();

  // Reset state when property changes
  useEffect(() => {
    resetState();
  }, [propertyId, resetState]);

  const handleFetchReviews = async () => {
    // For demo purposes, we'll use a mock place ID
    const mockPlaceId = 'ChIJN1t_tDeuEmsRUsoyG83frY4';
    
    const newReviews = await fetchGoogleReviews(mockPlaceId, propertyName, existingReviews);
    
    if (newReviews.length > 0) {
      onReviewsFetched(newReviews);
    }
  };

  // Check if we already have Google reviews
  const hasGoogleReviews = existingReviews.some(review => review.channel === 'google');
  const googleReviewsCount = existingReviews.filter(review => review.channel === 'google').length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <GlobeAltIcon className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Google Reviews Integration</h3>
        </div>
        <Link
          href={`/property/${propertyId}`}
          className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
        >
          <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
          View Property
        </Link>
      </div>

      {/* Status Information */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${isConfigured ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-sm font-medium">
            {isConfigured ? 'API Configured' : 'Using Mock Data'}
          </span>
        </div>
        
        {isConfigured ? (
          <p className="text-sm text-gray-600">
            Google Places API is configured. Real Google reviews will be fetched.
          </p>
        ) : (
          <div className="flex items-start space-x-2">
            <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="mb-1">Google Places API not configured. Using mock data for demonstration.</p>
              <p>To enable real Google reviews, add <code className="bg-gray-200 px-1 rounded">GOOGLE_PLACES_API_KEY</code> to your environment variables.</p>
            </div>
          </div>
        )}
        
        {/* Show current Google reviews status */}
        {hasGoogleReviews && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Current Status:</strong> {googleReviewsCount} Google review{googleReviewsCount !== 1 ? 's' : ''} loaded
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleFetchReviews}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Fetching...
            </>
          ) : (
            <>
              <GlobeAltIcon className="h-4 w-4 mr-2" />
              {hasGoogleReviews ? 'Refresh Google Reviews' : 'Fetch Google Reviews'}
            </>
          )}
        </button>

        {lastFetched && (
          <span className="text-sm text-gray-500">
            Last fetched: {lastFetched.toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
            <button
              onClick={clearMessages}
              className="text-red-400 hover:text-red-600 transition-colors"
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <StarIcon className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-700">{success}</span>
            </div>
            <button
              onClick={clearMessages}
              className="text-green-400 hover:text-green-600 transition-colors"
              aria-label="Dismiss success message"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Integration Details */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Integration Details</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• <strong>API Endpoint:</strong> Google Places API</p>
          <p>• <strong>Rate Limits:</strong> 1000 requests/day (free tier)</p>
          <p>• <strong>Data Source:</strong> Google My Business reviews</p>
          <p>• <strong>Review Format:</strong> Automatically converted to 1-10 scale</p>
          <p>• <strong>Categories:</strong> Mapped to overall experience, service quality, value</p>
          <p>• <strong>Duplicate Prevention:</strong> Automatically filters out existing reviews</p>
        </div>
      </div>
    </div>
  );
} 