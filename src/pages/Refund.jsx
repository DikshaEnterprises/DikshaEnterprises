import React from "react";

function RefundCancellationPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8 text-[#ea5430]">Refund & Cancellation Policy</h1>

      <p className="mb-6">
        At Diksha Enterprises, we strive to provide a smooth and transparent experience for all applicants using our job application platform.
        Before making any payments, we encourage you to carefully read this Refund and Cancellation Policy to understand your rights and obligations.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Payment Processing</h2>
      <p className="mb-6">
        All payments for job applications are securely processed through <strong>Razorpay</strong>, a trusted third-party payment gateway.
        We do not store your payment card or banking details on our servers. Payment confirmation is immediate upon successful transaction.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Cancellation Policy</h2>
      <p className="mb-6">
        You may request cancellation of your job application within <strong>24 hours</strong> of submission. To initiate cancellation, please contact our support team at 
        <a href="mailto:diksha160520@gmail.com" className="text-[#ea5430] ml-1">diksha160520@gmail.com</a> with your application details and payment reference.
      </p>
      <p className="mb-6">
        Cancellations requested after 24 hours of application submission will not be accepted, as the application process and processing by our team would have already begun.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Refund Policy</h2>
      <p className="mb-6">
        Refunds are subject to the following terms:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>
          Refunds are only applicable if cancellation requests are received within <strong>24 hours</strong> of application submission.
        </li>
        <li>
          Once the cancellation is approved, refunds will be processed back to the original payment method used during the transaction.
        </li>
        <li>
          Refund processing may take up to <strong>7 business days</strong> depending on your bank or payment provider.
        </li>
        <li>
          Refunds are not available if the application process has advanced beyond the initial submission stage.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. No-Show or Incomplete Applications</h2>
      <p className="mb-6">
        If you fail to complete the application process after payment or do not attend any required interviews or steps after submission, no refunds will be issued.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Disputes and Support</h2>
      <p className="mb-6">
        For any questions, disputes, or clarifications related to refunds or cancellations, please contact our dedicated support team at 
        <a href="mailto:diksha160520@gmail.com" className="text-[#ea5430] ml-1">diksha160520@gmail.com</a>.
        We are committed to resolving any issues promptly and fairly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Amendments to this Policy</h2>
      <p className="mb-6">
        Diksha Enterprises reserves the right to modify or update this Refund & Cancellation Policy at any time without prior notice. 
        Any changes will be posted on this page with the updated date.
      </p>

      <p className="mt-10 text-sm text-gray-600">
        Last updated: May 2025
      </p>
    </div>
  );
}

export default RefundCancellationPolicy;
