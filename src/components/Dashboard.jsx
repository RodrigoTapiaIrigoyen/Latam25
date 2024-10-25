import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaGamepad, FaTrophy, FaWallet, FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">{userData?.username}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <DashboardCard
            icon={<FaGamepad className="h-8 w-8" />}
            title="1v1 Matches"
            value={userData?.matches || 0}
            link="/1vs1"
          />
          <DashboardCard
            icon={<FaTrophy className="h-8 w-8" />}
            title="Tournaments"
            value={userData?.tournaments || 0}
            link="/torneos"
          />
          <DashboardCard
            icon={<FaWallet className="h-8 w-8" />}
            title="Balance"
            value={`$${userData?.balance || 0}`}
            link="/depositos"
          />
          <DashboardCard
            icon={<FaUser className="h-8 w-8" />}
            title="Profile"
            value={userData?.status || 'Active'}
            link="/profile"
          />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            {userData?.recentActivity?.length > 0 ? (
              <div className="space-y-4">
                {userData.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-700 pb-4"
                  >
                    <div className="text-white">{activity.description}</div>
                    <div className="text-gray-400">{activity.date}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400 text-center">No recent activity</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const DashboardCard = ({ icon, title, value, link }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300">
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-3xl font-bold text-blue-400">{value}</p>
      </div>
    </Link>
  );
};

export default Dashboard;