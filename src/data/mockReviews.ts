import { Review, Property } from '@/types/reviews';

export const mockReviews: Review[] = [
  {
    id: 7453,
    type: 'host-to-guest',
    status: 'published',
    rating: 10,
    publicReview: "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'respect_house_rules', rating: 10 }
    ],
    submittedAt: '2020-08-21 22:45:14',
    guestName: 'Shane Finkelstein',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'hostaway',
    isApproved: true,
    isPublic: true
  },
  {
    id: 7454,
    type: 'guest-to-host',
    status: 'published',
    rating: 9,
    publicReview: "Amazing location and the apartment was spotless. Host was very responsive and helpful throughout our stay.",
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 }
    ],
    submittedAt: '2020-08-20 15:30:00',
    guestName: 'Emma Thompson',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'hostaway',
    isApproved: true,
    isPublic: true
  },
  {
    id: 7455,
    type: 'guest-to-host',
    status: 'published',
    rating: 8,
    publicReview: "Great place to stay in Shoreditch. The apartment was clean and well-equipped. Would recommend!",
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 8 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 7 }
    ],
    submittedAt: '2020-08-19 12:15:00',
    guestName: 'Michael Chen',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'hostaway',
    isApproved: true,
    isPublic: false
  },
  {
    id: 7456,
    type: 'guest-to-host',
    status: 'published',
    rating: 10,
    publicReview: "Perfect stay! The apartment exceeded our expectations. Clean, modern, and in the heart of everything.",
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 }
    ],
    submittedAt: '2020-08-18 09:45:00',
    guestName: 'Sarah Johnson',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'hostaway',
    isApproved: true,
    isPublic: true
  },
  {
    id: 7457,
    type: 'guest-to-host',
    status: 'published',
    rating: 7,
    publicReview: "Good location but the apartment could use some updates. Overall decent value for money.",
    reviewCategory: [
      { category: 'cleanliness', rating: 7 },
      { category: 'communication', rating: 8 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 6 }
    ],
    submittedAt: '2020-08-17 18:20:00',
    guestName: 'David Wilson',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'hostaway',
    isApproved: false,
    isPublic: false
  },
  {
    id: 7458,
    type: 'guest-to-host',
    status: 'published',
    rating: 9,
    publicReview: "Excellent apartment in a vibrant neighborhood. The host was very accommodating and the place was immaculate.",
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 8 }
    ],
    submittedAt: '2020-08-16 14:10:00',
    guestName: 'Lisa Rodriguez',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'hostaway',
    isApproved: true,
    isPublic: true
  },
  {
    id: 7459,
    type: 'guest-to-host',
    status: 'published',
    rating: 6,
    publicReview: "The location was good but there were some maintenance issues that weren't addressed during our stay.",
    reviewCategory: [
      { category: 'cleanliness', rating: 6 },
      { category: 'communication', rating: 5 },
      { category: 'location', rating: 8 },
      { category: 'value', rating: 5 }
    ],
    submittedAt: '2020-08-15 11:30:00',
    guestName: 'James Brown',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'hostaway',
    isApproved: false,
    isPublic: false
  },
  {
    id: 7460,
    type: 'guest-to-host',
    status: 'published',
    rating: 10,
    publicReview: "Absolutely perfect! This apartment has everything you need and the host is incredibly responsive.",
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 }
    ],
    submittedAt: '2020-08-14 16:45:00',
    guestName: 'Anna Smith',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'hostaway',
    isApproved: true,
    isPublic: true
  }
];

// Google Reviews for Canary Wharf property
export const canaryWharfGoogleReviews: Review[] = [
  {
    id: 20001,
    type: 'guest-to-host',
    status: 'published',
    rating: 10,
    publicReview: "Exceptional luxury apartment with stunning views of Canary Wharf. The service was impeccable and the location is perfect for business travelers.",
    reviewCategory: [
      { category: 'overall_experience', rating: 10 },
      { category: 'service_quality', rating: 10 },
      { category: 'value_for_money', rating: 9 }
    ],
    submittedAt: '2024-01-15 14:30:00',
    guestName: 'Jennifer Martinez',
    listingName: 'Canary Wharf Luxury 2BR',
    channel: 'google',
    isApproved: true,
    isPublic: true
  },
  {
    id: 20002,
    type: 'guest-to-host',
    status: 'published',
    rating: 9,
    publicReview: "Beautiful apartment with high-end finishes. Great location near the tube and shopping. Staff was very helpful and responsive.",
    reviewCategory: [
      { category: 'overall_experience', rating: 9 },
      { category: 'service_quality', rating: 9 },
      { category: 'value_for_money', rating: 8 }
    ],
    submittedAt: '2024-01-10 16:45:00',
    guestName: 'Robert Kim',
    listingName: 'Canary Wharf Luxury 2BR',
    channel: 'google',
    isApproved: true,
    isPublic: true
  },
  {
    id: 20003,
    type: 'guest-to-host',
    status: 'published',
    rating: 8,
    publicReview: "Very nice apartment in a great location. Clean and well-maintained. Would definitely stay here again.",
    reviewCategory: [
      { category: 'overall_experience', rating: 8 },
      { category: 'service_quality', rating: 8 },
      { category: 'value_for_money', rating: 7 }
    ],
    submittedAt: '2024-01-05 12:20:00',
    guestName: 'Amanda Foster',
    listingName: 'Canary Wharf Luxury 2BR',
    channel: 'google',
    isApproved: true,
    isPublic: true
  },
  {
    id: 20004,
    type: 'guest-to-host',
    status: 'published',
    rating: 10,
    publicReview: "Absolutely outstanding! This apartment exceeded all expectations. The views are breathtaking and the amenities are top-notch.",
    reviewCategory: [
      { category: 'overall_experience', rating: 10 },
      { category: 'service_quality', rating: 10 },
      { category: 'value_for_money', rating: 10 }
    ],
    submittedAt: '2024-01-01 10:15:00',
    guestName: 'Thomas Anderson',
    listingName: 'Canary Wharf Luxury 2BR',
    channel: 'google',
    isApproved: true,
    isPublic: true
  }
];

export const mockProperties: Property[] = [
  {
    id: 'shoreditch-heights',
    name: '2B N1 A - 29 Shoreditch Heights',
    address: '29 Shoreditch Heights, London E1 6JN',
    reviewStats: {
      totalReviews: 8,
      averageRating: 8.6,
      ratingDistribution: { 6: 1, 7: 1, 8: 1, 9: 2, 10: 3 },
      categoryAverages: {
        cleanliness: 8.9,
        communication: 8.6,
        location: 9.1,
        value: 7.5,
        respect_house_rules: 10
      },
      channelBreakdown: { hostaway: 8 },
      recentTrends: [
        { date: '2020-08-14', averageRating: 10, reviewCount: 1 },
        { date: '2020-08-15', averageRating: 6, reviewCount: 1 },
        { date: '2020-08-16', averageRating: 9, reviewCount: 1 },
        { date: '2020-08-17', averageRating: 7, reviewCount: 1 },
        { date: '2020-08-18', averageRating: 10, reviewCount: 1 },
        { date: '2020-08-19', averageRating: 8, reviewCount: 1 },
        { date: '2020-08-20', averageRating: 9, reviewCount: 1 },
        { date: '2020-08-21', averageRating: 10, reviewCount: 1 }
      ]
    },
    reviews: mockReviews
  },
  {
    id: 'canary-wharf-luxury',
    name: 'Canary Wharf Luxury 2BR',
    address: '45 Marsh Wall, London E14 9AF',
    reviewStats: {
      totalReviews: 16,
      averageRating: 9.2,
      ratingDistribution: { 7: 1, 8: 2, 9: 4, 10: 9 },
      categoryAverages: {
        cleanliness: 9.4,
        communication: 9.1,
        location: 9.6,
        value: 8.8
      },
      channelBreakdown: { hostaway: 8, google: 8 },
      recentTrends: [
        { date: '2024-01-01', averageRating: 10, reviewCount: 1 },
        { date: '2024-01-05', averageRating: 8, reviewCount: 1 },
        { date: '2024-01-10', averageRating: 9, reviewCount: 1 },
        { date: '2024-01-15', averageRating: 10, reviewCount: 1 }
      ]
    },
    reviews: [...mockReviews.slice(0, 4), ...canaryWharfGoogleReviews]
  },
  {
    id: 'camden-market-studio',
    name: 'Camden Market Studio',
    address: '12 Camden High Street, London NW1 0JH',
    reviewStats: {
      totalReviews: 6,
      averageRating: 7.8,
      ratingDistribution: { 6: 1, 7: 2, 8: 2, 9: 1 },
      categoryAverages: {
        cleanliness: 7.5,
        communication: 8.2,
        location: 8.8,
        value: 7.3
      },
      channelBreakdown: { hostaway: 4, airbnb: 2 },
      recentTrends: [
        { date: '2020-08-15', averageRating: 8, reviewCount: 1 },
        { date: '2020-08-17', averageRating: 7, reviewCount: 2 },
        { date: '2020-08-19', averageRating: 9, reviewCount: 1 },
        { date: '2020-08-21', averageRating: 7, reviewCount: 2 }
      ]
    },
    reviews: []
  }
]; 