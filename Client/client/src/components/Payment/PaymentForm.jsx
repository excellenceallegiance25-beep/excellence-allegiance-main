import React from 'react';

const PaymentForm = ({ amount = 0, onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, amount });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
        <input
          type="text"
          name="cardHolder"
          value={formData.cardHolder}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="4111 1111 1111 1111"
          maxLength="19"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123"
            maxLength="4"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
        <textarea
          name="billingAddress"
          value={formData.billingAddress}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Enter your billing address"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Processing...' : `Pay $${amount || 0}`}
      </button>
    </form>
  );
};

export default PaymentForm;
