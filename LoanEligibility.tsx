import React, { useState } from 'react';
import { LoanEligibilityForm, PredictionResult } from '../types';
import { checkLoanEligibility } from '../services/api';
import LoanCal from '../components/LoanCal';

const loanTypes = [
  { value: '', label: 'Select Loan Type' },
  { value: 'personal', label: 'Business Loan' },
  { value: 'education', label: 'Education Loan' },
  { value: 'home', label: 'Home Loan' },
  { value: 'vehicle', label: 'Vehicle Loan' }
];

export function LoanEligibility() {
  const [formData, setFormData] = useState<LoanEligibilityForm>({
    age: '',
    income: '',
    employmentStatus: '',
    loanAmount: '',
    loanTenure: '',
    creditScore: '',
    existingLiabilities: '',
    loanType: '', // <-- Add this line
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await checkLoanEligibility({
        age: parseFloat(formData.age),
        income: parseFloat(formData.income),
        employmentStatus: formData.employmentStatus,
        loanAmount: parseFloat(formData.loanAmount),
        loanTenure: parseFloat(formData.loanTenure),
        creditScore: formData.creditScore ? parseFloat(formData.creditScore) : 0,
        existingLiabilities: parseFloat(formData.existingLiabilities),
        loanType: formData.loanType // <-- Add this line
      });

      if (!response) {
        throw new Error('Invalid response from server');
      }

      setResult({
        isEligible: response.isEligible,
        confidence: response.confidence,
        message: response.message || 'No detailed explanation available',
        suggestedAmount: response.suggestedAmount,
        bankOffers: response.bankOffers || [], // <-- Add this line
      });
    } catch (err) {
      console.error('Error details:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to connect to the server. Please check if the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Loan Eligibility Check</h1>
      
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
              min="18"
              max="80"
            />
          </div>
          
          <div>
            <label className="block mb-1">Monthly Income (₹)</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block mb-1">Employment Status</label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self Employed</option>
              <option value="business">Business</option>
              <option value="retired">Retired</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Loan Amount (₹)</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block mb-1">Loan Tenure (months)</label>
            <input
              type="number"
              name="loanTenure"
              value={formData.loanTenure}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
              min="6"
              max="360"
            />
          </div>

          <div>
            <label className="block mb-1">Credit Score</label>
            <input
              type="number"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="300"
              max="900"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Leave empty if unknown</p>
          </div>

          <div>
            <label className="block mb-1">Existing Monthly Liabilities (₹)</label>
            <input
              type="number"
              name="existingLiabilities"
              value={formData.existingLiabilities}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
              min="0"
            />
            <p className="text-sm text-gray-500 mt-1">Include EMIs, credit card bills, etc.</p>
          </div>

          <div>
            <label className="block mb-1">Loan Type</label>
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              {loanTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-blue-300 mt-6"
          >
            {loading ? 'Checking Eligibility...' : 'Check Eligibility'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <>
          <LoanCal
            amount={Number(formData.loanAmount)}
            creditScore={Number(formData.creditScore)}
            loanType={formData.loanType}
          />
          <div className="mt-6 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Eligibility Result</h2>
            <div className={`text-lg font-semibold ${result.isEligible ? 'text-green-600' : 'text-red-600'}`}>
              {result.isEligible ? '✓ Eligible for Loan' : '✗ Not Eligible for Loan'}
            </div>
            {result.confidence > 0 && (
              <div className="mt-2">
                <span className="font-medium">Confidence Score:</span>{' '}
                <span className={result.confidence > 70 ? 'text-green-600' : 'text-yellow-600'}>
                  {result.confidence.toFixed(1)}%
                </span>
              </div>
            )}
            <div className="mt-2 text-gray-700 whitespace-pre-line">{result.message}</div>
            {!result.isEligible && result.suggestedAmount && (
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <span className="font-medium">Suggested Loan Amount: </span>
                ₹{result.suggestedAmount.toLocaleString()}
              </div>
            )}
            {result.bankOffers && result.bankOffers.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-2">Top Indian Bank Offers</h3>
                <table className="min-w-full bg-white border rounded">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Bank</th>
                      <th className="border px-2 py-1">Interest Rate (%)</th>
                      <th className="border px-2 py-1">Min Income (₹)</th>
                      <th className="border px-2 py-1">Min Credit Score</th>
                      <th className="border px-2 py-1">Max Loan (₹)</th>
                      <th className="border px-2 py-1">Processing Fee</th>
                      <th className="border px-2 py-1">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.bankOffers.map((bank) => (
                      <tr key={bank.bank_name}>
                        <td className="border px-2 py-1">{bank.bank_name}</td>
                        <td className="border px-2 py-1">{bank.interest_rate}</td>
                        <td className="border px-2 py-1">{bank.min_income}</td>
                        <td className="border px-2 py-1">{bank.min_credit_score}</td>
                        <td className="border px-2 py-1">{bank.max_loan_amount || '-'}</td>
                        <td className="border px-2 py-1">{bank.processing_fee}</td>
                        <td className="border px-2 py-1">{bank.special_note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}