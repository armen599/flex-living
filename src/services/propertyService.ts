import { Property } from '@/types/reviews';
import { mockProperties } from '@/data/mockReviews';

export class PropertyService {
  /**
   * Get all properties
   */
  static async getAllProperties(): Promise<Property[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockProperties;
  }

  /**
   * Get property by ID
   */
  static async getPropertyById(id: string): Promise<Property | null> {
    const properties = await this.getAllProperties();
    return properties.find(p => p.id === id) || null;
  }

  /**
   * Get public reviews for a property
   */
  static getPublicReviews(property: Property) {
    return property.reviews.filter(review => review.isPublic);
  }

  /**
   * Calculate aggregated stats for multiple properties
   */
  static calculateAggregatedStats(properties: Property[]) {
    if (properties.length === 0) {
      return { totalReviews: 0, averageRating: 0, totalProperties: 0 };
    }

    const totalReviews = properties.reduce((sum, p) => sum + p.reviewStats.totalReviews, 0);
    const averageRating = properties.reduce((sum, p) => sum + p.reviewStats.averageRating, 0) / properties.length;
    const totalPublicReviews = properties.reduce((sum, p) => sum + p.reviews.filter(r => r.isPublic).length, 0);

    return {
      totalReviews,
      averageRating,
      totalProperties: properties.length,
      totalPublicReviews
    };
  }
} 