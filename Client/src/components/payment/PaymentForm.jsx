import React, { useState } from "react";
import PaymentMethods from "./PaymentMethods";
import PaymentModal from "./PaymentModal";
import paymentService from "../../services/paymentService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentForm = ({ amount, description, onSuccess, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setLoading(true);
    try {
      const paymentPayload = {
        amount,
        description,
        method: selectedMethod,
        ...paymentData,
        currency: "BDT",
      };

      const response = await paymentService.createPayment(paymentPayload);

      if (response.success) {
        setShowModal(true);
        toast.success("Payment initiated successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = (success, data) => {
    setShowModal(false);
    if (success && onSuccess) {
      onSuccess(data);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Complete Payment
      </h2>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Amount to pay</p>
            <p className="text-3xl font-bold text-blue-700">
              ৳{amount.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Description</p>
            <p className="font-medium">{description}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={paymentData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={paymentData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={paymentData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={paymentData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
            />
          </div>
        </div>

        <PaymentMethods
          selectedMethod={selectedMethod}
          onSelectMethod={setSelectedMethod}
        />

        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading || !selectedMethod}
            className={`px-8 py-3 rounded-md text-white font-medium ${
              loading || !selectedMethod
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } transition`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              `Pay 0${amount.toLocaleString()}`
            )}
          </button>
        </div>
      </form>

      {showModal && selectedMethod && (
        <PaymentModal
          method={selectedMethod}
          amount={amount}
          paymentData={paymentData}
          onClose={() => setShowModal(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default PaymentForm;
