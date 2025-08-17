interface BadgeProps {
  children: React.ReactNode;
  variant?: 'status' | 'channel';
  type: string;
  className?: string;
}

export default function Badge({ children, variant = 'status', type, className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variantClasses = {
    status: {
      published: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      default: 'bg-gray-100 text-gray-800'
    },
    channel: {
      hostaway: 'bg-blue-100 text-blue-800',
      google: 'bg-red-100 text-red-800',
      airbnb: 'bg-pink-100 text-pink-800',
      vrbo: 'bg-purple-100 text-purple-800',
      default: 'bg-gray-100 text-gray-800'
    }
  };

  const classes = `${baseClasses} ${variantClasses[variant][type as keyof typeof variantClasses[typeof variant]] || variantClasses[variant].default} ${className}`;

  return <span className={classes}>{children}</span>;
} 