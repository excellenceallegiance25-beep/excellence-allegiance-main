import React from 'react';

const Popup = ({ isOpen, title, message, type = 'info', onClose, onConfirm, showCancel = false, confirmText = 'OK', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          iconBg: 'bg-green-100',
          buttonColor: 'bg-green-600 hover:bg-green-700'
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          buttonColor: 'bg-red-600 hover:bg-red-700'
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          iconBg: 'bg-yellow-100',
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          iconBg: 'bg-blue-100',
          buttonColor: 'bg-blue-600 hover:bg-blue-700'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2m0-14a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${styles.bgColor} border ${styles.borderColor} rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-in`}>
        <div className="flex items-start">
          <div className={`${styles.iconBg} rounded-lg p-3 flex-shrink-0`}>
            <div className={styles.iconColor}>
              {getIcon()}
            </div>
          </div>
          <div className="ml-4 flex-1">
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            <p className={`text-sm ${title ? 'mt-2' : ''} text-gray-700`}>{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          {showCancel && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm || onClose}
            className={`px-4 py-2 rounded-lg text-white ${styles.buttonColor} transition-colors text-sm font-medium`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
