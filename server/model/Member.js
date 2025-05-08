const pool = require("../db/connect");

class Member {
  static addMember(memberData, callback) {
    const { email, role, WorkSpace, dateJoin } = memberData;

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

        // Add user to workspace
        const query =
          "INSERT INTO joinWorkSpace (isPending, isManager, role, dateJoin, userId, WorkSpace) VALUES (?, ?, ?, ?, ?, ?)";

        pool.query(
          query,
          [true, false, role, dateJoin, userId, WorkSpace],
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
                isPending: true,
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
}

module.exports = Member;
