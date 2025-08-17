'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { Property } from '@/types/reviews';
import { StarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PropertyPage() {
  const params = useParams();
  const propertyId = params.id as string;

  const { data, loading, error, execute } = useApi<{ status: string; data: Property }>();

  useEffect(() => {
    if (propertyId) {
      execute(`/api/properties?id=${propertyId}`);
    }
  }, [propertyId, execute]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading property details..." />
      </div>
    );
  }

  if (error || !data || data.status !== 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const property = data.data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
              <p className="text-lg text-gray-600 mt-1">{property.address}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center">
                  <StarIcon className="h-6 w-6 text-yellow-400" />
                  <span className="ml-1 text-xl font-semibold text-gray-900">
                    {property.reviewStats.averageRating}/10
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {property.reviewStats.totalReviews} reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{property.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <UserGroupIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Short-term rental</span>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Guest Reviews</h2>
              <div className="space-y-4">
                {property.reviews
                  .filter(review => review.isPublic)
                  .slice(0, 5)
                  .map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{review.guestName}</span>
                          {review.rating && (
                            <div className="flex items-center">
                              <StarIcon className="h-4 w-4 text-yellow-400" />
                              <span className="ml-1 text-sm text-gray-600">{review.rating}/10</span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {format(new Date(review.submittedAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.publicReview}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Distribution */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {Object.entries(property.reviewStats.ratingDistribution)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([rating, count]) => (
                    <div key={rating} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{rating}/10</span>
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div className="flex-1 mx-3">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{
                              width: `${(count / property.reviewStats.totalReviews) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Channel Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Sources</h3>
              <div className="space-y-3">
                {Object.entries(property.reviewStats.channelBreakdown).map(([channel, count]) => (
                  <div key={channel} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">{channel}</span>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 