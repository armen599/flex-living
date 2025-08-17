export const env = {
  HOSTAWAY: {
    ACCOUNT_ID: process.env.HOSTAWAY_ACCOUNT_ID || '61148',
    API_KEY: process.env.HOSTAWAY_API_KEY || 'f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152',
    BASE_URL: process.env.HOSTAWAY_BASE_URL || 'https://api.hostaway.com/v1'
  },
  GOOGLE: {
    PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY || '',
    PLACES_BASE_URL: 'https://maps.googleapis.com/maps/api/place'
  },
  APP: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  }
} as const; 