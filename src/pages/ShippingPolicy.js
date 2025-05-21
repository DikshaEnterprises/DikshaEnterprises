import React from 'react';

const ShippingPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
            <h1 className="text-3xl font-bold mb-4 text-[#ea5430]">Shipping & Delivery Policy</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#ea5430]">Delivery Timelines</h2>
                <p className="text-base leading-relaxed">
                    We strive to deliver your orders in a timely manner. The estimated delivery timeline is between <span className="font-semibold text-[#ea5430]">3 to 7 business days</span> from the date of order confirmation.
                </p>
                <p className="mt-2">
                    However, in rare cases, delivery may take up to <span className="font-semibold text-[#ea5430]">10 business days</span> depending on location, logistics, or unforeseen delays.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#ea5430]">Shipping Charges</h2>
                <p className="text-base leading-relaxed">
                    We offer <span className="font-semibold text-[#ea5430]">free shipping</span> on all prepaid orders across India. For Cash on Delivery (COD) orders, a small fee may apply which will be displayed at checkout.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#ea5430]">Shipping Partners</h2>
                <p className="text-base leading-relaxed">
                    We have partnered with reliable logistics providers like Delhivery, Blue Dart, and India Post to ensure safe and prompt delivery of your orders.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#ea5430]">Serviceable Locations</h2>
                <p className="text-base leading-relaxed">
                    We currently deliver across all serviceable pin codes in India. For remote areas, delivery timelines may vary slightly.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#ea5430]">Operational Address</h2>
                <p className="text-base leading-relaxed">
                    All our operations are based in India. You may contact us at our official address:
                </p>
                <address className="mt-2 not-italic leading-relaxed">
                    <span className="block font-semibold">Diksha Enterprises</span>
                     Ground Floor, 298 Vasudeo Villa, <br />
                    Priyadarshi Nagar,
                    Road No:1, Bhagwat Nagar, Patna-800026<br />
                    India
                </address>
            </section>


        </div>
    );
};

export default ShippingPolicy;
