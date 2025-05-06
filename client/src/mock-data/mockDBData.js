export const users = [
  {
    userID: 1,
    name: 'Victor Hall',
    email: 'victor@example.com',
    password: 'password123'
  },
  {
    userID: 2,
    name: 'Alex Gold',
    email: 'alex@example.com',
    password: 'password123'
  },
  {
    userID: 3,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123'
  },
  {
    userID: 4,
    name: 'Mike Thompson',
    email: 'mike@example.com',
    password: 'password123'
  },
  {
    userID: 5,
    name: 'Nhu Nhi',
    email: 'thaotrinh@gmail.com',
    password: 'password123'
  }
];

export const workspaces = [
  {
    workspaceID: 1,
    name: 'TaskClick',
    description: 'Task Management Project'
  },
  {
    workspaceID: 2,
    name: 'Flower Shop',
    description: 'Online Fresh Flower Delivery'
  },
  {
    workspaceID: 3,
    name: 'Gamer Boy',
    description: 'Dynamic Gaming Community'
  },
  {
    workspaceID: 4,
    name: 'Team Project',
    description: 'Assigned by Team Lead'
  }
];

export const workspaceMembers = [
  // TaskClick members
  {
    memberID: 1,
    isAdmin: true,
    userID: 5,
    workspaceID: 1  // Nhu Nhi as admin in TaskClick
  },
  {
    memberID: 2,
    isAdmin: false,
    userID: 1,
    workspaceID: 1  // Victor Hall in TaskClick
  },
  {
    memberID: 3,
    isAdmin: false,
    userID: 2,
    workspaceID: 1  // Alex Gold in TaskClick
  },
  // Flower Shop members
  {
    memberID: 4,
    isAdmin: true,
    userID: 5,
    workspaceID: 2  // Nhu Nhi as admin in Flower Shop
  },
  {
    memberID: 5,
    isAdmin: false,
    userID: 3,
    workspaceID: 2  // Sarah Johnson in Flower Shop
  },
  // Gamer Boy members
  {
    memberID: 6,
    isAdmin: true,
    userID: 5,
    workspaceID: 3  // Nhu Nhi as admin in Gamer Boy
  },
  {
    memberID: 7,
    isAdmin: false,
    userID: 4,
    workspaceID: 3  // Mike Thompson in Gamer Boy
  },
  {
    memberID: 8,
    isAdmin: false,
    userID: 2,
    workspaceID: 3  // Alex Gold in Gamer Boy
  },
  // Team Project members
  {
    memberID: 9,
    isAdmin: true,
    userID: 3,
    workspaceID: 4  // Sarah Johnson as admin in Team Project
  },
  {
    memberID: 10,
    isAdmin: false,
    userID: 5,
    workspaceID: 4  // Nhu Nhi in Team Project
  },
  {
    memberID: 11,
    isAdmin: false,
    userID: 1,
    workspaceID: 4  // Victor Hall in Team Project
  }
];

export const tasks = [
  {
    taskID: 1,
    taskTitle: 'Review database schema',
    taskDescription: 'Review and give feedback on a design system for a hero section in 2 different variants.',
    taskStatus: 'TODO',
    taskPriority: 'High',
    dueDate: '2025-04-02',
    workspaceID: 1
  },
  {
    taskID: 2,
    taskTitle: 'Bug fixing',
    taskDescription: 'Check code and fixing asap.',
    taskStatus: 'COMPLETED',
    taskPriority: 'Low',
    dueDate: '2025-04-02', 
    workspaceID: 1
  },
  {
    taskID: 3,
    taskTitle: 'Unit test for Log in function',
    taskDescription: 'Write automation test on the Login function and report if bug exists.',
    taskStatus: 'IN-PROGRESS',
    taskPriority: 'Medium',
    dueDate: '2025-04-02',
    workspaceID: 1
  },
  {
    taskID: 4,
    taskTitle: 'Implement user authentication',
    taskDescription: 'Integrate OAuth2 for social login and implement email verification flow for new users.',
    taskStatus: 'TODO',
    taskPriority: 'High',
    dueDate: '2025-04-10',
    workspaceID: 3
  },
  {
    taskID: 5,
    taskTitle: 'Design dashboard UI',
    taskDescription: 'Create wireframes for the analytics dashboard including charts and tables.',
    taskStatus: 'IN-PROGRESS',
    taskPriority: 'Medium',
    dueDate: '2025-04-15',
    workspaceID: 2
  }
];

export const subtasks = [
  // For Task 1: Review database schema
  {
    subtaskID: 1,
    subtaskTitle: 'Sketch the ERD',
    checked: false,
    taskID: 1
  },
  {
    subtaskID: 2,
    subtaskTitle: 'Draw class diagram',
    checked: false,
    taskID: 1
  },
  // For Task 2: Bug fixing
  {
    subtaskID: 3,
    subtaskTitle: 'Identify bugs',
    checked: true,
    taskID: 2
  },
  {
    subtaskID: 4,
    subtaskTitle: 'Fix critical issues',
    checked: true,
    taskID: 2
  },
  {
    subtaskID: 5,
    subtaskTitle: 'Test solutions',
    checked: true,
    taskID: 2
  },
  // For Task 3: Unit test for Login
  {
    subtaskID: 6,
    subtaskTitle: 'Set up test environment',
    checked: true,
    taskID: 3
  },
  {
    subtaskID: 7,
    subtaskTitle: 'Write test cases',
    checked: true,
    taskID: 3
  },
  {
    subtaskID: 8,
    subtaskTitle: 'Run tests',
    checked: false,
    taskID: 3
  },
  {
    subtaskID: 9,
    subtaskTitle: 'Document results',
    checked: false,
    taskID: 3
  },
  // For Task 4: User authentication
  {
    subtaskID: 10,
    subtaskTitle: 'Set up OAuth providers',
    checked: false,
    taskID: 4
  },
  {
    subtaskID: 11,
    subtaskTitle: 'Design verification flow',
    checked: false,
    taskID: 4
  },
  {
    subtaskID: 12,
    subtaskTitle: 'Implement login UI',
    checked: false,
    taskID: 4
  },
  // For Task 5: Dashboard UI
  {
    subtaskID: 13,
    subtaskTitle: 'Research dashboard examples',
    checked: true,
    taskID: 5
  },
  {
    subtaskID: 14,
    subtaskTitle: 'Create wireframes',
    checked: true,
    taskID: 5
  },
  {
    subtaskID: 15,
    subtaskTitle: 'Design UI elements',
    checked: false,
    taskID: 5
  },
  {
    subtaskID: 16,
    subtaskTitle: 'Finalize mockups',
    checked: false,
    taskID: 5
  }
];

export const assignedTasks = [
  {
    assignedTaskID: 1,
    memberID: 3,
    taskID: 1  // Alex in TaskClick assigned to Review database schema
  },
  {
    assignedTaskID: 2,
    memberID: 2,
    taskID: 2  // Victor in TaskClick assigned to Bug fixing
  },
  {
    assignedTaskID: 3,
    memberID: 3,
    taskID: 2  // Alex in TaskClick assigned to Bug fixing
  },
  {
    assignedTaskID: 4,
    memberID: 2,
    taskID: 3  // Victor in TaskClick assigned to Unit test
  },
  {
    assignedTaskID: 5,
    memberID: 7,
    taskID: 4  // Mike in Gamer Boy assigned to User authentication
  },
  {
    assignedTaskID: 6,
    memberID: 8,
    taskID: 4  // Alex in Gamer Boy assigned to User authentication
  },
  {
    assignedTaskID: 7,
    memberID: 5,
    taskID: 5  // Sarah in Flower Shop assigned to Dashboard UI
  }
];

// Export all mock data
export const mockDBData = {
  users,
  workspaces,
  workspaceMembers,
  tasks,
  subtasks,
  assignedTasks
};

export default mockDBData;