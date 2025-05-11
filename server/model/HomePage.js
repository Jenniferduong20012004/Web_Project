const pool = require("../db/connect");

class HomePage {
  static findMyAssignedWorkSpaceByUserId(userId, callback) {
    const query = `
      SELECT 
        w.WorkSpace as id, 
        w.workspacename as workspaceName, 
        w.dateCreate,
        w.description,
        j.isPending,
        j.joinWorkSpace,
        j.role
      FROM 
        joinWorkSpace j 
      JOIN 
        WorkSpace w ON j.WorkSpace = w.WorkSpace 
      WHERE 
        j.userId = ? AND j.isManager = FALSE
    `;

    pool.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error finding assigned workspaces of user by ID:", err);
        return callback(err, null);
      }

      // Debug log to see what data is coming from the database
      console.log("Assigned workspace query results:", results);

      // Map row data to WorkSpace objects with proper field access
      // Include isPending field in the returned objects
      const workspaces = results.map((row) => {
        return {
          id: row.id,
          workspaceName: row.workspaceName,
          dateCreate: row.dateCreate,
          description: row.description || "",
          isPending: row.isPending, // Include isPending status
          joinWorkSpace: row.joinWorkSpace, // Include joinWorkSpace ID for reference
          role: row.role // Include role information
        };
      });

      return callback(null, workspaces);
    });
  }

  static findMyWorkSpaceByUserId(userId, callback) {
    // Using column aliases to ensure consistent naming
    const query = `
      SELECT 
        w.WorkSpace as id, 
        w.workspacename as workspaceName, 
        w.dateCreate,
        w.description,
        j.joinWorkSpace,
        j.role
      FROM 
        joinWorkSpace j 
      JOIN 
        WorkSpace w ON j.WorkSpace = w.WorkSpace 
      WHERE 
        j.userId = ? AND j.isManager = TRUE
    `;

    pool.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error finding managed workspaces of user by ID:", err);
        return callback(err, null);
      }

      // Debug log to see what data is coming from the database
      console.log("Managed workspace query results:", results);

      // Map row data to WorkSpace objects with proper field access
      const workspaces = results.map((row) => {
        return {
          id: row.id,
          workspaceName: row.workspaceName,
          dateCreate: row.dateCreate,
          description: row.description || "",
          isPending: false, // Managers are never pending
          joinWorkSpace: row.joinWorkSpace,
          role: row.role || "Admin"
        };
      });

      return callback(null, workspaces);
    });
  }
}

module.exports = HomePage;