# Google Reviews Integration

## Overview

The Flex Living Reviews Dashboard now includes comprehensive integration with Google Reviews through the Google Places API. This allows property managers to fetch and display Google reviews alongside their existing Hostaway reviews, providing a complete view of guest feedback across multiple platforms. The integration is fully integrated with the property-based navigation system.

## Features

### 1. Real-time Google Reviews Fetching
- **API Integration**: Direct integration with Google Places API
- **Automatic Data Transformation**: Converts Google's 1-5 rating scale to our 1-10 scale
- **Category Mapping**: Maps Google reviews to relevant review categories
- **Fallback System**: Gracefully falls back to mock data when API is unavailable
- **Property-Aware**: Automatically adapts to selected property context

### 2. Smart Data Handling
- **Rating Conversion**: Google's 1-5 scale automatically converted to 1-10 scale
- **Category Standardization**: Reviews mapped to consistent categories:
  - `overall_experience`
  - `service_quality` 
  - `value_for_money`
- **Channel Identification**: Reviews clearly marked as coming from Google
- **Automatic Approval**: Google reviews are pre-approved and public by default
- **Duplicate Prevention**: Smart filtering prevents duplicate reviews across platforms

### 3. Dashboard Integration
- **Status Monitoring**: Real-time display of API configuration status
- **Manual Fetching**: Button to manually fetch latest Google reviews
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Last Fetch Tracking**: Timestamp of when reviews were last fetched
- **Property Navigation**: Direct links to public property pages
- **Context Awareness**: Adapts to selected property and shows relevant information

### 4. Navigation Integration
- **Property Page Links**: Easy navigation to public property pages
- **Dynamic Updates**: Links update automatically when property changes
- **Context Maintenance**: Maintains property context across navigation
- **Seamless Workflow**: Dashboard to public page navigation

## Technical Implementation

### Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Dashboard     │    │ GoogleReviews    │    │ Google Places   │
│   Component     │───▶│ Service          │───▶│ API             │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │ Mock Data        │
                       │ (Fallback)       │
                       └──────────────────┘
```

### Key Components

1. **GoogleReviewsService** (`src/services/googleReviewsService.ts`)
   - Core service for handling Google Reviews integration
   - Handles API calls, data transformation, and fallback logic
   - Manages configuration status and error handling
   - **Enhanced ID Management**: Prevents duplicate review IDs

2. **GoogleReviewsBackendService** (`src/services/googleReviewsBackendService.ts`)
   - Server-side service for Google Reviews operations
   - Handles request validation and error responses
   - Provides configuration status and monitoring
   - **Better Separation of Concerns**: Server-side logic separated from client

3. **useGoogleReviews Hook** (`src/hooks/useGoogleReviews.ts`)
   - Custom React hook for Google Reviews state management
   - Handles loading, error, and success states
   - Provides clean API for components
   - **Improved State Management**: Better error handling and user feedback

4. **GoogleReviewsIntegration Component** (`src/components/GoogleReviewsIntegration.tsx`)
   - UI component for managing Google Reviews integration
   - Displays API status and configuration information
   - Provides manual fetch functionality
   - **Property Navigation**: Includes links to public property pages
   - **Enhanced UX**: Better error handling and success messages

5. **API Endpoint** (`src/app/api/reviews/google/route.ts`)
   - RESTful endpoint for fetching Google reviews
   - Handles request validation and error responses
   - Returns standardized API response format
   - **Configuration Endpoint**: POST method for checking API status

### Data Flow

1. **User Action**: Manager clicks "Fetch Google Reviews" button
2. **Service Call**: Component calls `useGoogleReviews.fetchGoogleReviews()`
3. **API Check**: Service checks if Google Places API is configured
4. **Data Fetch**: If configured, fetches from Google API; otherwise uses mock data
5. **Transformation**: Raw Google data transformed to our Review format
6. **Duplicate Prevention**: Filters out existing reviews to prevent duplicates
7. **Integration**: New reviews added to existing review collection
8. **UI Update**: Dashboard displays updated review data
9. **Navigation**: Property page links update to reflect current context

## Configuration

### Environment Variables

```bash
# Required for real Google Reviews integration
GOOGLE_PLACES_API_KEY=your_actual_api_key_here

# Optional - defaults to Google's standard endpoint
GOOGLE_PLACES_BASE_URL=https://maps.googleapis.com/maps/api/place
```

### API Key Setup

1. **Google Cloud Console**: Visit [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable APIs**: Enable "Places API" and "Maps JavaScript API"
3. **Create Credentials**: Generate an API key with appropriate restrictions
4. **Set Restrictions**: Limit API key to your domain and specific APIs
5. **Environment Setup**: Add the key to your `.env.local` file

### Rate Limits

- **Free Tier**: 1,000 requests per day
- **Paid Tier**: $17 per 1,000 additional requests
- **Request Types**: Place Details API calls for reviews

## Usage Examples

### Basic Integration

```typescript
import { useGoogleReviews } from '@/hooks/useGoogleReviews';

// In your component
const { fetchGoogleReviews, loading, error, success } = useGoogleReviews();

const handleFetch = async () => {
  const reviews = await fetchGoogleReviews(placeId, propertyName, existingReviews);
  // Handle the new reviews
};
```

### Configuration Check

```typescript
// Check if Google Places API is configured
if (GoogleReviewsService.isConfigured()) {
  // Use real API
  const reviews = await GoogleReviewsService.fetchGoogleReviews(placeId);
} else {
  // Use mock data
  const reviews = GoogleReviewsService.getMockGoogleReviews(propertyName);
}
```

### Error Handling

```typescript
try {
  const reviews = await GoogleReviewsService.getGoogleReviews(placeId, propertyName);
  // Handle successful response
} catch (error) {
  console.error('Failed to fetch Google reviews:', error);
  // Handle error gracefully
}
```

## Mock Data

When the Google Places API is not configured, the system automatically falls back to realistic mock data:

- **4 Sample Reviews**: Covering different rating levels (3-5 stars)
- **Realistic Content**: Authentic-sounding review text and guest names
- **Proper Formatting**: Follows the same structure as real Google reviews
- **Date Generation**: Reviews dated within the last 6 months
- **Unique IDs**: Prevents conflicts with existing reviews

## Benefits

### For Property Managers
- **Comprehensive View**: See all reviews in one dashboard
- **Channel Comparison**: Compare performance across platforms
- **Data Enrichment**: Supplement Hostaway reviews with Google feedback
- **Guest Insights**: Better understanding of guest satisfaction
- **Easy Navigation**: Quick access to public property pages

### For Development
- **Graceful Degradation**: System works with or without API configuration
- **Easy Testing**: Mock data allows development without API keys
- **Scalable Architecture**: Easy to add more review sources
- **Consistent Data**: All reviews follow the same format
- **Navigation Integration**: Seamless integration with property-based navigation

## Recent Improvements

### 1. **Enhanced ID Management**
- **Centralized ID Utility**: `src/utils/idUtils.ts` for consistent ID generation
- **Duplicate Prevention**: Smart filtering prevents duplicate reviews
- **Conflict Resolution**: Automatic ID conflict resolution
- **Global Counter**: Ensures unique IDs across the application

### 2. **Better State Management**
- **Custom Hook**: `useGoogleReviews` for clean state management
- **Error Handling**: Comprehensive error handling with user feedback
- **Success Messages**: Clear feedback when reviews are fetched
- **State Reset**: Automatic state cleanup when property changes

### 3. **Navigation Integration**
- **Property Page Links**: Easy navigation to public property pages
- **Context Awareness**: Adapts to selected property
- **Dynamic Updates**: Links update automatically with property changes
- **Seamless Workflow**: Dashboard to public page navigation

### 4. **Service Layer Improvements**
- **Backend Service**: Separate server-side logic
- **Better Error Handling**: More informative error messages
- **Configuration Endpoints**: API status checking
- **Request Validation**: Better input validation

## Future Enhancements

### Planned Features
1. **Automatic Sync**: Scheduled background fetching of Google reviews
2. **Review Response**: Ability to respond to Google reviews
3. **Analytics Integration**: Google review metrics in dashboard analytics
4. **Multi-Platform**: Support for other review platforms (TripAdvisor, Booking.com)
5. **Real-time Updates**: WebSocket integration for live review updates

### Technical Improvements
1. **Caching**: Implement review caching to reduce API calls
2. **Webhook Support**: Real-time review updates via Google webhooks
3. **Bulk Operations**: Batch processing of multiple properties
4. **Advanced Filtering**: Filter Google reviews by rating, date, language
5. **Performance Optimization**: Lazy loading and virtual scrolling for large datasets

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify API key is correct and not expired
   - Check if Places API is enabled in Google Cloud Console
   - Ensure API key has proper restrictions and permissions

2. **Rate Limit Exceeded**
   - Monitor API usage in Google Cloud Console
   - Implement request caching if needed
   - Consider upgrading to paid tier for higher limits

3. **No Reviews Returned**
   - Verify the Place ID is correct
   - Check if the location has Google reviews
   - Ensure the API key has access to the specific location

4. **Duplicate Review IDs**
   - Check console logs for ID conflicts
   - Verify the ID utility is working correctly
   - Ensure reviews are being filtered properly

### Debug Information

The integration provides comprehensive logging:
- API configuration status
- Request/response details
- Error messages and fallback information
- Performance metrics and timing
- ID conflict resolution
- Duplicate prevention logs

## Security Considerations

1. **API Key Protection**: Never expose API keys in client-side code
2. **Request Validation**: All API requests are validated server-side
3. **Rate Limiting**: Implement appropriate rate limiting to prevent abuse
4. **Data Sanitization**: All review data is sanitized before display
5. **Environment Variables**: Secure configuration management

## Support

For technical support or questions about the Google Reviews integration:

1. **Documentation**: Check this file and the main README
2. **Code Comments**: Review inline documentation in service files
3. **Error Logs**: Check browser console and server logs for detailed error information
4. **API Status**: Verify Google Places API status at [Google Cloud Status](https://status.cloud.google.com/)
5. **Recent Changes**: Review the "Recent Improvements" section above

---

*This integration demonstrates the flexibility and extensibility of the Flex Living Reviews Dashboard architecture, allowing for easy addition of new review sources while maintaining data consistency and user experience. The integration is now fully integrated with the property-based navigation system, providing seamless workflow between dashboard management and public property page viewing.* 