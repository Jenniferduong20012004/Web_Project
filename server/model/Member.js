const pool = require("../db/connect");

class Member {
  static addMember(memberData, callback) {
    const { email, role, WorkSpace, dateJoin, isPending = true } = memberData;

    // First check if user exists
    const userQuery = "SELECT userId FROM User WHERE email = ?";
    pool.query(userQuery, [email], (err, results) => {
      if (err) {
        console.error("Error checking user:", err);
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback({ message: "Not found user with this email." }, null);
      }

      const userId = results[0].userId;

      // Check if user is already in workspace
      const checkQuery =
        "SELECT * FROM joinWorkSpace WHERE userId = ? AND WorkSpace = ?";
      pool.query(checkQuery, [userId, WorkSpace], (err, results) => {
        if (err) {
          console.error("Error checking existing membership:", err);
          return callback(err, null);
        }

        if (results.length > 0) {
          return callback(
            { message: "User is already a member of this workspace" },
            null
          );
        }

        // Add user to workspace with isPending set to true (invitation)
        const query =
          "INSERT INTO joinWorkSpace (isPending, isManager, role, dateJoin, userId, WorkSpace) VALUES (?, ?, ?, ?, ?, ?)";

        // Important: isPending is set to true for invitations
        pool.query(
          query,
          [isPending, false, role, dateJoin, userId, WorkSpace],
          (err, results) => {
            if (err) {
              console.error("Error adding member:", err);
              return callback(err, null);
            }

            // Get user details to return
            const userDetailsQuery =
              "SELECT name, email FROM User WHERE userId = ?";
            pool.query(userDetailsQuery, [userId], (err, userResults) => {
              if (err) {
                console.error("Error getting user details:", err);
                return callback(err, null);
              }

              return callback(null, {
                joinWorkSpace: results.insertId,
                userId: userId,
                userName: userResults[0].name,
                email: userResults[0].email,
                role: role,
                isPending: isPending,
                isManager: false,
              });
            });
          }
        );
      });
    });
  }

  static getMembers(WorkSpace, callback) {
    const query = `
      SELECT j.joinWorkSpace, j.isPending, j.isManager, j.role, j.userId, u.name as userName, u.email
      FROM joinWorkSpace j
      JOIN User u ON j.userId = u.userId
      WHERE j.WorkSpace = ?
    `;

    pool.query(query, [WorkSpace], (err, results) => {
      if (err) {
        console.error("Error fetching members:", err);
        return callback(err, null);
      }

      return callback(null, results);
    });
  }

  static deleteMember(joinWorkSpace, callback) {
    const query = "DELETE FROM joinWorkSpace WHERE joinWorkSpace = ?";

    pool.query(query, [joinWorkSpace], (err, results) => {
      if (err) {
        console.error("Error deleting member:", err);
        return callback(err, null);
      }

      if (results.affectedRows === 0) {
        return callback({ message: "Member not found" }, null);
      }

      return callback(null, { id: joinWorkSpace });
    });
  }

  static updateMemberRole(joinWorkSpace, role, callback) {
    const query = "UPDATE joinWorkSpace SET role = ? WHERE joinWorkSpace = ?";

    pool.query(query, [role, joinWorkSpace], (err, results) => {
      if (err) {
        console.error("Error updating member role:", err);
        return callback(err, null);
      }

      if (results.affectedRows === 0) {
        return callback({ message: "Member not found" }, null);
      }

      return callback(null, { success: true });
    });
  }

  // New method to accept an invitation
  static acceptInvitation(joinWorkSpace, callback) {
    const query = "UPDATE joinWorkSpace SET isPending = FALSE WHERE joinWorkSpace = ?";

    pool.query(query, [joinWorkSpace], (err, results) => {
      if (err) {
        console.error("Error accepting invitation:", err);
        return callback(err, null);
      }

      if (results.affectedRows === 0) {
        return callback({ message: "Invitation not found" }, null);
      }

      return callback(null, { success: true });
    });
  }

  // New method to get pending invitations for a user
  static getUserInvitations(userId, callback) {
    const query = `
      SELECT j.joinWorkSpace, j.isPending, j.isManager, j.role, j.dateJoin, j.WorkSpace,
             w.workspacename, w.description, w.dateCreate,
             admin.userId as adminId, admin_user.name as adminName, admin_user.email as adminEmail
      FROM joinWorkSpace j
      JOIN WorkSpace w ON j.WorkSpace = w.WorkSpace
      JOIN joinWorkSpace admin ON admin.WorkSpace = w.WorkSpace AND admin.isManager = TRUE
      JOIN User admin_user ON admin.userId = admin_user.userId
      JOIN User u ON j.userId = u.userId
      WHERE j.userId = ? AND j.isPending = TRUE
      ORDER BY j.dateJoin DESC
    `;

    pool.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching user invitations:", err);
        return callback(err, null);
      }

      // console.log("Raw invitation results:", results); // For debugging

      const invitations = results.map(invitation => ({
        joinWorkSpaceId: invitation.joinWorkSpace,
        // type: "workspace_invitation",
        read: false, // Default to unread
        timestamp: invitation.dateJoin,
        isPending: invitation.isPending,
        workspace: {
          WorkSpace: invitation.WorkSpace,
          workspacename: invitation.workspacename,
          description: invitation.description,
          dateCreate: invitation.dateCreate,
          admin: {
            userId: invitation.adminId,
            name: invitation.adminName,
            email: invitation.adminEmail,
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
          },
        },
      }));

      return callback(null, invitations);
    });
  }
}

module.exports = Member;