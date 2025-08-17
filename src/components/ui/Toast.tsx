import { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
}

interface ToastProps {
  message: ToastMessage;
  onDismiss: (id: string) => void;
}

export default function Toast({ message, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(message.id), 300); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [message.id, onDismiss]);

  const iconMap = {
    success: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
    error: <XCircleIcon className="h-5 w-5 text-red-400" />,
    warning: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
  };

  const bgColorMap = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200'
  };

  const textColorMap = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800'
  };

  return (
    <div
      className={`${bgColorMap[message.type]} border ${textColorMap[message.type]} p-4 rounded-md shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-center space-x-3">
        {iconMap[message.type]}
        <p className="text-sm font-medium">{message.message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onDismiss(message.id), 300);
          }}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
} 