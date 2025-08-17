import { ReactNode } from 'react';

interface ActionButtonProps {
  onClick: () => void;
  variant: 'approve' | 'reject' | 'publish' | 'unpublish';
  icon: ReactNode;
  title: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function ActionButton({ 
  onClick, 
  variant, 
  icon, 
  title, 
  className = '', 
  disabled = false,
  loading = false 
}: ActionButtonProps) {
  const variantClasses = {
    approve: 'text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500',
    reject: 'text-red-700 bg-red-100 hover:bg-red-200 focus:ring-green-500',
    publish: 'text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500',
    unpublish: 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500'
  };

  const baseClasses = 'inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  const classes = `${baseClasses} ${variantClasses[variant]} ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <button
      onClick={onClick}
      className={classes}
      title={title}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
    </button>
  );
} 