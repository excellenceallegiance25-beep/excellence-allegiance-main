import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import paymentService from '../../../services/paymentService';
import { toast } from 'react-toastify';

const stripePromise = loadStripe('your_publishable_key_here');

const StripeCheckoutForm = ({ amount, paymentData, onComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Create payment intent
      const response = await paymentService.createStripePayment(amount * 100); // Convert to cents
      
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        response.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: paymentData.name,
              email: paymentData.email,
              phone: paymentData.phone,
              address: {
                line1: paymentData.address
              }
            },
          },
        }
      );

      if (error) {
        toast.error(error.message);
        onComplete(false, error);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        onComplete(true, paymentIntent);
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      onComplete(false, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Amount to pay</p>
        <p className="text-2xl font-bold">${(amount / 85).toFixed(2)} USD</p>
        <p className="text-sm text-gray-500">Approximately ৳{amount.toLocaleString()} BDT</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="p-4 border border-gray-300 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>💳 We accept Visa, MasterCard, American Express</p>
        <p>🔒 Your payment is secure and encrypted</p>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-lg font-semibold ${
          !stripe || loading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? 'Processing...' : `Pay $${(amount / 85).toFixed(2)}`}
      </button>
    </form>
  );
};

const StripePayment = ({ amount, paymentData, onComplete }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">S</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Credit/Debit Card</h3>
            <p className="text-gray-600">Secure payment via Stripe</p>
          </div>
        </div>
      </div>

      <Elements stripe={stripePromise}>
        <StripeCheckoutForm 
          amount={amount} 
          paymentData={paymentData}
          onComplete={onComplete}
        />
      </Elements>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="w-12 h-8 bg-blue-900 mx-auto mb-1"></div>
            <p className="text-xs">Visa</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-8 bg-red-600 mx-auto mb-1"></div>
            <p className="text-xs">MasterCard</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-8 bg-blue-400 mx-auto mb-1"></div>
            <p className="text-xs">Amex</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePayment;