import Link from 'next/link';
import { HomeIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface DashboardHeaderProps {
  selectedProperty?: string;
}

export default function DashboardHeader({ selectedProperty }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Flex Living</h1>
                <p className="text-xs text-gray-500">Reviews Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <ChartBarIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href={selectedProperty ? `/property/${selectedProperty}` : '/property/shoreditch-heights'}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <UserGroupIcon className="w-5 h-5" />
              <span>Property Page</span>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Property Manager</p>
              <p className="text-xs text-gray-500">Flex Living Team</p>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">PM</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 