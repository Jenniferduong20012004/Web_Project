import React from "react";
import {
  Check,
  Users,
  Award,
  TrendingUp,
  Calendar,
  Shield,
} from "lucide-react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 !p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div
        className="w-10 h-10 flex items-center justify-center rounded-full !mb-4"
        style={{ backgroundColor: "rgba(200, 200, 220, 0.2)" }}
      >
        {icon}
      </div>
      <h1 className="text-xl font-semibold !mb-3">{title}</h1>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Check className="text-indigo-500" />,
      title: "Task Management",
      description:
        "Create, organize and track tasks with intuitive drag-and-drop functionality.",
    },
    {
      icon: <Users className="text-pink-500" />,
      title: "Team Collaboration",
      description:
        "Share tasks, assign responsibilities, and streamline team communication.",
    },
    {
      icon: <Award className="text-blue-500" />,
      title: "Progress Tracking",
      description:
        "Monitor progress with visual dashboards and detailed analytics.",
    },
    {
      icon: <TrendingUp className="text-green-500" />,
      title: "Performance Analytics",
      description:
        "Gain insights into team performance and identify optimization opportunities.",
    },
    {
      icon: <Calendar className="text-amber-500" />,
      title: "Smart Scheduling",
      description:
        "Set due dates, reminders, and recurring tasks for better time management.",
    },
    {
      icon: <Shield className="text-red-400" />,
      title: "Security & Privacy",
      description:
        "Enterprise-grade security measures to protect your data and privacy.",
    },
  ];

  return (
    <section className="!py-16 !px-8 bg-white">
      <div className="container !mx-auto">
        <div className="text-center !mb-14">
          <h2 className="text-4xl font-bold !mb-4">
            <span className="text-gray-900">Powerful Features to </span>
            <span className="font-bold bg-gradient-to-r from-[#9C5088] to-[#3A6AA8]  text-transparent bg-clip-text !mb-6 leading-tight">
              Boost Productivity
            </span>
          </h2>
          <p className="text-gray-600 max-w-3xl !mx-auto">
            TaskUP provides everything you need to organize, track, and complete
            your team's work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
