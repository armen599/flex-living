import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Short-Term Rentals & Property Management',
  description: 'Welcome to Flex Living - Your trusted partner for premium short-term rentals and professional property management services.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to{' '}
            <span className="text-blue-600">Flex Living</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Premium short-term rentals and professional property management services
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Access Dashboard
          </Link>
          
          <div className="block mt-4">
            <Link
              href="/property/shoreditch-heights"
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              View Property Page
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Management</h3>
            <p className="text-gray-600">Professional management of your short-term rental properties</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest Reviews</h3>
            <p className="text-gray-600">Comprehensive review management and guest feedback system</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Service</h3>
            <p className="text-gray-600">Exceptional hospitality and guest experience management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
