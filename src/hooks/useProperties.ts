import { useState, useEffect, useCallback } from 'react';
import { Property } from '@/types/reviews';
import { PropertyService } from '@/services/propertyService';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Load properties on mount
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await PropertyService.getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Get selected property data
  const selectedPropertyData = properties.find(p => p.id === selectedProperty);

  // Get aggregated stats for all properties
  const allPropertiesStats = PropertyService.calculateAggregatedStats(properties);

  // Change selected property
  const changeProperty = useCallback((propertyId: string) => {
    setSelectedProperty(propertyId);
  }, []);

  // Get reviews for selected property
  const getSelectedPropertyReviews = useCallback(() => {
    if (selectedProperty === 'all') {
      return properties.flatMap(p => p.reviews);
    }
    return selectedPropertyData?.reviews || [];
  }, [selectedProperty, selectedPropertyData, properties]);

  return {
    properties,
    selectedProperty,
    selectedPropertyData,
    allPropertiesStats,
    loading,
    changeProperty,
    getSelectedPropertyReviews
  };
}; 