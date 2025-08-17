import { Review } from '@/types/reviews';
import { StarIcon, CheckCircleIcon, XCircleIcon, EyeIcon, EyeSlashIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { reviewUtils } from '@/utils/reviewUtils';
import Badge from '@/components/ui/Badge';
import ActionButton from '@/components/ui/ActionButton';
import Link from 'next/link';

interface ReviewTableProps {
  reviews: Review[];
  onReviewAction: (reviewId: number, action: string) => void;
  propertyId?: string;
  loading?: boolean;
}

export default function ReviewTable({ reviews, onReviewAction, propertyId, loading = false }: ReviewTableProps) {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-gray-500">
          <p className="text-lg font-medium mb-2">No reviews found</p>
          <p className="text-sm">Try adjusting your filters or search criteria.</p>
        </div>
      </div>
    );
  }

  const handleReviewAction = (reviewId: number, action: string) => {
    onReviewAction(reviewId, action);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Reviews</h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage and moderate guest reviews
            </p>
          </div>
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
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guest & Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Review
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Channel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review, index) => (
              <tr key={`${review.id}-${index}`} className="hover:bg-gray-50">
                {/* Guest & Property */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {review.guestName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {review.listingName}
                    </div>
                  </div>
                </td>

                {/* Rating */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.rating ? (
                    <div className="flex items-center">
                      <StarIcon className={`h-5 w-5 ${reviewUtils.getRatingColor(review.rating)}`} />
                      <span className={`ml-1 text-sm font-medium ${reviewUtils.getRatingColor(review.rating)}`}>
                        {review.rating}/10
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">No rating</span>
                  )}
                </td>

                {/* Review */}
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-900 line-clamp-3">
                      {review.publicReview}
                    </p>
                    {review.reviewCategory.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {review.reviewCategory.map((cat, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                          >
                            {reviewUtils.formatCategoryName(cat.category)}: {cat.rating}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="status" type={review.status}>
                    {review.status}
                  </Badge>
                </td>

                {/* Channel */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="channel" type={review.channel || 'hostaway'}>
                    {review.channel || 'hostaway'}
                  </Badge>
                </td>

                {/* Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(review.submittedAt), 'MMM dd, yyyy')}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {/* Approve/Reject */}
                    {!review.isApproved ? (
                      <ActionButton
                        onClick={() => handleReviewAction(review.id, 'approve')}
                        variant="approve"
                        icon={<CheckCircleIcon className="h-4 w-4" />}
                        title="Approve review"
                        loading={loading}
                        disabled={loading}
                      />
                    ) : (
                      <ActionButton
                        onClick={() => handleReviewAction(review.id, 'reject')}
                        variant="reject"
                        icon={<XCircleIcon className="h-4 w-4" />}
                        title="Reject review"
                        loading={loading}
                        disabled={loading}
                      />
                    )}

                    {/* Publish/Unpublish - Only show if review is approved */}
                    {review.isApproved && (
                      review.isPublic ? (
                        <ActionButton
                          onClick={() => handleReviewAction(review.id, 'unpublish')}
                          variant="unpublish"
                          icon={<EyeSlashIcon className="h-4 w-4" />}
                          title="Remove from public website"
                          loading={loading}
                          disabled={loading}
                        />
                      ) : (
                        <ActionButton
                          onClick={() => handleReviewAction(review.id, 'publish')}
                          variant="publish"
                          icon={<EyeIcon className="h-4 w-4" />}
                          title="Publish to public website"
                          loading={loading}
                          disabled={loading}
                        />
                      )
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 