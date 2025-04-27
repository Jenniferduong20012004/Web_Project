// import mockDBData, {
//   getUserWorkspaces,
//   getWorkspaceDetails,
//   getWorkspaceMembers,
//   getWorkspaceTasks
// } from '../mock-data/mockDBData';

import mockDBData, {
  users,
  workspaces,
  workspaceMembers,
  tasks,
  subtasks,
  assignedTasks,
} from "../mock-data/mockDBData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const API_CONFIG = {
  USE_MOCK: true,
  BASE_URL: "http://localhost:5000/api",
  DELAY: 300,
};

// get all ws of a user
// const getUserWorkspaces = (userID) => {
//   const memberEntries = workspaceMembers.filter(
//     (member) => member.userID === userID
//   );
//   return memberEntries.map((entry) => {
//     const workspace = workspaces.find(
//       (ws) => ws.workspaceID === entry.workspaceID
//     );
//     return {
//       ...workspace,
//       isAdmin: entry.isAdmin,
//       memberID: entry.memberID,
//     };
//   });
// };

// get all ws of a user when they are admin (My Workspaces)
const getUserAdminWorkspaces = (userID) => {
  const adminEntries = workspaceMembers.filter(
    (member) => member.userID === Number(userID) && member.isAdmin === true
  );

  return adminEntries.map((entry) => {
    const workspace = workspaces.find(
      (ws) => ws.workspaceID === entry.workspaceID
    );
    return {
      ...workspace,
      isAdmin: true,
      memberID: entry.memberID,
    };
  });
};

// My Assigned Workspace
const getUserNonAdminWorkspaces = (userID) => {
  const nonAdminEntries = workspaceMembers.filter(
    (member) => member.userID === Number(userID) && member.isAdmin === false
  );

  return nonAdminEntries.map((entry) => {
    const workspace = workspaces.find(
      (ws) => ws.workspaceID === entry.workspaceID
    );
    return {
      ...workspace,
      isAdmin: false,
      memberID: entry.memberID,
    };
  });
};

// gett all tasks in a workspace
const getWorkspaceTasks = (workspaceID) => {
  return tasks.filter((task) => task.workspaceID === workspaceID);
};

// get task details
const getTaskDetails = (taskID) => {
  const task = tasks.find((t) => t.taskID === taskID);
  if (!task) return null;

  const taskSubtasks = subtasks.filter((st) => st.taskID === taskID);
  const assignments = assignedTasks.filter((at) => at.taskID === taskID);
  const assignedMembers = assignments.map((assignment) => {
    const member = workspaceMembers.find(
      (wm) => wm.memberID === assignment.memberID
    );
    const user = users.find((u) => u.userID === member.userID);
    return {
      memberID: member.memberID,
      name: user.name,
      email: user.email,
      isAdmin: member.isAdmin,
    };
  });
  return {
    ...task,
    subtasks: taskSubtasks,
    assignedMembers,
  };
};

// get all members in a workspace
const getWorkspaceMembers = (workspaceID) => {
  const members = workspaceMembers.filter(member => member.workspaceID === workspaceID);
  return members.map(member => {
    const user = users.find(u => u.userID === member.userID);
    return {
      memberID: member.memberID,
      isAdmin: member.isAdmin,
      userID: member.userID,
      name: user.name,
      email: user.email
    };
  });
};

function getRandomGradient() {
  const gradients = [
    "bg-gradient-to-br from-pink-300 to-blue-400",
    "bg-gradient-to-br from-blue-300 to-purple-400",
    "bg-gradient-to-br from-green-300 to-cyan-400",
    "bg-gradient-to-br from-yellow-300 to-red-400",
    "bg-gradient-to-br from-indigo-300 to-pink-400"
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

function getRandomMemberColor() {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}


const api = {
  // Workspaces
  workspaces: {
    // Lấy tất cả workspace của một user (cả admin và non-admin)
    getUserWorkspaces: async (userId) => {
      if (API_CONFIG.USE_MOCK) {
        await delay(API_CONFIG.DELAY);
        
        // Sử dụng helper function để lấy dữ liệu
        const userWorkspacesRaw = getUserWorkspaces(Number(userId));
        
        // Format dữ liệu workspace cho UI
        return {
          success: true,
          workspace: userWorkspacesRaw.map(ws => {
            // Lấy danh sách thành viên trong workspace
            const workspaceMembers = getWorkspaceMembers(ws.workspaceID);
            
            // Format dữ liệu thành viên cho UI
            const formattedMembers = workspaceMembers.map(member => {
              const initials = member.name
                .split(' ')
                .map(part => part[0])
                .join('');
                
              return {
                id: member.memberID,
                userID: member.userID,
                name: member.name,
                email: member.email,
                isAdmin: member.isAdmin,
                initials: initials,
                bgColor: getRandomMemberColor()
              };
            });
            
            // Trả về dữ liệu workspace đã format
            return {
              id: ws.workspaceID,
              name: ws.name,
              title: ws.name,
              subtitle: ws.description,
              description: ws.description,
              isOwner: ws.isAdmin,
              members: formattedMembers,
              backgroundGradient: getRandomGradient()
            };
          })
        };
      } else {
        // Sử dụng API thực tế
        const response = await fetch(`${API_CONFIG.BASE_URL}/workspaces/user/${userId}`);
        return await response.json();
      }
    },
    
    // Lấy workspace của user hiện tại (đã đăng nhập)
    getCurrentUserWorkspaces: async () => {
      if (API_CONFIG.USE_MOCK) {
        await delay(API_CONFIG.DELAY);
        
        // Lấy user hiện tại từ localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData || !userData.id) {
          return { success: false, message: 'No user is currently logged in' };
        }
        
        // Gọi phương thức getUserWorkspaces để lấy dữ liệu
        const workspaceResponse = await api.workspaces.getUserWorkspaces(userData.id);
        return workspaceResponse;
      } else {
        // Sử dụng API thực tế
        const response = await fetch(`${API_CONFIG.BASE_URL}/workspaces/current-user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        if (response.ok) {
          return data;
        } else {
          throw new Error(data.message || 'Failed to fetch workspaces');
        }
      }
    },

    // Lấy các workspace mà user hiện tại là admin
    getCurrentUserAdminWorkspaces: async () => {
      if (API_CONFIG.USE_MOCK) {
        await delay(API_CONFIG.DELAY);
        
        // Lấy user hiện tại từ localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData || !userData.id) {
          return { success: false, message: 'No user is currently logged in' };
        }
        
        // Sử dụng helper function để lấy admin workspaces
        const userAdminWorkspacesRaw = getUserAdminWorkspaces(userData.id);
        
        // Format dữ liệu để phù hợp với UI
        return {
          success: true,
          workspace: userAdminWorkspacesRaw.map(ws => {
            // Lấy danh sách thành viên trong workspace
            const workspaceMembers = getWorkspaceMembers(ws.workspaceID);
            
            // Format dữ liệu thành viên cho UI
            const formattedMembers = workspaceMembers.map(member => {
              const initials = member.name
                .split(' ')
                .map(part => part[0])
                .join('');
                
              return {
                id: member.memberID,
                userID: member.userID,
                name: member.name,
                email: member.email,
                isAdmin: member.isAdmin,
                initials: initials,
                bgColor: getRandomMemberColor()
              };
            });
            
            // Trả về dữ liệu workspace đã format cho UI
            return {
              id: ws.workspaceID,
              name: ws.name,
              title: ws.name,
              subtitle: ws.description,
              description: ws.description,
              isOwner: true, // Đã xác định là admin nên isOwner = true
              members: formattedMembers,
              backgroundGradient: getRandomGradient()
            };
          })
        };
      } else {
        // Sử dụng API thực tế
        const response = await fetch(`${API_CONFIG.BASE_URL}/workspaces/admin/current-user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        if (response.ok) {
          return data;
        } else {
          throw new Error(data.message || 'Failed to fetch admin workspaces');
        }
      }
    },

    // Lấy các workspace mà user hiện tại không phải admin (assigned workspaces)
    getCurrentUserAssignedWorkspaces: async () => {
      if (API_CONFIG.USE_MOCK) {
        await delay(API_CONFIG.DELAY);
        
        // Lấy user hiện tại từ localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData || !userData.id) {
          return { success: false, message: 'No user is currently logged in' };
        }
        
        // Sử dụng helper function để lấy non-admin workspaces
        const userNonAdminWorkspacesRaw = getUserNonAdminWorkspaces(userData.id);
        
        // Format dữ liệu để phù hợp với UI
        return {
          success: true,
          workspace: userNonAdminWorkspacesRaw.map(ws => {
            // Lấy danh sách thành viên trong workspace
            const workspaceMembers = getWorkspaceMembers(ws.workspaceID);
            
            // Format dữ liệu thành viên cho UI
            const formattedMembers = workspaceMembers.map(member => {
              const initials = member.name
                .split(' ')
                .map(part => part[0])
                .join('');
                
              return {
                id: member.memberID,
                userID: member.userID,
                name: member.name,
                email: member.email,
                isAdmin: member.isAdmin,
                initials: initials,
                bgColor: getRandomMemberColor()
              };
            });
            
            // Trả về dữ liệu workspace đã format cho UI
            return {
              id: ws.workspaceID,
              name: ws.name,
              title: ws.name,
              subtitle: ws.description,
              description: ws.description,
              isOwner: false, // Đã xác định không phải admin nên isOwner = false
              members: formattedMembers,
              backgroundGradient: getRandomGradient()
            };
          })
        };
      } else {
        // Sử dụng API thực tế
        const response = await fetch(`${API_CONFIG.BASE_URL}/workspaces/assigned/current-user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        if (response.ok) {
          return data;
        } else {
          throw new Error(data.message || 'Failed to fetch assigned workspaces');
        }
      }
    },
    
    // Lấy chi tiết của một workspace
    getWorkspaceDetails: async (workspaceId) => {
      if (API_CONFIG.USE_MOCK) {
        await delay(API_CONFIG.DELAY);
        const details = getWorkspaceDetails(workspaceId);
        if (!details) {
          return { success: false, message: 'Workspace not found' };
        }
        return {
          success: true,
          workspace: {
            id: details.workspaceID,
            name: details.name,
            title: details.name,
            subtitle: details.description,
            description: details.description,
            members: details.members.map(member => {
              // Lấy chữ cái đầu từ tên
              const initials = member.name
                .split(' ')
                .map(name => name[0])
                .join('');
                
              return {
                id: member.userID,
                name: member.name,
                email: member.email,
                isAdmin: member.isAdmin,
                initials: initials,
                bgColor: getRandomMemberColor()
              };
            })
          }
        };
      } else {
        // Sử dụng API thực tế
        const response = await fetch(`${API_CONFIG.BASE_URL}/tasks/${taskId}`);
        return await response.json();
      }
    },
    
    // Tạo task mới
    createTask: async (taskData) => {
      if (API_CONFIG.USE_MOCK) {
        await delay(API_CONFIG.DELAY);
        
        // Tạo task mới với ID
        const newTask = {
          taskID: Date.now(),
          taskTitle: taskData.title,
          taskDescription: taskData.description,
          taskStatus: taskData.status || 'TODO',
          taskPriority: taskData.priority || 'Medium',
          dueDate: taskData.dueDate,
          workspaceID: taskData.workspaceId
        };
        
        return {
          success: true,
          task: {
            id: newTask.taskID,
            title: newTask.taskTitle,
            description: newTask.taskDescription,
            status: newTask.taskStatus,
            priority: newTask.taskPriority,
            dueDate: newTask.dueDate,
            subtasks: [],
            assignedMembers: []
          }
        };
      } else {
        // Sử dụng API thực tế
        const response = await fetch(`${API_CONFIG.BASE_URL}/tasks`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(taskData)
        });
        return await response.json();
      }
    },
    
    // Cập nhật trạng thái của task
    updateTaskStatus: async (taskId, newStatus) => {
      if (API_CONFIG.USE_MOCK) {
        await delay(API_CONFIG.DELAY);
        
        return {
          success: true,
          message: `Task status updated to ${newStatus}`
        };
      } else {
        // Sử dụng API thực tế
        const response = await fetch(`${API_CONFIG.BASE_URL}/tasks/${taskId}/status`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ status: newStatus })
        });
        return await response.json();
      }
    }
  },
  
  // Users
  users: {
    // Đăng nhập người dùng
    login: async (credentials) => {
      if (API_CONFIG.USE_MOCK) {
        await delay(API_CONFIG.DELAY);
        
        const result = loginUser(credentials.email, credentials.password);
        
        if (result.success) {
          // Lưu thông tin người dùng vào localStorage để sử dụng trong các API calls khác
          localStorage.setItem('user', JSON.stringify({
            id: result.user.userID,
            name: result.user.name,
            email: result.user.email
          }));
          
          // Mô phỏng JWT token
          localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
        }
        
        return result;
      } else {
        // Sử dụng API thực tế
        const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        return data;
      }
    },
    
    // Đăng xuất người dùng
    logout: async () => {
      if (API_CONFIG.USE_MOCK) {
        await delay(API_CONFIG.DELAY);
        
        // Xóa thông tin người dùng và token khỏi localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
        return { success: true, message: 'Logged out successfully' };
      } else {
        // Sử dụng API thực tế
        const response = await fetch(`${API_CONFIG.BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        });
        
        // Xóa token khỏi localStorage bất kể kết quả từ server
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
        return await response.json();
      }
    }
  }
};

export default api;
