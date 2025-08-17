import { Review } from '@/types/reviews';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { reviewUtils } from '@/utils/reviewUtils';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ReviewStatsProps {
  reviews: Review[];
  propertyId?: string;
}

export default function ReviewStats({ reviews, propertyId }: ReviewStatsProps) {
  // Calculate rating distribution
  const ratingDistribution = reviews.reduce((acc, review) => {
    if (review.rating) {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  // Calculate category averages
  const categoryTotals: Record<string, { sum: number; count: number }> = {};
  reviews.forEach(review => {
    review.reviewCategory.forEach(cat => {
      if (!categoryTotals[cat.category]) {
        categoryTotals[cat.category] = { sum: 0, count: 0 };
      }
      categoryTotals[cat.category].sum += cat.rating;
      categoryTotals[cat.category].count += 1;
    });
  });

  const categoryAverages = Object.entries(categoryTotals).map(([category, { sum, count }]) => ({
    category: reviewUtils.formatCategoryName(category),
    average: count > 0 ? sum / count : 0
  }));

  // Calculate channel breakdown
  const channelBreakdown = reviews.reduce((acc, review) => {
    const channel = review.channel || 'hostaway';
    acc[channel] = (acc[channel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const channelData = Object.entries(channelBreakdown).map(([channel, count]) => ({
    channel: channel.charAt(0).toUpperCase() + channel.slice(1),
    count
  }));

  // Calculate recent trends (last 7 days)
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const recentReviews = reviews.filter(review => {
    const reviewDate = new Date(review.submittedAt);
    return reviewDate >= sevenDaysAgo;
  });

  const dailyStats = recentReviews.reduce((acc, review) => {
    const date = new Date(review.submittedAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { date, totalRating: 0, count: 0 };
    }
    if (review.rating) {
      acc[date].totalRating += review.rating;
    }
    acc[date].count += 1;
    return acc;
  }, {} as Record<string, { date: string; totalRating: number; count: number }>);

  const trendData = Object.values(dailyStats).map(day => ({
    date: day.date,
    averageRating: day.count > 0 ? day.totalRating / day.count : 0,
    reviewCount: day.count
  }));

  // Get summary stats using utility function
  const summaryStats = reviewUtils.calculateStats(reviews);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Review Statistics</h3>
        {propertyId && (
          <Link
            href={`/property/${propertyId}`}
            className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
            View Property Page
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Distribution */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Rating Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={Object.entries(ratingDistribution).map(([rating, count]) => ({
              rating: `${rating}/10`,
              count
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Averages */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Category Averages</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryAverages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="average" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Breakdown */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Reviews by Channel</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Trends */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Recent Trends (7 Days)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="averageRating" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {summaryStats.totalReviews}
            </p>
            <p className="text-sm text-gray-600">Total Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {summaryStats.highRatings}
            </p>
            <p className="text-sm text-gray-600">High Ratings (8+)</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {summaryStats.publicReviews}
            </p>
            <p className="text-sm text-gray-600">Public Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {summaryStats.approvedReviews}
            </p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
        </div>
      </div>
    </div>
  );
} 