import React from 'react';

const TransactionHistory = ({ transactions }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method) => {
    const icons = {
      'Credit Card': '💳',
      'Bank Transfer': '🏦',
      'Digital Wallet': '📱',
      'Cryptocurrency': '₿'
    };
    return icons[method] || '💰';
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
      </div>
      
      {transactions.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No transactions yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{txn.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">${txn.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="mr-2">{getMethodIcon(txn.method)}</span>
                    {txn.method}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(txn.status)}`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
