import React, { useState } from 'react';
import axios from 'axios';
import { FaCreditCard, FaPaypal, FaBitcoin } from 'react-icons/fa';

const Depositos = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('/api/payments/deposit', {
        amount: parseFloat(amount),
        method: paymentMethod
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSuccess(true);
      setAmount('');
      setPaymentMethod('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing deposit');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: <FaCreditCard className="h-6 w-6" /> },
    { id: 'paypal', name: 'PayPal', icon: <FaPaypal className="h-6 w-6" /> },
    { id: 'crypto', name: 'Cryptocurrency', icon: <FaBitcoin className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Deposit Funds</h1>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-6">
            Deposit successful!
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Amount</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Payment Method</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-lg border ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                        : 'border-gray-600 hover:border-blue-500'
                    } transition duration-300`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-blue-400">{method.icon}</div>
                      <span className="text-white">{method.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !amount || !paymentMethod}
              className={`w-full py-3 rounded-md text-white font-semibold ${
                loading || !amount || !paymentMethod
                  ? 'bg-blue-600 opacity-50 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Processing...' : 'Deposit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Depositos;