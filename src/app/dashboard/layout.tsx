import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Property Management Dashboard | Flex Living',
  description: 'Manage your short-term rental properties, guest reviews, and property performance.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Suspense fallback={<div>Loading dashboard...</div>}>
        {children}
      </Suspense>
    </div>
  );
} 