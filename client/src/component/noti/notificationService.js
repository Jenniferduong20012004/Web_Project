// notificationService.js - API calls for handling notifications and invitations

// Fetch user's pending invitations
export const fetchUserInvitations = async (userId) => {
  try {
    const response = await fetch("http://localhost:5000/getUserInvitations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    if (data.success) {
      // Log the raw data from the backend for debugging
      console.log("Raw invitations from API:", data.invitations);
      
      // The backend should already format data to match frontend expectations,
      // but we can validate/transform it further if needed
      return { success: true, notifications: data.invitations };
    } else {
      console.error("Failed to fetch invitations:", data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return { success: false, message: error.message };
  }
};

// Respond to a workspace invitation (accept or decline)
export const respondToInvitation = async (joinWorkSpace, accept) => {
  try {
    const response = await fetch("http://localhost:5000/respondToInvitation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ joinWorkSpace, accept }),
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, message: data.message };
    } else {
      console.error("Failed to respond to invitation:", data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error responding to invitation:", error);
    return { success: false, message: error.message };
  }
};

// Mark notification as read - This would be implemented if you track read status in the database
// For now, we handle this client-side in the NotificationDropdown component using localStorage
export const markNotificationAsRead = async (notificationId) => {
  // This is a placeholder for a server implementation
  // Currently handled client-side in the NotificationDropdown component
  return { success: true };
};

// Mark all notifications as read - This would be implemented if you track read status in the database
// For now, we handle this client-side in the NotificationDropdown component using localStorage
export const markAllNotificationsAsRead = async (userId) => {
  // This is a placeholder for a server implementation
  // Currently handled client-side in the NotificationDropdown component
  return { success: true };
};