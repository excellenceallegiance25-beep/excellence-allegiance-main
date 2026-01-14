import React, { useState } from 'react';
import PaymentDashboard from '../components/Payment/PaymentDashboard';
import PaymentForm from '../components/Payment/PaymentForm';
import PaymentMethods from '../components/Payment/PaymentMethods';
import InvoiceGenerator from '../components/Payment/InvoiceGenerator';
import TransactionHistory from '../components/Payment/TransactionHistory';
import Popup from '../components/Popup';

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ title: '', message: '', type: 'info' });
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices] = useState([
    { id: 'INV-001', project: 'Web Development', amount: 5000, status: 'pending', date: '2025-12-01', dueDate: '2025-12-15' },
    { id: 'INV-002', project: 'Mobile App', amount: 8000, status: 'overdue', date: '2025-11-15', dueDate: '2025-11-30' },
    { id: 'INV-003', project: 'UI/UX Design', amount: 3000, status: 'paid', date: '2025-11-01', dueDate: '2025-11-15' },
    { id: 'INV-004', project: 'Cloud Migration', amount: 12000, status: 'pending', date: '2025-12-02', dueDate: '2025-12-20' },
  ]);

  const [payments] = useState([
    { id: 'PAY-001', invoiceId: 'INV-003', amount: 3000, method: 'Credit Card', date: '2025-11-10', status: 'completed' },
    { id: 'PAY-002', invoiceId: 'INV-004', amount: 12000, method: 'Bank Transfer', date: '2025-12-02', status: 'pending' },
    { id: 'PAY-003', invoiceId: 'INV-001', amount: 5000, method: 'Digital Wallet', date: '2025-12-03', status: 'pending' },
  ]);

  const handlePaymentSubmit = (paymentData) => {
    setPopupData({
      title: 'Payment Successful',
      message: `Payment of $${paymentData.amount} has been processed successfully via ${selectedPaymentMethod}.`,
      type: 'success'
    });
    setShowPopup(true);
  };

  const handlePayInvoice = (invoiceId) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    setSelectedInvoice(invoice);
    setActiveTab('payment');
    setPopupData({
      title: 'Ready to Pay',
      message: `You are about to pay $${invoice.amount} for ${invoice.project}. Please select a payment method.`,
      type: 'info'
    });
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment & Invoices</h1>
          <p className="text-gray-600">Manage your payments, invoices, and transaction history</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-8 border border-gray-200">
          <div className="flex flex-wrap border-b border-gray-200">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'invoices'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📄 Invoices
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'payment'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💳 Make Payment
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 History
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'dashboard' && (
              <div>
                <PaymentDashboard invoices={invoices} payments={payments} />
              </div>
            )}

            {activeTab === 'invoices' && (
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900">All Invoices</h2>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Overdue</option>
                  </select>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Invoice ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Project</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Due Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(invoice => (
                        <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{invoice.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{invoice.project}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">${invoice.amount}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{invoice.dueDate}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                              invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm space-x-2">
                            {invoice.status !== 'paid' && (
                              <button
                                onClick={() => handlePayInvoice(invoice.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                              >
                                Pay Now
                              </button>
                            )}
                            <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900">Make a Payment</h2>
                
                {selectedInvoice && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Selected Invoice:</strong> {selectedInvoice.id} - {selectedInvoice.project} (${selectedInvoice.amount})
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                    <PaymentMethods
                      selectedMethod={selectedPaymentMethod}
                      onSelectMethod={setSelectedPaymentMethod}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h3>
                    <PaymentForm
                      amount={selectedInvoice?.amount || 0}
                      onSubmit={handlePaymentSubmit}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Transaction History</h2>
                <TransactionHistory transactions={payments} />
              </div>
            )}
          </div>
        </div>

        {selectedInvoice && activeTab === 'invoices' && (
          <div className="mt-8">
            <InvoiceGenerator
              invoice={selectedInvoice}
              onClose={() => setSelectedInvoice(null)}
            />
          </div>
        )}
      </div>

      {/* Popup Modal */}
      <Popup
        isOpen={showPopup}
        title={popupData.title}
        message={popupData.message}
        type={popupData.type}
        onConfirm={() => setShowPopup(false)}
        showCancel={false}
      />
    </div>
  );
};

export default PaymentPage;
