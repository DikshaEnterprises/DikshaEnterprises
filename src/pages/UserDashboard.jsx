import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [showModal, setShowModal] = useState(false); // Minimum claim modal
  const [showClaimModal, setShowClaimModal] = useState(false); // Claim form modal
  const minClaim = 200;

  // Claim form fields
  const [accNumber, setAccNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');

    const ph = localStorage.getItem('phoneNumber') || '';
    const uid = localStorage.getItem('userId') || '';
    const nm = localStorage.getItem('name') || '';
    const rCode = localStorage.getItem('referralCode') || '';

    setPhoneNumber(ph);
    setUserId(uid);
    setName(nm);
    setReferralCode(rCode);

    if (rCode) {
      axios
        .get(`http://dikshabackend-env.eba-wxn4iyrj.ap-south-1.elasticbeanstalk.com/api/referral-earnings/${rCode}`)
        .then((res) => {
          setTotalEarnings(res.data.commission);
          setReferralCount(res.data.count);
          fetchReferralDataByCode();
        })
        .catch((err) => {
          console.error('Error fetching referral data:', err);
        });
    } else {
      fetchReferralDataByCode();
    }
  }, [navigate]);

  const fetchReferralDataByCode = async () => {
    try {
      const response = await axios.post('http://dikshabackend-env.eba-wxn4iyrj.ap-south-1.elasticbeanstalk.com/api/referrals/get', {
        referralCode: localStorage.getItem('referralCode'),
      });
      setTransaction(response.data.referral.transactions || []);
    } catch (error) {
      console.error('Error fetching referral data:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral Code Copied!');
  };

  const handleClaim = () => {
    if (totalEarnings < minClaim) {
      setShowModal(true);
    } else {
      setShowClaimModal(true);
    }
  };

  const submitClaim = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        payableAmount: totalEarnings,
        referralCode,
        accNumber,
        ifscCode,
        bankName,
        mobileNumber,
        activeStatus: 'active',
      };

      await axios.post('http://dikshabackend-env.eba-wxn4iyrj.ap-south-1.elasticbeanstalk.com/api/referrals/claim', payload);

      alert('Claim submitted successfully!');
      setShowClaimModal(false);

      // Clear form fields
      setAccNumber('');
      setIfscCode('');
      setBankName('');
      setMobileNumber('');
      fetchReferralDataByCode(); // Refresh transactions to update status
    } catch (error) {
      alert('Failed to submit claim. Please try again.');
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-red-600 bg-red-100';
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'hold':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Check if any transaction is active
  const hasActiveClaim = transaction.some(t => t.activeStatus.toLowerCase() === 'active');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full bg-white shadow-md rounded-lg p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#ea5430]">Earning Dashboard</h1>
          <button
            onClick={() => navigate('/application')}
            className="bg-[#ea5430] text-white px-4 py-2 rounded hover:opacity-90"
          >
            Your Application
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-gray-50 rounded shadow">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium">{name}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg font-medium">{phoneNumber}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow">
            <p className="text-sm text-gray-500">User ID</p>
            <p className="text-lg font-medium">{userId}</p>
          </div>
        </div>

        <div className="p-6 bg-[#fff5f3] border border-[#ea5430] rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold text-[#ea5430]">Your Referral Code:</p>
            <button
              onClick={handleCopy}
              className="px-4 py-1 bg-[#ea5430] text-white text-sm rounded hover:opacity-90"
            >
              Copy
            </button>
          </div>
          <p className="text-xl font-bold tracking-widest text-[#ea5430]">{referralCode}</p>
        </div>

        <div className="bg-[#fff0eb] border-l-4 border-[#ea5430] p-4 rounded mb-6">
          <h2 className="font-semibold text-[#ea5430] mb-1">Earn 15% of Application Fees!</h2>
          <p className="text-sm text-gray-700">
            Share your referral code with friends. When someone applies using your code, you’ll earn
            <strong> 30% of their application fee</strong> instantly. It’s a great way to support your
            friends while earning real rewards. No limits, no delays — just refer and earn!
          </p>
        </div>

        <div className="p-6 bg-gray-50 border rounded shadow mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Total Earnings</h3>
          <div className="text-4xl font-bold text-[#ea5430] mb-2">₹{totalEarnings}</div>

          <button
            onClick={handleClaim}
            disabled={hasActiveClaim || totalEarnings < minClaim}
            className={`px-6 py-2 rounded text-white
              ${hasActiveClaim || totalEarnings < minClaim
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#ea5430] hover:opacity-90'}`}
            title={
              hasActiveClaim
                ? 'You can only claim one at a time. Please wait for previous claim to clear.'
                : totalEarnings < minClaim
                ? `Minimum claim amount is ₹${minClaim}`
                : ''
            }
          >
            Claim Now
          </button>
        </div>
        {(hasActiveClaim || totalEarnings < minClaim) && (
  <p className="text-sm text-red-600 mt-1">
    {hasActiveClaim
      ? 'You can only claim one at a time. You will be able to claim again once the previous is cleared (usually within 24 to 48 hrs).'
      : `Minimum claim amount is ₹${minClaim}`}
  </p>
)}
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-[#ea5430] text-white text-left">
              <th className="px-4 py-2">Amount (₹)</th>
              <th className="px-4 py-2">Account Number</th>
              <th className="px-4 py-2">IFSC Code</th>
              <th className="px-4 py-2">Bank Name</th>
              <th className="px-4 py-2">Mobile Number</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map(({ _id, amount, accNumber, ifscCode, bankName, mobileNumber, date, activeStatus }) => (
              <tr key={_id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{amount}</td>
                <td className="px-4 py-2">{accNumber}</td>
                <td className="px-4 py-2">{ifscCode}</td>
                <td className="px-4 py-2">{bankName}</td>
                <td className="px-4 py-2">{mobileNumber}</td>
                <td className="px-4 py-2">{new Date(date).toLocaleDateString()}</td>
                <td className={`px-4 py-2 font-semibold rounded ${getStatusColor(activeStatus)}`}>
                  {activeStatus}
                </td>
              </tr>
            ))}
            {transaction.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Minimum Claim Amount Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4 text-[#ea5430]">Minimum Claim Amount</h3>
            <p className="mb-6">You must have at least ₹{minClaim} in your earnings to claim.</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-[#ea5430] text-white rounded hover:opacity-90"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Claim Now Form Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto p-4">
          <form
            onSubmit={submitClaim}
            className="bg-white rounded p-6 max-w-md w-full shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[#ea5430] mb-4">Claim Your Earnings</h2>

            <label className="block mb-2 font-medium">Account Number</label>
            <input
              type="text"
              value={accNumber}
              onChange={(e) => setAccNumber(e.target.value)}
              required
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-medium">IFSC Code</label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              required
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-medium">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-medium">Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              pattern="[0-9]{10}"
              className="w-full p-2 border rounded mb-6"
            />

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowClaimModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#ea5430] text-white rounded hover:opacity-90"
              >
                Submit Claim
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
