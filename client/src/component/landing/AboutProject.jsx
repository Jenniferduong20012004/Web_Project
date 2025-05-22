import React from "react";
import react from "../../assets/react.svg";
import nodejs from "../../assets/nodejs.svg";
import mysql from "../../assets/mysql.svg";

const AboutProject = () => {
  return (
    <section className="!py-16 !px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="container !mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center !mb-16">
          <h2 className="text-4xl font-bold !mb-6">
            <span className="text-gray-900">About </span>
            <span className="font-bold bg-gradient-to-r from-[#9C5088] to-[#3A6AA8] text-transparent bg-clip-text leading-tight">
              This Project
            </span>
          </h2>
          <p className="text-gray-600 max-w-3xl !mx-auto text-lg leading-relaxed">
            Discover the story behind TaskUP - our comprehensive solution for
            modern task management and team collaboration.
          </p>
        </div>

        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center !mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 !mb-6">
              Project Overview
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed !mb-6 text-justify">
              TaskUP is the final capstone project for the{" "}
              <strong className="text-gray-800">
                Web Application Development
              </strong>{" "}
              course at International University, part of Vietnam National
              University Ho Chi Minh City. This comprehensive task management
              tracking system represents the culmination of our academic journey
              in modern web development.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed text-justify">
              Our goal is to revolutionize how teams organize, track, and
              complete their work through an intuitive, powerful, and scalable
              web application that addresses real-world productivity challenges.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg !p-8">
            <div className="!space-y-6">
              <div className="flex items-center !space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-xl">🎓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    Academic Project
                  </h4>
                  <p className="text-gray-600">
                    Final project for Web Application Development
                  </p>
                </div>
              </div>
              <div className="flex items-center !space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-xl">🏢</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    Institution
                  </h4>
                  <p className="text-gray-600">
                    International University - VNU HCMC
                  </p>
                </div>
              </div>
              <div className="flex items-center !space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-xl">📋</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    Focus Area
                  </h4>
                  <p className="text-gray-600">
                    Task Management & Team Collaboration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-2xl shadow-lg !p-8 !mb-16">
          <h3 className="text-3xl font-bold text-gray-900 !mb-8 text-center">
            Technology Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center !mx-auto !mb-4">
                <img src={react} alt="React" className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 !mb-3">
                React JS
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Modern frontend framework for building dynamic and responsive
                user interfaces with component-based architecture.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center !mx-auto !mb-4">
                <img src={nodejs} alt="nodejs" className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 !mb-3">
                Node.js
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Powerful backend runtime environment enabling server-side
                JavaScript for scalable and efficient API development.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center !mx-auto !mb-4">
                <img src={mysql} alt="mysql" className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 !mb-3">
                MySQL
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Reliable relational database management system ensuring secure
                data storage and efficient query performance.
              </p>
            </div>
          </div>
        </div>

        {/* Development Process */}
        <div className="!mt-16">
          <h3 className="text-3xl font-bold text-gray-900 !mb-8 text-center">
            Development Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md !p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center !mx-auto !mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-800 !mb-2">Planning</h4>
              <p className="text-gray-600 text-sm">
                Requirements analysis and system design
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md !p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center !mx-auto !mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="font-semibold text-gray-800 !mb-2">Development</h4>
              <p className="text-gray-600 text-sm">
                Full-stack implementation with modern tools
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md !p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center !mx-auto !mb-4">
                <span className="text-2xl">🧪</span>
              </div>
              <h4 className="font-semibold text-gray-800 !mb-2">Testing</h4>
              <p className="text-gray-600 text-sm">
                Comprehensive testing and quality assurance
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md !p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center !mx-auto !mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="font-semibold text-gray-800 !mb-2">Deployment</h4>
              <p className="text-gray-600 text-sm">
                Final presentation and project showcase
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
