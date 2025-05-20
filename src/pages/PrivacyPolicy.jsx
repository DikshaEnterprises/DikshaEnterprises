import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#ea5430] mb-6">Privacy Policy</h1>

        <p className="mb-4">
          <strong>Effective Date:</strong> 10-May-2025
        </p>

        <p className="mb-4">
          This Privacy Policy explains how <strong>Diksha Enterprises</strong> collects, uses, and protects your data when you apply for job opportunities through our platform.
        </p>

        <h2 className="text-xl font-semibold text-[#ea5430] mt-6 mb-2">1. What We Collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Candidate Name</li>
          <li>Father's Name</li>
          <li>Mobile Number (Primary & Alternate)</li>
          <li>Email ID</li>
          <li>Date of Birth</li>
          <li>Gender</li>
          <li>Address, District, State</li>
          <li>Category (GEN, OBC, SC, ST, EWS)</li>
          <li>Qualification & Work Experience</li>
          <li>Aadhar Number</li>
          <li>Referral Code (Optional)</li>
          <li>Payment Information via Razorpay</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#ea5430] mt-6 mb-2">2. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To process job applications</li>
          <li>To contact you with updates or queries</li>
          <li>To verify your identity and eligibility</li>
          <li>To track application payments</li>
          <li>For internal record-keeping and legal compliance</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#ea5430] mt-6 mb-2">3. Payment Security</h2>
        <p className="mb-4">
          All payments are handled via <strong>Razorpay</strong>. We do not store your card or banking information. Razorpay is PCI-DSS compliant and securely manages your transaction.
        </p>

        <h2 className="text-xl font-semibold text-[#ea5430] mt-6 mb-2">4. Data Storage & Protection</h2>
        <p className="mb-4">
          Your data is stored securely in our encrypted database. Access is restricted to authorized personnel only.
        </p>

        <h2 className="text-xl font-semibold text-[#ea5430] mt-6 mb-2">5. Sharing Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>We do not sell or rent your data.</li>
          <li>Data is only shared with:
            <ul className="list-disc pl-6">
              <li>Payment processor (Razorpay)</li>
              <li>Internal HR team</li>
              <li>Government authorities (only if required by law)</li>
            </ul>
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#ea5430] mt-6 mb-2">6. Cookies</h2>
        <p className="mb-4">
          We may use cookies to enhance your browsing experience. You can choose to disable cookies in your browser.
        </p>

        <h2 className="text-xl font-semibold text-[#ea5430] mt-6 mb-2">7. Data Retention</h2>
        <p className="mb-4">
          We retain your information for up to 1 year for compliance and auditing unless you request earlier deletion.
        </p>

        <h2 className="text-xl font-semibold text-[#ea5430] mt-6 mb-2">8. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access your personal data</li>
          <li>Request corrections or deletion</li>
          <li>Withdraw consent for data usage (if not legally required)</li>
        </ul>

        <p className="mt-4 mb-4">
          To exercise your rights, email us at: <strong>diksha160520@gmail.com</strong>
        </p>

        <h2 className="text-xl font-semibold text-[#ea5430] mt-6 mb-2">9. Changes to This Policy</h2>
        <p className="mb-4">
          This Privacy Policy may change. Any updates will be posted on this page with a revised date.
        </p>

        <h2 className="text-xl font-semibold text-[#ea5430] mt-6 mb-2">10. Contact</h2>
        <p className="mb-4">
          <strong>Diksha Enterprises</strong><br />
          Diksha Enterprises, Ground Floor, 298 Vasudeo Villa, Priyadarshi Nagar,
                  Road No:1, Bhagwat Nagar, Patna-800026<br />
          Email: diksha160520@gmail.com<br />
          Phone: +91 9117636684
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
