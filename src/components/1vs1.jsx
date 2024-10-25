import { useState, useEffect } from 'react';
import axios from 'axios';

const OneVsOne = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/profile/balance', {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBalance(response.data.balance);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error fetching balance';
      setError(errorMessage);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
    // Poll balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <div className="text-gray-600">Loading balance...</div>
      ) : error ? (
        <div className="text-red-500 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          <span className="text-gray-700">Balance: </span>
          <span className="font-bold text-green-600">${balance?.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default OneVsOne;