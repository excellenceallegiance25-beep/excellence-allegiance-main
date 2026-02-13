import React from 'react';
import BkashPayment from './methods/Payment';
import StripePayment from './methods/StripePayment';
import PayPalPayment from './methods/PayPalPayment';
import NagadPayment from './methods/NagadPayment';
import RocketPayment from './methods/RocketPayment';
import BankTransfer from './methods/BankTransfer';
import CashOnDelivery from './methods/CashOnDelivery';

const PaymentModal = ({ method, amount, paymentData, onClose, onComplete }) => {
  const renderPaymentMethod = () => {
    switch (method) {
      case 'bkash':
        return <BkashPayment amount={amount} paymentData={paymentData} onComplete={onComplete} />;
      case 'stripe':
        return <StripePayment amount={amount} paymentData={paymentData} onComplete={onComplete} />;
      case 'paypal':
        return <PayPalPayment amount={amount} paymentData={paymentData} onComplete={onComplete} />;
      case 'nagad':
        return <NagadPayment amount={amount} paymentData={paymentData} onComplete={onComplete} />;
      case 'rocket':
        return <RocketPayment amount={amount} paymentData={paymentData} onComplete={onComplete} />;
      case 'bank':
        return <BankTransfer amount={amount} paymentData={paymentData} onComplete={onComplete} />;
      case 'cash':
        return <CashOnDelivery amount={amount} paymentData={paymentData} onComplete={onComplete} />;
      default:
        return <div>Select a payment method</div>;
    }
  };

  const getMethodName = (method) => {
    const names = {
      bkash: 'bKash',
      stripe: 'Credit/Debit Card',
      paypal: 'PayPal',
      nagad: 'Nagad',
      rocket: 'Rocket',
      bank: 'Bank Transfer',
      cash: 'Cash on Delivery'
    };
    return names[method] || method;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Pay with {getMethodName(method)}
            </h2>
            <p className="text-gray-600">Complete your payment securely</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        
        <div className="p-6">
          {renderPaymentMethod()}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;