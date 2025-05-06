// Mock data for task details with export functions

const mockMembers = [
  {
    id: 1,
    name: "Victor Hall",
    email: "victor@example.com",
    bgColor: "bg-blue-700",
    initials: "VH"
  },
  {
    id: 2,
    name: "Alex Gold",
    email: "alex@example.com",
    bgColor: "bg-orange-500",
    initials: "AG"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    bgColor: "bg-green-600",
    initials: "SJ"
  },
  {
    id: 4,
    name: "Mike Thompson",
    email: "mike@example.com",
    bgColor: "bg-purple-600",
    initials: "MT"
  },
];

const mockTaskDetails = {
  1: {
    id: 1,
    title: "Review database schema",
    description:
      "Review and give feedback on a design system for a hero section in 2 different variants.",
    status: "TODO",
    priority: "High",
    dueDate: "Apr 2, 2025",
    assignedTo: [
      {
        id: 2,
        name: "Alex Gold",
        email: "alex@example.com",
        bgColor: "bg-orange-500",
        initials: "AG"
      },
    ],
    subtasks: [
      { id: 1, title: "Sketch the ERD", completed: false },
      { id: 2, title: "Draw class diagram", completed: false },
    ],
    assets: [
      { id: 1, name: "my_document.docx", type: "docx" },
      { id: 2, name: "source.pdf", type: "pdf" },
    ],
    availableMembers: mockMembers,
  },
  2: {
    id: 2,
    title: "Bug fixing",
    description: "Check code and fixing asap.",
    status: "COMPLETED",
    priority: "Low",
    dueDate: "Apr 2, 2025",
    assignedTo: [
      {
        id: 1,
        name: "Victor Hall",
        email: "victor@example.com",
        bgColor: "bg-blue-700",
        initials: "VH"
      },
      {
        id: 2,
        name: "Alex Gold",
        email: "alex@example.com",
        bgColor: "bg-orange-500",
        initials: "AG"
      },
    ],
    subtasks: [
      { id: 1, title: "Identify bugs", completed: true },
      { id: 2, title: "Fix critical issues", completed: true },
      { id: 3, title: "Test solutions", completed: true },
    ],
    assets: [
      { id: 1, name: "bug_report.pdf", type: "pdf" },
    ],
    availableMembers: mockMembers,
  },
  3: {
    id: 3,
    title: "Unit test for Log in function",
    description:
      "Write automation test on the Login function and report if bug exists.",
    status: "IN-PROGRESS",
    priority: "Medium",
    dueDate: "Apr 2, 2025",
    assignedTo: [
      {
        id: 1,
        name: "Victor Hall",
        email: "victor@example.com",
        bgColor: "bg-blue-700",
        initials: "VH"
      },
    ],
    subtasks: [
      { id: 1, title: "Set up test environment", completed: true },
      { id: 2, title: "Write test cases", completed: true },
      { id: 3, title: "Run tests", completed: false },
      { id: 4, title: "Document results", completed: false },
    ],
    assets: [
      { id: 1, name: "test_plan.docx", type: "docx" },
    ],
    availableMembers: mockMembers,
  },
  4: {
    id: 4,
    title: "Implement user authentication",
    description:
      "Integrate OAuth2 for social login and implement email verification flow for new users.",
    status: "TODO",
    priority: "High",
    dueDate: "Apr 10, 2025",
    assignedTo: [
      {
        id: 4,
        name: "Mike Thompson",
        email: "mike@example.com",
        bgColor: "bg-purple-600",
        initials: "MT"
      },
      {
        id: 1,
        name: "Victor Hall",
        email: "victor@example.com",
        bgColor: "bg-blue-700",
        initials: "VH"
      },
    ],
    subtasks: [
      { id: 1, title: "Set up OAuth providers", completed: false },
      { id: 2, title: "Design verification flow", completed: false },
      { id: 3, title: "Implement login UI", completed: false },
    ],
    assets: [
      { id: 1, name: "auth_requirements.pdf", type: "pdf" },
      { id: 2, name: "user_flow.png", type: "img" },
    ],
    availableMembers: mockMembers,
  },
  5: {
    id: 5,
    title: "Design dashboard UI",
    description:
      "Create wireframes for the analytics dashboard including charts and tables.",
    status: "IN-PROGRESS",
    priority: "Medium",
    dueDate: "Apr 15, 2025",
    assignedTo: [
      {
        id: 3,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        bgColor: "bg-green-600",
        initials: "SJ"
      },
    ],
    subtasks: [
      { id: 1, title: "Research dashboard examples", completed: true },
      { id: 2, title: "Create wireframes", completed: true },
      { id: 3, title: "Design UI elements", completed: false },
      { id: 4, title: "Finalize mockups", completed: false },
    ],
    assets: [
      { id: 1, name: "dashboard_inspo.pdf", type: "pdf" },
      { id: 2, name: "wireframes.png", type: "img" },
    ],
    availableMembers: mockMembers,
  },
};

// Function to get a specific task detail by ID
export const getTaskDetail = (taskId) => {
  return mockTaskDetails[taskId] || null;
};

// Function to get all task details
export const getAllTaskDetails = () => {
  return Object.values(mockTaskDetails);
};

// Export the mock members for reuse
export const getMembers = () => {
  return mockMembers;
};

const mockTaskDetailData = {
  taskDetails: mockTaskDetails,
  members: mockMembers,
  getTaskDetail,
  getAllTaskDetails,
  getMembers,
};

export default mockTaskDetailData;