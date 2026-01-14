import React from 'react';

const PaymentMethods = ({ selectedMethod, onSelectMethod }) => {
  const methods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, Amex' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', description: 'Direct bank transfer' },
    { id: 'wallet', name: 'Digital Wallet', icon: '📱', description: 'PayPal, Google Pay' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿', description: 'Bitcoin, Ethereum' }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Select Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {methods.map(method => (
          <button
            key={method.id}
            onClick={() => onSelectMethod(method.id)}
            className={`p-4 border-2 rounded-lg transition-all ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">{method.icon}</div>
            <div className="text-left">
              <p className="font-medium text-gray-900">{method.name}</p>
              <p className="text-xs text-gray-500">{method.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
