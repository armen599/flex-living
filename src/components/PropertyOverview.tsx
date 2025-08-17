import { Property } from '@/types/reviews';
import { StarIcon, ChatBubbleLeftRightIcon, EyeIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface PropertyOverviewProps {
  properties: Property[];
  selectedProperty: string;
  onPropertyChange: (propertyId: string) => void;
}

export default function PropertyOverview({ properties, selectedProperty, onPropertyChange }: PropertyOverviewProps) {
  const selectedPropertyData = properties.find(p => p.id === selectedProperty);
  
  // Calculate stats for selected property or all properties
  const stats = selectedProperty === 'all' 
    ? {
        totalReviews: properties.reduce((sum, p) => sum + p.reviewStats.totalReviews, 0),
        averageRating: properties.reduce((sum, p) => sum + p.reviewStats.averageRating, 0) / properties.length,
        publicReviews: properties.reduce((sum, p) => sum + p.reviews.filter(r => r.isPublic).length, 0)
      }
    : {
        totalReviews: selectedPropertyData?.reviewStats.totalReviews || 0,
        averageRating: selectedPropertyData?.reviewStats.averageRating || 0,
        publicReviews: selectedPropertyData?.reviews.filter(r => r.isPublic).length || 0
      };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Property Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="property-select" className="block text-sm font-medium text-gray-700">
            Select Property
          </label>
          {selectedProperty !== 'all' && selectedPropertyData && (
            <Link
              href={`/property/${selectedProperty}`}
              className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
              View Public Page
            </Link>
          )}
        </div>
        <select
          id="property-select"
          value={selectedProperty}
          onChange={(e) => onPropertyChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Properties</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Reviews */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Total Reviews</p>
              <p className="text-2xl font-bold text-blue-900">
                {stats.totalReviews}
              </p>
            </div>
          </div>
        </div>

        {/* Average Rating */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <StarIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Average Rating</p>
              <p className="text-2xl font-bold text-green-900">
                {stats.averageRating.toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        {/* Public Reviews */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <EyeIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Public Reviews</p>
              <p className="text-2xl font-bold text-purple-900">
                {stats.publicReviews}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      {selectedProperty !== 'all' && selectedPropertyData && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-sm font-medium text-gray-900">{selectedPropertyData.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Properties</p>
              <p className="text-sm font-medium text-gray-900">{properties.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 