const mockTaskData = [
  {
    id: 1,
    status: "TODO",
    title: "Review database schema",
    description:
      "Review and give feedback on a design system for a hero section in 2 different variants.",
    priority: "High",
    assignedTo: [
      { name: "Alex Gold", initials: "AG", bgColor: "bg-orange-500" },
    ],
    dueDate: "Apr 2, 2025",
  },
  {
    id: 2,
    status: "COMPLETED",
    title: "Bug fixing",
    description: "Check code and fixing asap.",
    priority: "Low",
    assignedTo: [
      { name: "Victor Hall", initials: "VH", bgColor: "bg-blue-700" },
      { name: "Alex Gold", initials: "AG", bgColor: "bg-orange-500" },
    ],
    dueDate: "Apr 2, 2025",
  },
  {
    id: 3,
    status: "IN-PROGRESS",
    title: "Unit test for Log in function",
    description:
      "Write automation test on the Login function and report if bug exists.",
    priority: "Medium",
    assignedTo: [
      { name: "Victor Hall", initials: "VH", bgColor: "bg-blue-700" },
    ],
    dueDate: "Apr 2, 2025",
  },
  {
    id: 4,
    status: "TODO",
    title: "Implement user authentication",
    description:
      "Integrate OAuth2 for social login and implement email verification flow for new users.",
    priority: "High",
    assignedTo: [
      { name: "Sarah Kim", initials: "SK", bgColor: "bg-purple-600" },
      { name: "Victor Hall", initials: "VH", bgColor: "bg-blue-700" },
    ],
    dueDate: "Apr 10, 2025",
  },
  {
    id: 5,
    status: "IN-PROGRESS",
    title: "Design dashboard UI",
    description:
      "Create wireframes for the analytics dashboard including charts and tables.",
    priority: "Medium",
    assignedTo: [
      { name: "Maya Chen", initials: "MC", bgColor: "bg-green-600" },
    ],
    dueDate: "Apr 15, 2025",
  },
];

export default mockTaskData;
