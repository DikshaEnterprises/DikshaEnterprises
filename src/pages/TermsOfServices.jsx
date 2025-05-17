import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-white text-black py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#ea5430] mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">
          Last updated: May 10, 2025
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using the services provided by Diksha Enterprises (“Company”, “we”, “us”, or “our”), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">2. Modifications to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms at any time. Changes will be posted on this page and the “Last updated” date will be revised. Continued use of the service after such changes constitutes acceptance of the new terms.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to use our services only for lawful purposes. You must not misuse our services or attempt to access them using unauthorized methods. You are responsible for all activities conducted through your account.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">4. Payment & Refunds</h2>
          <p className="text-gray-700 leading-relaxed">
            All payments are final unless otherwise stated. Refunds are processed based on specific eligibility criteria, which may vary per service. Contact our support for any payment-related queries.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All content, including text, graphics, logos, and software, is the property of Diksha Enterprises and protected by intellectual property laws. You may not reproduce or distribute content without permission.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">6. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            We are not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the service, where applicable.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">7. Termination</h2>
          <p className="text-gray-700 leading-relaxed">
            We may suspend or terminate your access to our services at any time for violations of these terms or for any reason deemed appropriate. You may also terminate your use at any time.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">8. Contact Information</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions or concerns about these Terms of Service, you can contact us at:
            <br />
            <span className="block mt-2">
              <strong>Email:</strong>{" "}
              <a href="mailto:diksha160520@gmail.com" className="text-[#ea5430] hover:underline">
               diksha160520@gmail.com
              </a>
            </span>
            <span>
              <strong>Phone:</strong> +91 8062181216
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
