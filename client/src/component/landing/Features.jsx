import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import board from "../../assets/board.png";
import dashboard from "../../assets/dashboard.png";
import Workspace from "../../assets/workspace.png";
import trash from "../../assets/trash.png";
import members from "../../assets/members.png";
import invitation from "../../assets/invitation.png";
import login from "../../assets/login.png";
import profile from "../../assets/profile.png";

const Features = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: login,
      alt: "TaskUP Login page",
    },
    {
      image: Workspace,
      alt: "TaskUP Workspace Management Interface",
    },
    {
      image: dashboard,
      alt: "TaskUP Dashboard Overview",
    },
    {
      image: board,
      alt: "TaskUP Board Management Interface",
    },
    {
      image: trash,
      alt: "TaskUP Task Management",
    },
    {
      image: members,
      alt: "TaskUP Team Members",
    },
    {
      image: invitation,
      alt: "TaskUP Invitations",
    },
    {
      image: profile,
      alt: "TaskUP profile",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3400);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    // Temporarily pause auto-play when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    // Temporarily pause auto-play when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Temporarily pause auto-play when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section className="!py-16 !px-8 bg-gradient-to-br from-gray-50 to-white">
      {/* Efficiency Section */}
      <div className="container !mx-auto max-w-7xl">
        <div className="text-center !mb-12">
          <div className="text-center !mb-14">
            <h2 className="text-4xl font-bold !mb-4">
              <span className="text-gray-900">Powerful Features to </span>
              <span className="font-bold bg-gradient-to-r from-[#9C5088] to-[#3A6AA8] text-transparent bg-clip-text !mb-6 leading-tight">
                Boost Productivity
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl !mx-auto">
              TaskUP provides you all essential things to organize, track, and
              complete your team's work.
            </p>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-4 !mb-16">
            {[
              {
                label: "📁 Workspace",
                color: "bg-purple-100 text-purple-700 border border-purple-200",
              },
              {
                label: "📊 Dashboard",
                color: "bg-green-100 text-green-700 border border-green-200",
              },
              {
                label: "📋 Board",
                color: "bg-pink-100 text-pink-700 border border-pink-200",
              },
              {
                label: "🔄 Trash",
                color: "bg-orange-100 text-orange-700 border border-orange-200",
              },
              {
                label: "👥 Team",
                color: "bg-blue-100 text-blue-700 border border-blue-200",
              },
              {
                label: "📧 Invitation",
                color: "bg-yellow-100 text-yellow-700 border border-yellow-200",
              },
            ].map((tag, index) => (
              <span
                key={index}
                className={`!px-4 !py-2 rounded-full text-sm font-medium ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image Slider */}
          <div className="relative">
            <div
              className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl !p-8 shadow-2xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-1200 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full !p-2 shadow-lg transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full !p-2 shadow-lg transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center !mt-6 !space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-800 ${
                      index === currentSlide
                        ? "bg-blue-600 scale-110"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900 !mb-6">
              Key Features
            </h3>

            <div className="!space-y-4">
              {/* workspace */}
              <div className="flex items-start !space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 !mt-1">
                  📁
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 !mb-1">
                    Workspace Organization
                  </h4>
                  <p className="text-gray-600">
                    Structured project and board management
                  </p>
                </div>
              </div>
              {/* dashboard */}
              <div className="flex items-start !space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 !mt-1">
                  📊
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 !mb-1">
                    Interactive Dashboards
                  </h4>
                  <p className="text-gray-600">
                    Real-time progress tracking and analytics
                  </p>
                </div>
              </div>
              {/* board */}
              <div className="flex items-start !space-x-4">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0 !mt-1">
                  📋
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 !mb-1">
                    Visual Board
                  </h4>
                  <p className="text-gray-600">
                    Collaborative workspace for team coordination
                  </p>
                </div>
              </div>
              {/* trash */}
              <div className="flex items-start !space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 !mt-1">
                  🔄
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 !mb-1">
                    Task Recovery
                  </h4>
                  <p className="text-gray-600">
                    Advanced trash and restore functionality
                  </p>
                </div>
              </div>
              {/* team */}
              <div className="flex items-start !space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 !mt-1">
                  👥
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 !mb-1">
                    Team Collaboration
                  </h4>
                  <p className="text-gray-600">
                    Member management and role assignments
                  </p>
                </div>
              </div>
              <div className="flex items-start !space-x-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 !mt-1">
                  <span className="text-yellow-600 font-semibold">📧</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 !mb-1">
                    Smart Invitations
                  </h4>
                  <p className="text-gray-600">
                    Seamless user onboarding system
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
