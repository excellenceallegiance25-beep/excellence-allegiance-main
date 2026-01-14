// src/pages/dashboard/EmployeePayroll.jsx
import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  DollarSign,
  FileText,
  Download,
  TrendingUp,
  Calendar,
  X,
  Printer,
  Mail,
  CheckCircle,
  AlertCircle,
  Users,
  Percent,
  CreditCard,
  Building,
  User,
} from "lucide-react";

const EmployeePayroll = () => {
  const [showReport, setShowReport] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("January 2024");

  const payrollHistory = [
    {
      month: "January 2024",
      amount: "$4,500",
      netAmount: "$4,050",
      status: "Paid",
      date: "Jan 31, 2024",
      payslip: true,
      workingDays: 22,
      leaves: 2,
      overtime: 12,
      bonus: 450,
      tax: 450,
    },
    {
      month: "December 2023",
      amount: "$4,500",
      netAmount: "$4,050",
      status: "Paid",
      date: "Dec 31, 2023",
      payslip: true,
      workingDays: 20,
      leaves: 3,
      overtime: 8,
      bonus: 400,
      tax: 450,
    },
    {
      month: "November 2023",
      amount: "$4,500",
      netAmount: "$4,050",
      status: "Paid",
      date: "Nov 30, 2023",
      payslip: true,
      workingDays: 22,
      leaves: 1,
      overtime: 10,
      bonus: 500,
      tax: 450,
    },
    {
      month: "October 2023",
      amount: "$4,200",
      netAmount: "$3,780",
      status: "Paid",
      date: "Oct 31, 2023",
      payslip: true,
      workingDays: 22,
      leaves: 2,
      overtime: 5,
      bonus: 200,
      tax: 420,
    },
    {
      month: "September 2023",
      amount: "$4,200",
      netAmount: "$3,780",
      status: "Paid",
      date: "Sep 30, 2023",
      payslip: true,
      workingDays: 21,
      leaves: 4,
      overtime: 6,
      bonus: 200,
      tax: 420,
    },
  ];

  const salaryBreakdown = [
    { component: "Basic Salary", amount: "$3,000", percentage: 63.16 },
    { component: "House Rent Allowance", amount: "$750", percentage: 15.79 },
    { component: "Travel Allowance", amount: "$300", percentage: 6.32 },
    { component: "Performance Bonus", amount: "$450", percentage: 9.47 },
    { component: "Overtime", amount: "$250", percentage: 5.26 },
  ];

  const selectedPayroll = payrollHistory.find(
    (item) => item.month === selectedMonth
  );

  const handleGenerateReport = () => {
    setShowReport(true);
  };

  const handleDownloadPDF = () => {
    alert("PDF download initiated!");
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleEmailReport = () => {
    alert("Report will be emailed to your registered email address.");
  };

  // Report Popup Component
  const ReportPopup = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Salary Report
              </h2>
              <p className="text-gray-600">
                Detailed breakdown for {selectedMonth}
              </p>
            </div>
            <button
              onClick={() => setShowReport(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Report Content */}
          <div className="p-8">
            {/* Company & Employee Info */}
            <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-200">
              <div>
                <div className="flex items-center mb-4">
                  <Building className="text-blue-600 mr-3" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Excellence Allegiance Ltd.
                    </h3>
                    <p className="text-gray-600">IT Solutions & Services</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>123 Corporate Tower, Dhaka 1212</p>
                  <p>Bangladesh</p>
                  <p>contact@excellence.com | +880 1234 567890</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end mb-4">
                  <User className="text-blue-600 mr-3" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      John Doe
                    </h3>
                    <p className="text-gray-600">Software Engineer</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Employee ID: ENG-5678</p>
                  <p>Department: Engineering</p>
                  <p>Join Date: January 15, 2023</p>
                </div>
              </div>
            </div>

            {/* Report Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <DollarSign className="text-blue-600 mr-2" size={20} />
                  <span className="text-blue-800 font-medium">
                    Gross Salary
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {selectedPayroll?.amount}
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <CreditCard className="text-green-600 mr-2" size={20} />
                  <span className="text-green-800 font-medium">Net Salary</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {selectedPayroll?.netAmount}
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <Calendar className="text-purple-600 mr-2" size={20} />
                  <span className="text-purple-800 font-medium">
                    Payment Date
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {selectedPayroll?.date}
                </p>
              </div>
            </div>

            {/* Salary Breakdown */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Percent className="mr-2 text-blue-600" size={24} />
                Salary Breakdown
              </h3>

              <div className="space-y-4">
                {salaryBreakdown.map((item) => (
                  <div key={item.component} className="flex items-center">
                    <div className="w-2/5">
                      <span className="text-gray-700">{item.component}</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-1/5 text-right">
                      <span className="font-semibold text-gray-900">
                        {item.amount}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total Gross Salary
                </span>
                <span className="text-2xl font-bold text-blue-600">$4,750</span>
              </div>
            </div>

            {/* Deductions & Net Pay */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="mr-2 text-red-600" size={24} />
                  Deductions
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-gray-700">Income Tax</span>
                    <span className="font-bold text-red-600">$475</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Provident Fund</span>
                    <span className="font-bold text-gray-700">$190</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Health Insurance</span>
                    <span className="font-bold text-gray-700">$50</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Deductions</span>
                      <span className="text-lg text-red-600">$715</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="mr-2 text-green-600" size={24} />
                  Net Salary Calculation
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Gross Salary</span>
                    <span className="font-bold text-gray-900">$4,750</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-gray-700">Total Deductions</span>
                    <span className="font-bold text-red-600">-$715</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-lg font-bold text-gray-900">
                        Net Payable Amount
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        $4,035
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance & Performance */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="mr-2 text-blue-600" size={24} />
                Attendance & Performance
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Working Days</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedPayroll?.workingDays}/22
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Leaves Taken</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedPayroll?.leaves}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Overtime Hours</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedPayroll?.overtime}h
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Performance Bonus</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${selectedPayroll?.bonus}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bank Name</p>
                  <p className="font-medium">Dhaka Bank Limited</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="font-medium">**** **** 1234</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {selectedPayroll?.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Transaction ID</p>
                  <p className="font-medium">TX-2024-01-123456</p>
                </div>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="mt-8 text-sm text-gray-500 text-center">
              <p>
                This is an electronically generated salary slip. No signature
                required.
              </p>
              <p className="mt-1">
                For any queries, contact HR department at hr@excellence.com
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6 flex justify-end space-x-4">
            <button
              onClick={handleEmailReport}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center transition-colors"
            >
              <Mail size={18} className="mr-2" />
              Email Report
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors"
            >
              <Download size={18} className="mr-2" />
              Download PDF
            </button>
            <button
              onClick={handlePrintReport}
              className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center transition-colors"
            >
              <Printer size={18} className="mr-2" />
              Print Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout role="employee">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payroll</h1>
        <p className="text-gray-600">
          View your salary details and payment history
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Payment History
              </h2>
              <button
                onClick={handleGenerateReport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors"
              >
                <FileText size={18} className="mr-2" />
                Generate Report
              </button>
            </div>

            <div className="space-y-4">
              {payrollHistory.map((item) => (
                <div
                  key={item.month}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedMonth(item.month);
                    setShowReport(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <DollarSign className="text-green-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.month}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">
                            Paid on: {item.date}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {item.amount}
                      </p>
                      <button className="mt-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 flex items-center">
                        <Download size={14} className="mr-1" />
                        Download Payslip
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Current Month</h3>
              <TrendingUp size={24} />
            </div>
            <div className="text-center mb-6">
              <p className="text-sm text-blue-200">Expected Salary</p>
              <p className="text-4xl font-bold mt-2">$4,750</p>
              <p className="text-sm text-blue-200 mt-2">
                Payment Date: Feb 29, 2024
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>Working Days</span>
                <span className="font-medium">22/22</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Leaves Taken</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Overtime Hours</span>
                <span className="font-medium">12h</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Salary Breakdown
            </h3>
            <div className="space-y-3">
              {salaryBreakdown.map((item) => (
                <div
                  key={item.component}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-600">{item.component}</span>
                  <span className="font-medium">{item.amount}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span className="text-lg">$4,750</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tax Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax Deducted</span>
                <span className="font-medium text-red-600">$475</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Net Salary</span>
                <span className="font-medium text-green-600">$4,275</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax Rate</span>
                <span className="font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showReport && <ReportPopup />}
    </DashboardLayout>
  );
};

export default EmployeePayroll;
