import React, { useState } from 'react';
import { Info, HelpCircle } from 'lucide-react';

export function InterestRate() {
  const [formData, setFormData] = useState({
    loanAmount: '',
    loanTenure: '',
    creditScore: ''
  });

  const [results, setResults] = useState<Array<{
    bankName: string;
    interestRate: number;
    monthlyPayment: number;
    totalPayment: number;
  }> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setResults([
        {
          bankName: 'First National Bank',
          interestRate: 5.99,
          monthlyPayment: 1250,
          totalPayment: 150000
        },
        {
          bankName: 'City Trust',
          interestRate: 6.25,
          monthlyPayment: 1275,
          totalPayment: 153000
        },
        {
          bankName: 'Global Finance',
          interestRate: 6.49,
          monthlyPayment: 1290,
          totalPayment: 154800
        }
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Interest Rate Calculator</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
              <input
                type="number"
                required
                min="1000"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.loanAmount}
                onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Loan Tenure (months)</label>
              <input
                type="number"
                required
                min="12"
                max="360"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.loanTenure}
                onChange={(e) => setFormData({ ...formData, loanTenure: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Credit Score
                <span className="text-gray-500 text-xs ml-1"></span>
              </label>
              <input
                type="number"
                min="300"
                max="900"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.creditScore}
                onChange={(e) => setFormData({ ...formData, creditScore: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center bg-blue-50 p-4 rounded-md">
            <Info className="h-5 w-5 text-blue-400 mr-3" />
            <p className="text-sm text-blue-700">
              We compare interest rates from multiple banks to find you the best deal.
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate Rates
          </button>
        </form>

        {results && (
          <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Best Available Rates
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interest Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monthly Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((result, index) => (
                      <tr key={index} className={index === 0 ? 'bg-green-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {result.bankName}
                          {index === 0 && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Best Rate
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.interestRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${result.monthlyPayment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${result.totalPayment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}