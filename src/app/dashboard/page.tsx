'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import PropertyOverview from '@/components/PropertyOverview';
import ReviewFilters from '@/components/ReviewFilters';
import ReviewTable from '@/components/ReviewTable';
import ReviewStats from '@/components/ReviewStats';
import GoogleReviewsIntegration from '@/components/GoogleReviewsIntegration';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ToastContainer } from '@/components/ui/Toast';
import { useProperties } from '@/hooks/useProperties';
import { useReviews } from '@/hooks/useReviews';
import { Review } from '@/types/reviews';
import { ensureUniqueIds, generateUniqueId } from '@/utils/idUtils';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const {
    properties,
    selectedProperty,
    allPropertiesStats,
    loading: propertiesLoading,
    changeProperty,
    getSelectedPropertyReviews
  } = useProperties();

  const {
    reviews,
    filteredReviews,
    filters,
    loading: reviewsLoading,
    toasts,
    updateFilters,
    clearFilters,
    updateReviewStatus,
    setReviewsData,
    addToast,
    removeToast
  } = useReviews();

  // Load reviews when property changes
  useEffect(() => {
    const propertyReviews = getSelectedPropertyReviews();
    setReviewsData(propertyReviews);
  }, [selectedProperty, getSelectedPropertyReviews, setReviewsData]);

  // Update URL when property changes
  useEffect(() => {
    if (selectedProperty && selectedProperty !== searchParams.get('property')) {
      const params = new URLSearchParams(searchParams);
      params.set('property', selectedProperty);
      router.replace(`/dashboard?${params.toString()}`, { scroll: false });
    }
  }, [selectedProperty, searchParams, router]);

  // Handle Google reviews being fetched
  const handleGoogleReviewsFetched = (googleReviews: Review[]) => {
    if (googleReviews.length === 0) return;
    
    // Create a map of existing review IDs for quick lookup
    const existingReviewIds = new Set(reviews.map(review => review.id));
    
    // Filter out any Google reviews that already exist and ensure unique IDs
    const newUniqueReviews = googleReviews
      .filter(review => !existingReviewIds.has(review.id))
      .map(review => {
        // Generate a new unique ID if needed
        let newId = review.id;
        while (existingReviewIds.has(newId)) {
          newId = generateUniqueId('google');
        }
        existingReviewIds.add(newId);
        return { ...review, id: newId };
      });
    
    if (newUniqueReviews.length > 0) {
      // Combine existing reviews with new unique Google reviews
      const updatedReviews = [...reviews, ...newUniqueReviews];
      setReviewsData(updatedReviews);
    }
  };

  if (propertiesLoading || reviewsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const selectedPropertyData = properties.find(p => p.id === selectedProperty);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader selectedProperty={selectedProperty} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Overview */}
        <PropertyOverview 
          properties={properties}
          selectedProperty={selectedProperty}
          onPropertyChange={changeProperty}
        />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ReviewFilters 
              filters={filters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
              totalReviews={reviews.length}
              filteredCount={filteredReviews.length}
              propertyId={selectedProperty !== 'all' ? selectedProperty : undefined}
            />
            
            {/* Google Reviews Integration */}
            {selectedPropertyData && (
              <div className="mt-6">
                <GoogleReviewsIntegration
                  propertyName={selectedPropertyData.name}
                  propertyId={selectedPropertyData.id}
                  onReviewsFetched={handleGoogleReviewsFetched}
                  existingReviews={reviews}
                />
              </div>
            )}
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Review Statistics */}
            <ReviewStats reviews={filteredReviews} propertyId={selectedProperty !== 'all' ? selectedProperty : undefined} />
            
            {/* Review Table */}
            <ReviewTable 
              reviews={filteredReviews}
              onReviewAction={updateReviewStatus}
              propertyId={selectedProperty !== 'all' ? selectedProperty : undefined}
              loading={reviewsLoading}
            />
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
} 