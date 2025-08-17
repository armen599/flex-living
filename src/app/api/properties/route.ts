import { NextRequest, NextResponse } from 'next/server';
import { PropertyService } from '@/services/propertyService';
import { ApiResponse } from '@/types/reviews';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('id');
    
    if (propertyId) {
      // Return specific property
      const property = await PropertyService.getPropertyById(propertyId);
      if (!property) {
        return NextResponse.json(
          { error: 'Property not found' },
          { status: 404 }
        );
      }
      
      const response: ApiResponse<typeof property> = {
        status: 'success',
        data: property
      };
      
      return NextResponse.json(response);
    }
    
    // Return all properties
    const properties = await PropertyService.getAllProperties();
    const response: ApiResponse<{
      properties: typeof properties;
      total: number;
    }> = {
      status: 'success',
      data: {
        properties,
        total: properties.length
      }
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 