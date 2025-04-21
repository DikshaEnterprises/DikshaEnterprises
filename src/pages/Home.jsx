import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import WhyChooseUs from "../components/WhyToChooseUs";
import OurServices from "../components/OurServices";
import OurProjects from "../components/OurProject";
import ContactUs from "../components/ContactUs";

const carouselData = [
  {
    title: "Innovative Product Solutions",
    image: "/images/product.webp",
  },
  {
    title: "Reliable Customer Support",
    image: "/images/customersuppport.jpg",
  },
  {
    title: "Cutting-edge Technology",
    image: "/images/cutting.jpg",
  },
];

const salesData = [
  { month: "Aug", sales: 420 },
  { month: "Sep", sales: 580 },
  { month: "Oct", sales: 690 },
  { month: "Nov", sales: 740 },
  { month: "Dec", sales: 880 },
  { month: "Jan", sales: 760 },
  { month: "Feb", sales: 810 },
  { month: "Mar", sales: 900 },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Top Carousel */}
        <div className="relative">
          <div className="keen-slider">
            <div
              className="relative h-[300px] md:h-[400px] w-full"
              style={{
                backgroundImage: `url(${carouselData[currentIndex].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-md text-center px-4">
                  {carouselData[currentIndex].title}
                </h2>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-[#ea5430]/80 hover:bg-[#ea5430] p-2 rounded-full shadow-md transition"
          >
            &#8249;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-[#ea5430]/80 hover:bg-[#ea5430] p-2 rounded-full shadow-md transition"
          >
            &#8250;
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-4 p-6">
          {/* Graph */}
          <div className="md:w-[60%] w-full bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-[#ea5430] mb-4">
              Monthly Sales Trends
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    color: "#333",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#ea5430"
                  strokeWidth={3}
                  dot={{ r: 5, stroke: "#ea5430", strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Welcome Message */}
          <div className="md:w-[40%] w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-[#ea5430] mb-4">
              Welcome to Diksha Enterprises
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              At Diksha Enterprises, we drive innovation and growth across our
              product lines. Our performance over the last eight months reflects
              our dedication to delivering excellence and customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      <WhyChooseUs />
      <OurServices />
      <OurProjects />
      <ContactUs />
    </>
  );
}

export default Home;
