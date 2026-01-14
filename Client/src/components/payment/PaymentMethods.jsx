import React from 'react';

const PaymentMethods = ({ selectedMethod, onSelectMethod }) => {
  const paymentMethods = [
    {
      id: 'bkash',
      name: 'bKash',
      icon: '💳',
      description: 'Pay with bKash mobile banking',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: '📱',
      description: 'Pay with Nagad mobile banking',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'rocket',
      name: 'Rocket',
      icon: '🚀',
      description: 'Pay with DBBL Rocket',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      icon: '💳',
      description: 'Credit/Debit Card (International)',
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🌐',
      description: 'Pay with PayPal account',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Direct bank transfer',
      color: 'bg-gray-50 border-gray-200'
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      icon: '💰',
      description: 'Pay when you receive',
      color: 'bg-yellow-50 border-yellow-200'
    }
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Select Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => onSelectMethod(method.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedMethod === method.id
                ? `${method.color.replace('50', '100')} border-${method.color.split('-')[1]}-400`
                : `${method.color} hover:bg-white hover:shadow-md`
            }`}
          >
            <div className="flex items-center">
              <div className="text-2xl mr-3">{method.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{method.name}</h4>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method.id
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {selectedMethod === method.id && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;