import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrophy, FaUsers, FaCalendar, FaCoins } from 'react-icons/fa';

const Torneos = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('/api/tournaments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTournaments(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching tournaments');
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading tournaments...</div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Tournaments</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TournamentCard = ({ tournament }) => {
  const handleJoin = async () => {
    try {
      await axios.post(`/api/tournaments/${tournament.id}/join`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Handle successful join
    } catch (error) {
      // Handle error
      console.error('Error joining tournament:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FaTrophy className="text-yellow-500 h-6 w-6 mr-2" />
          <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-300">
            <FaUsers className="h-5 w-5 mr-2" />
            <span>{tournament.participants}/{tournament.maxParticipants} Players</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FaCalendar className="h-5 w-5 mr-2" />
            <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FaCoins className="h-5 w-5 mr-2" />
            <span>Prize Pool: ${tournament.prizePool}</span>
          </div>
        </div>

        <button
          onClick={handleJoin}
          disabled={tournament.participants >= tournament.maxParticipants}
          className={`w-full py-2 px-4 rounded-md font-semibold ${
            tournament.participants >= tournament.maxParticipants
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition duration-300`}
        >
          {tournament.participants >= tournament.maxParticipants ? 'Full' : 'Join Tournament'}
        </button>
      </div>
    </div>
  );
};

export default Torneos;