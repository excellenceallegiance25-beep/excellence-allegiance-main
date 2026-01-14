import React from 'react';

const PaymentDashboard = ({ invoices, payments }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPending = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalAmount = totalPending + totalOverdue + totalPaid;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Total Pending</p>
          <p className="text-3xl font-bold text-yellow-600">${totalPending}</p>
          <p className="text-xs text-gray-500 mt-2">{invoices.filter(i => i.status === 'pending').length} invoices</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Overdue</p>
          <p className="text-3xl font-bold text-red-600">${totalOverdue}</p>
          <p className="text-xs text-gray-500 mt-2">{invoices.filter(i => i.status === 'overdue').length} invoices</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Paid</p>
          <p className="text-3xl font-bold text-green-600">${totalPaid}</p>
          <p className="text-xs text-gray-500 mt-2">{invoices.filter(i => i.status === 'paid').length} invoices</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Total Amount</p>
          <p className="text-3xl font-bold text-blue-600">${totalAmount}</p>
          <p className="text-xs text-gray-500 mt-2">All invoices</p>
        </div>
      </div>

      {/* Recent Invoices & Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
          <div className="space-y-3">
            {invoices.slice(0, 3).map(invoice => (
              <div key={invoice.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{invoice.id}</p>
                  <p className="text-sm text-gray-500">{invoice.project}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${invoice.amount}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
          <div className="space-y-3">
            {payments.slice(0, 3).map(payment => (
              <div key={payment.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{payment.id}</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+${payment.amount}</p>
                  <span className="text-xs text-gray-500">{payment.method}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;
