import React from 'react';

const InvoiceGenerator = ({ invoice }) => {
  if (!invoice) return null;

  const handleDownload = () => {
    const element = document.getElementById('invoice-content');
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<pre>' + element.innerHTML + '</pre>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Invoice Preview</h2>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          📥 Download PDF
        </button>
      </div>

      <div id="invoice-content" className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
          <p className="text-gray-500">Invoice #{invoice.id}</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Bill From:</h3>
            <p className="text-gray-600">Excellence Allegiance</p>
            <p className="text-gray-600">Kolkata, India</p>
            <p className="text-gray-600">contact@excellence.com</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Invoice Date:</h3>
            <p className="text-gray-600">{invoice.issueDate}</p>
            <h3 className="font-semibold text-gray-900 mt-4 mb-2">Due Date:</h3>
            <p className="text-gray-600">{invoice.dueDate}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Invoice Details:</h3>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 text-gray-600">Project:</td>
                <td className="py-2 font-medium text-gray-900">{invoice.project}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 text-gray-600">Description:</td>
                <td className="py-2 font-medium text-gray-900">Professional IT Services</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-600">Amount:</td>
                <td className="py-2 font-bold text-lg text-gray-900">${invoice.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Status: <span className="font-semibold text-gray-900 capitalize">{invoice.status}</span></p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
