import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user] = useState(localStorage.getItem("userId"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.post(
          "https://dikshaenterprisesbackend.onrender.com/api/get-applications",
          { userId: user }
        );
        setApplications(res.data.filteredApplications || []);
      } catch (err) {
        setError("Failed to fetch application details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchApplications();
    } else {
      setError("User ID not found.");
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-500 text-lg">Loading application details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          You haven't applied for any job yet.
        </h2>
        <p className="mb-8 text-gray-500 max-w-md">
          Explore our career opportunities and find the perfect role for you.
        </p>
        <button
          onClick={() => navigate("/career")}
          className="bg-[#ea5430] hover:bg-[#cc4625] text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Apply Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-6xl p-10">
        <h1 className="text-4xl font-extrabold text-[#ea5430] mb-6 text-center">
          🎉 Thank You!
        </h1>
        <p className="text-gray-600 text-center mb-10 text-lg">
          We've received your application. Your interview will take place between 5th June 2025 and 25th June 2025. You will be informed about the rest of the interview process by phone or email.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          📄 Your Submitted Applications
        </h2>

        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6"
            >
              {/* Applicant Photo */}
              <div className="flex-shrink-0">
                <img
                  src={app.photo}
                  alt={`${app.name}'s profile`}
                  className="w-40 h-40 object-cover rounded-xl border border-gray-300"
                />
              </div>

              {/* Applicant Info */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <span className="font-semibold text-gray-700">Name:</span> {app.name}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Email:</span> {app.email}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Mobile:</span> {app.mobile}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Category:</span>{" "}
                    <b>{app.category}</b>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold text-gray-700">Qualification:</span>{" "}
                    {app.qualification}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Experience:</span>{" "}
                    {app.experience} years
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Amount Paid:</span> ₹
                    {app.paidAmount}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Submitted At:</span>{" "}
                    {new Date(app.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
