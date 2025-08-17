import { FilterOptions } from '@/types/reviews';
import { FunnelIcon, MagnifyingGlassIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ReviewFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  totalReviews: number;
  filteredCount: number;
  propertyId?: string;
}

export default function ReviewFilters({ filters, onFiltersChange, onClearFilters, totalReviews, filteredCount, propertyId }: ReviewFiltersProps) {
  const handleFilterChange = (filterType: keyof FilterOptions, value: string | number | boolean | undefined) => {
    if (value !== undefined) {
      onFiltersChange({ [filterType]: value });
    } else {
      // Remove the filter if value is undefined
      const newFilters = { ...filters };
      delete newFilters[filterType];
      onFiltersChange(newFilters);
    }
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const newDateRange = {
      ...filters.dateRange,
      [field]: value || undefined
    };
    onFiltersChange({ dateRange: newDateRange });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          {propertyId && (
            <Link
              href={`/property/${propertyId}`}
              className="inline-flex items-center px-2 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            >
              <ArrowTopRightOnSquareIcon className="h-3 w-3 mr-1" />
              Property Page
            </Link>
          )}
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium text-gray-900">{filteredCount}</span> of{' '}
          <span className="font-medium text-gray-900">{totalReviews}</span> reviews
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search Reviews
        </label>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            id="search"
            placeholder="Search by guest name, property, or review content..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <select
          id="rating"
          value={filters.rating || ''}
          onChange={(e) => handleFilterChange('rating', e.target.value ? parseInt(e.target.value) : undefined)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Ratings</option>
          <option value="10">10 - Excellent</option>
          <option value="9">9 - Very Good</option>
          <option value="8">8 - Good</option>
          <option value="7">7 - Satisfactory</option>
          <option value="6">6 - Below Average</option>
          <option value="5">5 - Poor</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category"
          value={filters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option value="cleanliness">Cleanliness</option>
          <option value="communication">Communication</option>
          <option value="location">Location</option>
          <option value="value">Value</option>
          <option value="respect_house_rules">Respect House Rules</option>
        </select>
      </div>

      {/* Channel Filter */}
      <div className="mb-6">
        <label htmlFor="channel" className="block text-sm font-medium text-gray-700 mb-2">
          Channel
        </label>
        <select
          id="channel"
          value={filters.channel || ''}
          onChange={(e) => handleFilterChange('channel', e.target.value || undefined)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Channels</option>
          <option value="hostaway">Hostaway</option>
          <option value="google">Google</option>
          <option value="airbnb">Airbnb</option>
          <option value="vrbo">VRBO</option>
        </select>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          id="status"
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Date Range Filters */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date Range
        </label>
        <div className="space-y-3">
          <div>
            <label htmlFor="startDate" className="block text-xs text-gray-500 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={filters.dateRange?.start || ''}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-xs text-gray-500 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={filters.dateRange?.end || ''}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 