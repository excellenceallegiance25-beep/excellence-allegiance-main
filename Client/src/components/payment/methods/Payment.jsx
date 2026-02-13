import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import paymentService from '../../../services/paymentService';
import { toast } from 'react-toastify';

const Payment = ({ amount, paymentData, onComplete }) => {
  const [step, setStep] = useState(1);
  const [Number, setNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');

  const generateQRCode = () => {
    const data = `:${Number}?amount=${amount}`;
    setQrCodeData(data);
    setStep(2);
  };

  const handlePayment = async () => {
    if (!transactionId) {
      toast.error('Please enter transaction ID');
      return;
    }

    setLoading(true);
    try {
      const response = await paymentService.createPayment({
        amount,
        phone: Number,
        transactionId,
        ...paymentData
      });
      

      if (response.success) {
        toast.success('Payment verified successfully!');
        onComplete(true, response.data);
      }
    } catch (error) {
      toast.error(error.message || 'Payment verification failed');
      onComplete(false, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold"></span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800"> Payment</h3>
            <p className="text-gray-600">Complete payment via </p>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <p className="text-purple-800 font-semibold mb-2">Payment Amount: {amount.toLocaleString()}</p>
          <p className="text-gray-700">Send money to: <strong>017XXXXXXXX</strong></p>
        </div>
      </div>

      {step === 1 && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your  Number
            </label>
            <input
              type="tel"
              value={Number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              We'll send payment instructions to this number
            </p>
          </div>

          <button
            onClick={generateQRCode}
            disabled={!Number || Number.length !== 11}
            className={`w-full py-3 rounded-lg font-semibold ${
              !Number || Number.length !== 11
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            Generate Payment QR Code
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold mb-3">Scan QR Code to Pay</h4>
            <div className="flex justify-center">
              <div className="p-4 bg-white border rounded-lg">
                <QRCodeSVG value={qrCodeData} size={200} />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Scan with  app or dial *247# to send money
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter  Transaction ID (TrxID)
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter Transaction ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              You'll find this in your  transaction history
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setStep(1)}
              className="py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              disabled={!transactionId || loading}
              className={`py-3 rounded-lg font-semibold ${
                !transactionId || loading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {loading ? 'Verifying...' : 'Verify Payment'}
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Payment Instructions:</h4>
        <ol className="list-decimal pl-5 text-sm text-yellow-700 space-y-1">
          <li>Dial *247# from your  registered number</li>
          <li>Choose "Send Money" option</li>
          <li>Enter merchant number: <strong>017XXXXXXXX</strong></li>
          <li>Enter amount: <strong>{amount}</strong></li>
          <li>Enter reference: <strong>ORDER123</strong></li>
          <li>Enter your PIN to confirm</li>
          <li>Save the Transaction ID (TrxID)</li>
        </ol>
      </div>
    </div>
  );
};

export default Payment;