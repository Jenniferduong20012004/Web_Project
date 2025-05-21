import React from "react";
import { ArrowUpDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import landingSvg from "../assets/landing.svg";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center !px-8 !py-4">
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
          <h2 className="text-2xl bg-gradient-to-r from-[#3E4177] to-[#C271AB] text-transparent bg-clip-text inline-block font-bold">
            TaskUP
          </h2>
        </div>

        <div className="hidden md:flex !space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            About us
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Services
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Pricing
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="bg-white text-[#3E4177] !px-6 !py-2 rounded-full border border-gray-200 hover:shadow-md transition duration-300"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-[#3E4177] to-[#C271AB] text-white !px-6 !py-2 rounded-full hover:shadow-lg transition duration-300 font-medium"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto !px-8 !py-10 flex flex-col md:flex-row items-center">
        {/* Left Column - Text Content */}
        <div className="md:w-1/2 !mb-10 md:mb-0">
          <h1 className="text-5xl font-bold text-gray-800 !mb-6 leading-tight">
            Powerful Task Management For You
          </h1>
          <p className="text-gray-600 !mb-8 max-w-md">
            Streamline your workflow, collaborate effectively, and achieve more
            with TaskUP - the ultimate task management solution for teams of all
            sizes.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#3E4177] to-[#C271AB] text-white !px-8 !py-3 rounded-full flex items-center gap-2 hover:shadow-lg transition duration-300"
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <button className="bg-white text-gray-700 !px-8 !py-3 rounded-full border border-gray-200 hover:shadow-md transition duration-300">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-16 !mt-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">240+</h2>
              <p className="text-gray-600 text-sm">Teams Using TaskUP</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">9.8</h2>
              <p className="text-gray-600 text-sm">User Satisfaction Score</p>
            </div>
          </div>
        </div>

        {/* Right Column - Illustration */}
        <div className="md:w-1/2 relative">
          <div className="flex items-center justify-center">
            {/* Main laptop illustration */}
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl w-140 h-90 transform rotate-3d perspective-laptop">
                <div className="bg-gradient-to-r from-[#3E4177] to-[#C271AB] h-full rounded-lg !p-4 flex items-center justify-center">
                  <div className="text-white text-center relative w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={landingSvg}
                      alt="Task Management"
                      className="w-full md:w-4/5 lg:w-4/5 xl:w-full h-auto max-w-3xl object-contain z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                    <div className="w-16 h-1 bg-white mx-auto !mb-4 relative z-0"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* People illustrations */}
            <div className="absolute bottom-0 left-0">
              <div className="bg-[#f0e6f5] p-4 rounded-lg">
                <div className="w-16 h-12 bg-[#e6c9e6] !mb-2 rounded"></div>
                <div className="flex justify-between">
                  <div className="w-6 h-6 rounded-full bg-[#5B82C5]"></div>
                  <div className="w-6 h-6 rounded-full bg-[#5B82C5]"></div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0">
              <div className="bg-[#f0e6f5] p-4 rounded-lg">
                <div className="w-8 h-16 bg-[#5B82C5] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
