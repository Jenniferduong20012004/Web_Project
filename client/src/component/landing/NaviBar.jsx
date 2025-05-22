import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const NaviBar = () => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 60; // Approximate height of your fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about-project", "features", "about-us", "contact"];
      const navbarHeight = 60;
      
      // Get current scroll position
      const scrollPosition = window.scrollY + navbarHeight + 100; // Add some offset for better detection
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
      
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getButtonClasses = (sectionId) => {
    const baseClasses = "transition-colors duration-200 font-medium";
    const activeClasses = "text-[#C271AB]  !pb-1";
    const inactiveClasses = "text-gray-600 hover:text-[#C271AB]";
    
    return `${baseClasses} ${activeSection === sectionId ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="flex justify-between items-center !px-8 !py-4 bg-white shadow-sm">
      <div className="flex items-center gap-3 cursor-pointer">
        <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
        <h2 className="text-2xl bg-gradient-to-r from-[#C271AB] to-[#5784C7] text-transparent bg-clip-text inline-block font-bold">
          TaskUP
        </h2>
      </div>

      <div className="hidden md:flex !space-x-8">
        <button
          onClick={() => scrollToSection("home")}
          className={getButtonClasses("home")}
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection("about-project")}
          className={getButtonClasses("about-project")}
        >
          About this project
        </button>
        <button
          onClick={() => scrollToSection("features")}
          className={getButtonClasses("features")}
        >
          Features
        </button>
        <button
          onClick={() => scrollToSection("about-us")}
          className={getButtonClasses("about-us")}
        >
          About us
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className={getButtonClasses("contact")}
        >
          Contact
        </button>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="bg-white text-[#C271AB] !px-6 !py-2 rounded-full border border-gray-200 hover:shadow-md transition duration-300"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-gradient-to-r from-[#C271AB] to-[#5784C7] text-white !px-6 !py-2 rounded-full hover:shadow-lg transition duration-300 font-medium"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default NaviBar;