import React from 'react';
import { FaGamepad, FaTrophy, FaShieldAlt, FaUsers } from 'react-icons/fa';

const SobreNosotros = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">About GameArena</h1>
          <p className="text-xl text-gray-300">Your Premier Gaming Competition Platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<FaGamepad />}
            title="Competitive Gaming"
            description="Join intense 1v1 matches and prove your skills"
          />
          <FeatureCard
            icon={<FaTrophy />}
            title="Regular Tournaments"
            description="Participate in daily and weekly tournaments"
          />
          <FeatureCard
            icon={<FaShieldAlt />}
            title="Secure Platform"
            description="Safe and transparent gaming environment"
          />
          <FeatureCard
            icon={<FaUsers />}
            title="Growing Community"
            description="Join thousands of active gamers"
          />
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            At GameArena, we're dedicated to creating the ultimate competitive gaming platform
            where players can showcase their skills, compete for prizes, and become part of
            a thriving gaming community. Our platform is built on the principles of fair play,
            transparency, and continuous innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Choose Us</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                Fair and competitive matchmaking
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                Secure payment processing
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                24/7 customer support
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                Regular tournaments and events
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <div className="space-y-4 text-gray-300">
              <p>Have questions or feedback? We'd love to hear from you!</p>
              <div>
                <strong className="block text-white">Email:</strong>
                <a href="mailto:support@gamearena.com" className="text-blue-400 hover:text-blue-300">
                  support@gamearena.com
                </a>
              </div>
              <div>
                <strong className="block text-white">Discord:</strong>
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Join our Discord community
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="text-blue-500 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default SobreNosotros;