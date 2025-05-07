import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Shield, Clock, PieChart, ChevronRight, CheckCircle } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Smart Loan Decisions with
                <span className="block text-blue-200">ML-Powered Predictions</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100 leading-relaxed">
                Make confident financial choices with our advanced AI system that predicts loan eligibility 
                and finds you the best interest rates across multiple banks.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/eligibility')}
                  className="btn-primary flex items-center justify-center gap-2 text-lg"
                >
                  Check Loan Eligibility
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('/interest-rate')}
                  className="btn-secondary flex items-center justify-center gap-2 text-lg"
                >
                  Calculate Interest Rates
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-600">98%</div>
            <div className="text-gray-600 mt-1">Prediction Accuracy</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-600">50+</div>
            <div className="text-gray-600 mt-1">Partner Banks</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-600">2M+</div>
            <div className="text-gray-600 mt-1">Successful Predictions</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Why Choose FinPredict?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced algorithms provide accurate predictions to help you make better financial decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card">
            <div className="feature-icon inline-flex mb-6">
              <PieChart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI-Powered Predictions
            </h3>
            <p className="text-gray-600">
              Advanced machine learning algorithms provide highly accurate loan eligibility predictions 
              based on multiple factors.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon inline-flex mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Bank-Grade Security
            </h3>
            <p className="text-gray-600">
              Your data is protected with enterprise-level encryption and security measures that meet 
              financial industry standards.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon inline-flex mb-6">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Instant Results
            </h3>
            <p className="text-gray-600">
              Get real-time predictions and personalized interest rate calculations from multiple banks 
              in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Make Smarter Financial Decisions
              </h2>
              <div className="space-y-4">
                {[
                  'Compare interest rates from 50+ banks instantly',
                  'Get personalized loan recommendations',
                  'Understand your loan eligibility chances',
                  'Access detailed repayment schedules',
                  'Receive expert financial insights'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button
                  onClick={() => navigate('/eligibility')}
                  className="btn-primary"
                >
                  Get Started Now
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Financial Planning"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}