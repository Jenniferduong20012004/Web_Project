const pool = require("../db/connect");
const supabase = require("../db/superbaseClient");
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

        pool.query(
          query,
          [isPending ? 1 : 0, 0, role, dateJoin, userId, WorkSpace],
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
                isPending: isPending ? 1 : 0,
                isManager: 0,
              });
            });
          }
        );
      });
    });
  }

  static getMembers(WorkSpace, callback) {
    const query = `
    SELECT j.joinWorkSpace, j.isPending, j.isManager, j.role, j.userId, u.name as userName, u.email, u.photoPath
    FROM joinWorkSpace j
    JOIN User u ON j.userId = u.userId
    WHERE j.WorkSpace = ?
  `;

    pool.query(query, [WorkSpace], (err, results) => {
      if (err) {
        console.error("Error fetching members:", err);
        return callback(err, null);
      }

      const formattedResults = results.map((row) => {
        const photoLink = row.photoPath
          ? `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${row.photoPath}`
          : null;

        return {
          ...row,
          photoPath: photoLink,
        };
      });

      return callback(null, formattedResults);
    });
  }

  static getActiveMembers(WorkSpace, callback) {
    const query = `
    SELECT j.joinWorkSpace, j.isPending, j.isManager, j.role, j.userId, u.name as userName, u.email, u.photoPath
    FROM joinWorkSpace j
    JOIN User u ON j.userId = u.userId
    WHERE j.WorkSpace = ? AND j.isPending = 0
    ORDER BY j.isManager DESC, u.name ASC
  `;

    pool.query(query, [WorkSpace], (err, results) => {
      if (err) {
        console.error("Error fetching active members:", err);
        return callback(err, null);
      }

      const formattedResults = results.map((row) => {
        // Generate initial letters from name if photo is not available
        const nameParts = row.userName.split(" ");
        const initials =
          nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[1][0]}`
            : row.userName.substring(0, 2);

        // Generate a background color based on the user ID for consistency
        const colorOptions = [
          "bg-blue-500",
          "bg-red-500",
          "bg-green-500",
          "bg-purple-500",
          "bg-yellow-500",
          "bg-pink-500",
          "bg-indigo-500",
          "bg-teal-500",
        ];
        const bgColor = colorOptions[row.userId % colorOptions.length];

        const photoLink = row.photoPath
          ? `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${row.photoPath}`
          : null;

        return {
          ...row,
          photoPath: photoLink,
          initials: initials.toUpperCase(),
          bgColor: bgColor,
        };
      });

      return callback(null, formattedResults);
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
    const query =
      "UPDATE joinWorkSpace SET isPending = FALSE WHERE joinWorkSpace = ?";

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
             admin.userId as adminId, admin_user.photoPath as photo, admin_user.name as adminName, admin_user.email as adminEmail
      FROM joinWorkSpace j
      JOIN WorkSpace w ON j.WorkSpace = w.WorkSpace
      JOIN joinWorkSpace admin ON admin.WorkSpace = w.WorkSpace AND admin.isManager = 1
      JOIN User admin_user ON admin.userId = admin_user.userId
      JOIN User u ON j.userId = u.userId
      WHERE j.userId = ? AND j.isPending = 1
      ORDER BY j.dateJoin DESC
    `;

    pool.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching user invitations:", err);
        return callback(err, null);
      }

      const invitations = results.map((invitation) => ({
        joinWorkSpaceId: invitation.joinWorkSpace,
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
            avatar: `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${invitation.photo}`,
          },
        },
      }));

      return callback(null, invitations);
    });
  }

  // check admin = 1
  static checkAdmin(userId, workspaceId, callback) {
    const query = `
      SELECT isManager
      FROM joinWorkSpace
      WHERE userId = ? AND WorkSpace = ?
    `;

    pool.query(query, [userId, workspaceId], (err, results) => {
      if (err) {
        console.error("Error checking admin permission:", err);
        return callback(err, false);
      }

      if (results.length === 0) {
        return callback(null, false);
      }

      return callback(null, results[0].isManager === 1);
    });
  }

  // check admin for a specific member
  static checkAdminForMember(userId, joinWorkSpaceId, callback) {
    const query = `
      SELECT j1.isManager
      FROM joinWorkSpace j1
      JOIN joinWorkSpace j2 ON j1.WorkSpace = j2.WorkSpace
      WHERE j1.userId = ? AND j2.joinWorkSpace = ?
    `;

    pool.query(query, [userId, joinWorkSpaceId], (err, results) => {
      if (err) {
        console.error("Error checking admin permission for member:", err);
        return callback(err, false);
      }

      if (results.length === 0) {
        return callback(null, false);
      }

      return callback(null, results[0].isManager === 1);
    });
  }

  // get a specific user role in a workspace
  static getUserRole(userId, workspaceId, callback) {
    const query = `
      SELECT isManager, role
      FROM joinWorkSpace
      WHERE userId = ? AND WorkSpace = ?
    `;

    pool.query(query, [userId, workspaceId], (err, results) => {
      if (err) {
        console.error("Error fetching user role:", err);
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback(null, { isManager: 0, role: "Member" });
      }

      return callback(null, results[0]);
    });
  }
}

module.exports = Member;
