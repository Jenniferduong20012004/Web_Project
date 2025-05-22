import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import chin from "../../assets/chin.jpg";
import nu from "../../assets/nu.jpg";
import noc from "../../assets/noc.jpg";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Thao Trinh",
      role: "UI/UX Designer & Frontend Developer",
      image: chin,
      description: "Beauty in design is functionality perfected.",
      social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 2,
      name: "Quynh Nhu",
      role: "Project Manager & Backend Developer",
      image: nu,
      description: "Discipline is the bridge between goals and accomplishment.",
      social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 3,
      name: "Boi Ngoc",
      role: "Bussiness Analyst & Frontend Developer",
      image: noc,
      description: "Data-driven decisions, user-focused results.",
      social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
  ];

  return (
    <section className="max-w-6xl !mx-auto text-center !px-5 !py-12 bg-gray-50">
      <h2 className="text-4xl bg-gradient-to-r from-[#9C5088] to-[#3A6AA8] text-transparent bg-clip-text inline-block font-bold !mb-6">
        Our Team
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl !mx-auto !mb-12 leading-relaxed">
        Meet the talented team who made this with productivity enthusiasts
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 !mt-12">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out !p-8"
          >
            {/* Profile Image */}
            <div className="relative !mb-6">
              <div className="w-32 h-32 !mx-auto rounded-full overflow-hidden bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Member Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 !mb-2 tracking-wide">
                {member.name}
              </h3>
              <p className="text-sm text-[#606AA8] uppercase tracking-wide font-semibold !mb-4 !max-w-50 !mx-auto leading-6">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed !mb-6">
                {member.description}
              </p>

              {/* Social Media Icons */}
              <div className="flex justify-center !space-x-4">
                <a
                  href={member.social.facebook}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href={member.social.instagram}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors duration-200"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href={member.social.linkedin}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors duration-200"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
