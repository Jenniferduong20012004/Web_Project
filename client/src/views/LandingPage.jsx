import React from "react";
import NaviBar from "../component/landing/NaviBar";
import Home from "../component/landing/Home";
import AboutProject from "../component/landing/AboutProject";
import Features from "../component/landing/Features";
import Team from "../component/landing/Team";
import Contact from "../component/landing/Contact";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <div className="fixed top-0 right-0 left-0 z-20">
        <NaviBar />
      </div>

      <div className="flex-1 flex flex-col !px-4 !mt-16 bg-gray-50">
        {/* Home Section */}
        <Home />

        <section id="about-project">
          <AboutProject />
        </section>

        {/* Features Section */}
        <section id="features">
          <Features />
        </section>

        {/* Team section */}
        <section id="about-us">
          <Team />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
