import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';


const jobRoles = {
  "Field Survey Executive": {
    location: "Bihar (Field Work)",
    work: "Booth level survey, voter data collection, and outreach.",
    salary: "₹13,000/month + Performance Incentives",
    tenure: "5–6 months",
    GeneralFee: 350,
    ReservationFee: 200
  },
  "Telecalling Executive": {
    location: "Work from Home",
    work: "Calling voters and data entry.",
    salary: "₹13,500/month + Incentives on Conversion",
    tenure: "5–6 months",
    GeneralFee: 350,
    ReservationFee: 200
  },
  "Social Media Manager": {
    location: "Bihar (Field/Studio Work)",
    work: "Managing outreach on Facebook, WhatsApp, Instagram.",
    salary: "₹18,000/month + Bonus",
    tenure: "5–6 months",
    GeneralFee: 400,
    ReservationFee: 300
  },
  "District Coordinator": {
    location: "Bihar (District-wise)",
    work: "Supervising teams, reporting progress, and area-level control.",
    salary: "₹22,500/month + Team Performance Incentives",
    tenure: "5–6 months",
    GeneralFee: 500,
    ReservationFee: 300
  },
  "Video Editor": {
    location: "Bihar (Field/Studio Work)",
    work: "Editing campaign videos, creating clips and ads.",
    salary: "₹18,000/month + Bonus",
    tenure: "5–6 months",
    GeneralFee: 400,
    ReservationFee: 300
  },
  "Supervisor": {
    location: "Bihar (Field/Studio Work)",
    work: "Field Supervision",
    salary: "₹20,000/month + Bonus",
    tenure: "5–6 months",
    GeneralFee: 500,
    ReservationFee: 300
  },
  "Media Anchor": {
    location: "Bihar (Field/Studio Work)",
    work: "Hosting live discussions, debates & social events.",
    salary: "₹20,000/month + On-Air Bonus",
    tenure: "5–6 months",
    GeneralFee: 500,
    ReservationFee: 300
  },
};

const ApplyNow = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const roleDetails = jobRoles[category] || {};
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [fee, setFee] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    mobile: localStorage.getItem('phoneNumber') || '',
    altMobile: '',
    email: '',
    dob: '',
    gender: '',
    address: '',
    district: '',
    state: '',
    category: '',
    qualification: '',
    experience: '',
    aadhar: '',
    hasReferral: 'no',
    referralCode: '',
    referralValid: false,
    agree: false,
    userId: localStorage.getItem('userId')
  });

  // Fee logic
  useEffect(() => {
    const cat = formData.category;
    if (cat === 'GEN') {
      setFee(roleDetails.GeneralFee || 0);
    } else if (cat) {
      setFee(roleDetails.ReservationFee || 0);
    } else {
      setFee(0);
    }
  }, [formData.category, roleDetails]);

  useEffect(() => {
    const entered = formData.referralCode.trim();
    const ownReferral = localStorage.getItem('referralCode');

    if (formData.hasReferral === 'yes') {
      if (!entered || entered === ownReferral) {
        setFormData(prev => ({ ...prev, referralValid: false }));
        if (entered === ownReferral) alert('You cannot use your own referral code.');
      } else {
        setFormData(prev => ({ ...prev, referralValid: true }));
      }
    } else {
      setFormData(prev => ({ ...prev, referralValid: false }));
    }
  }, [formData.referralCode, formData.hasReferral]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    setPhoneNumber(storedPhoneNumber);
    if (!token) navigate('/login');
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!formData.userId) return;

    const requiredFields = [
      'name', 'fatherName', 'mobile', 'email', 'dob', 'gender',
      'address', 'district', 'state', 'category', 'qualification', 'aadhar'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    if (!formData.agree) {
      alert("You must agree to the declaration.");
      return;
    }

    if (formData.hasReferral === 'yes' && !formData.referralValid) {
      alert("Invalid referral code.");
      return;
    }

    if (!imageFile) {
      alert("Please upload a photo.");
      return;
    }

    setLoading(true);

    // Step 1: Upload to Firebase
    const imageRef = ref(storage, `applicants/${Date.now()}_${imageFile.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImageURL(downloadURL);

      // Step 2: Load Razorpay SDK
      const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        alert('Failed to load Razorpay SDK');
        setLoading(false);
        return;
      }

      // Step 3: Create Order
      const { data } = await axios.post('https://www.dikshabackend.com/api/payment/create-order', { amount: fee });

      const options = {
        key: "rzp_test_IFv0P1wWi2CvpJ",
        currency: data.currency,
        amount: data.amount,
        order_id: data.orderId,
        name: 'Application Payment',
        description: 'Form Fee',
        handler: async (response) => {
          try {
            const verifyRes = await axios.post('https://www.dikshabackend.com/api/payment/verify-payment', {
              ...formData,
              category,
              photo: downloadURL,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              alert('Payment successful and form submitted!');
              navigate('/thank-you');
            } else {
              alert('Payment verification failed!');
            }
          } catch (err) {
            console.error(err);
            alert('Error while submitting form.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Image upload or payment initiation failed!');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-8">
      <div className="max-w-full mx-auto bg-white shadow-md p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-[#ea5430]">Apply for: {category}</h2>

        {roleDetails && (
          <div className="mb-6 p-4 border rounded bg-gray-50">
            <h3 className="text-xl font-semibold text-[#ea5430] mb-2">Job Details</h3>
            <p><strong>Location:</strong> {roleDetails.location}</p>
            <p><strong>Work:</strong> {roleDetails.work}</p>
            <p><strong>Salary:</strong> {roleDetails.salary}</p>
            <p><strong>Tenure:</strong> {roleDetails.tenure}</p>
            <p><strong>Application Fee(General):</strong> ₹{roleDetails.GeneralFee}</p>
            <p><strong>Application Fee(Category(SC/ST/OBC/EWS)):</strong> ₹{roleDetails.ReservationFee}</p>

          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applicant Photo <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className={`block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-[#ea5430] file:text-white
                hover:file:bg-[#d94525]
                focus:outline-none
    
              `}
            />
            {/* {errors.imageFile && <p className="text-red-600 text-xs mt-1">{errors.imageFile}</p>} */}
          </div>
          <input disabled value={category} className="form-field" placeholder="Post Applied For" />
          <input name="name" onChange={handleChange} placeholder="Candidate Name *" className="form-field" />
          <input name="fatherName" onChange={handleChange} placeholder="Father's Name *" className="form-field" />
          <input disabled value={phoneNumber} className="form-field" placeholder="Mobile Number" />
          <input name="altMobile" onChange={handleChange} placeholder="Secondary Mobile Number" className="form-field" />
          <input name="email" type="email" onChange={handleChange} placeholder="Email ID *" className="form-field" />
           <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth<span className="text-red-600">*</span>
            </label>
          <input name="dob" type="date" onChange={handleChange} className="form-field" />

          <div className="form-field">
            <label className="block font-medium mb-1">Gender:</label>
            <div className="flex gap-6">
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g} className="flex items-center gap-2">
                  <input type="radio" name="gender" value={g} onChange={handleChange} />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <textarea name="address" onChange={handleChange} placeholder="Full Address *" className="form-field" />
          <input name="district" onChange={handleChange} placeholder="District *" className="form-field" />
          <input name="state" onChange={handleChange} placeholder="State *" className="form-field" />

          <select name="category" onChange={handleChange} className="form-field">
            <option value="">Select Category *</option>
            {['GEN', 'OBC', 'SC', 'ST', 'EWS'].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <select name="qualification" onChange={handleChange} className="form-field">
            <option value="">Select Qualification *</option>

            <option value="Secondary">Secondary (10th Pass)</option>
            <option value="Higher Secondary">Higher Secondary (12th Pass)</option>
            <option value="Graduate">Graduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="PhD">PhD</option>
          </select>

          <input name="experience" onChange={handleChange} placeholder="Work Experience (optional)" className="form-field" />
          <input name="aadhar" onChange={handleChange} placeholder="Aadhar Number *" className="form-field" />

          <div className="form-field">
            <label className="block font-medium mb-1">Do you have a referral code?</label>
            <div className="flex gap-6">
              {['yes', 'no'].map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input type="radio" name="hasReferral" value={opt} checked={formData.hasReferral === opt} onChange={handleChange} />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {formData.hasReferral === 'yes' && (
            <input name="referralCode" placeholder="Referral Code" onChange={handleChange} className="form-field" />
          )}

          <div className="flex items-start gap-2">
            <input type="checkbox" id="agree" checked={formData.agree || false} onChange={(e) => setFormData(prev => ({ ...prev, agree: e.target.checked }))} className="mt-1" />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I hereby declare that the information provided is true and correct to the best of my knowledge.
            </label>
          </div>

          <button
            type="button"
            disabled={
              !formData.agree ||
              (formData.hasReferral === 'yes' && !formData.referralValid) ||
              loading
            }
            onClick={handlePayment}
            className={`w-full py-3 rounded text-lg font-medium transition duration-200 ${(!formData.agree || (formData.hasReferral === 'yes' && !formData.referralValid) || loading)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#ea5430] text-white hover:bg-[#d94525]'
              }`}
          >
            {loading ? 'Processing...' : `Pay ₹${fee}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyNow;
