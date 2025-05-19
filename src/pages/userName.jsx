import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedUserId = localStorage.getItem('userId');

    if (!token) {
      navigate('/login');
      return;
    }

    setPhoneNumber(storedPhoneNumber);
    setUserId(storedUserId);

    const checkUser = async () => {
      try {
        const res = await axios.get('https://dikshaenterprisesbackend.onrender.com/api/users/get-user', {
          params: { userId: storedUserId }
        });
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('referralCode', res.data.referralCode);
        navigate('/');
        window.location.reload();  // reload after navigation
      } catch (err) {
        setShowForm(true);
        setLoading(false);
      }
    };

    if (storedUserId) checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post('https://dikshaenterprisesbackend.onrender.com/api/users', {
        userId,
        name,
        phone: phoneNumber
      });
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('referralCode', res.data.referralCode);
      navigate('/');
      window.location.reload();  // reload after navigation
    } catch (err) {
      alert('Something went wrong while creating user.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  if (!showForm) {
    return null; // or some placeholder if needed
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              disabled
              className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 px-4 rounded transition ${
              submitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
