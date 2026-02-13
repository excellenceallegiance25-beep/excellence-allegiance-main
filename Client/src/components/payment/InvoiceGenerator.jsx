import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import { toast } from 'react-toastify';

const PaymentButton = ({ 
  amount, 
  description, 
  buttonText = "Make Payment",
  buttonClass = "bg-green-600 hover:bg-green-700",
  size = "md",
  icon = "💳"
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = (paymentData) => {
    toast.success(`Payment of ৳${amount} successful!`);
    setShowForm(false);
    // Redirect or update UI
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className={`${buttonClass} text-white font-medium rounded-lg transition flex items-center justify-center ${sizeClasses[size]}`}
      >
        <span className="mr-2">{icon}</span>
        {buttonText} - ৳{amount.toLocaleString()}
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowForm(false)}
                className="text-white text-2xl hover:text-gray-300"
              >
                &times;
              </button>
            </div>
            <PaymentForm
              amount={amount}
              description={description}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentButton;