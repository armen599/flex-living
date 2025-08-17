import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Details | Flex Living',
  description: 'Discover exceptional short-term rental properties managed by Flex Living.',
};

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="property-layout">
      {children}
    </div>
  );
} 