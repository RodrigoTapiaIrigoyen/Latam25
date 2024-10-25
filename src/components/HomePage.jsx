import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaTrophy, FaUserFriends, FaInfoCircle } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-white">GameArena</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
              <Link to="/registro" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Register</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to GameArena</h1>
          <p className="text-xl text-gray-300">Compete, Win, and Earn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaGamepad className="h-8 w-8" />}
            title="1v1 Matches"
            description="Challenge players in intense 1v1 battles"
            link="/1vs1"
          />
          <FeatureCard
            icon={<FaTrophy className="h-8 w-8" />}
            title="Tournaments"
            description="Join tournaments and win big prizes"
            link="/torneos"
          />
          <FeatureCard
            icon={<FaUserFriends className="h-8 w-8" />}
            title="Community"
            description="Connect with fellow gamers"
            link="/dashboard"
          />
          <FeatureCard
            icon={<FaInfoCircle className="h-8 w-8" />}
            title="About Us"
            description="Learn more about GameArena"
            link="/sobreNosotros"
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, link }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300">
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </Link>
  );
};

export default HomePage;