// src/pages/TestPage.jsx
import React, { useState } from "react";
import axios from "axios";

const TestPage = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://192.168.68.109:5000";
      const response = await axios.get(`${apiUrl}/api/test`);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(
        `Error: ${error.message}\n${JSON.stringify(
          error.response?.data,
          null,
          2
        )}`
      );
    } finally {
      setLoading(false);
    }
  };

  const testRegistration = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://192.168.68.109:5000";
      const response = await axios.post(
        `${apiUrl}/api/auth/register/employee`,
        {
          name: "Test User",
          email: "test@example.com",
          password: "123456",
        }
      );
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(
        `Error: ${error.message}\nStatus: ${
          error.response?.status
        }\nData: ${JSON.stringify(error.response?.data, null, 2)}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Backend Connection Test</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Environment Variables:</h2>
          <pre className="bg-gray-100 p-3 rounded text-sm">
            VITE_API_URL = '{import.meta.env.VITE_API_URL || "Not set"}'
          </pre>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={testBackend}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Test Backend Connection
          </button>

          <button
            onClick={testRegistration}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test Registration
          </button>
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Testing...</p>
          </div>
        )}

        {result && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {result}
            </pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2">Common Issues:</h3>
          <ul className="text-sm text-yellow-700 list-disc pl-5 space-y-1">
            <li>Backend server not running (port 5000)</li>
            <li>CORS issues</li>
            <li>Wrong API URL in .env file</li>
            <li>MongoDB not connected</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
