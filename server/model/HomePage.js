const pool = require("../db/connect");
          const bgColorOptions = [
            "bg-blue-700",
            "bg-orange-500",
            "bg-purple-600",
            "bg-green-600",
            "bg-red-600",
          ];
class HomePage {
  static findMyAssignedWorkSpaceByUserId(userId, callback) {
    const query = `
    SELECT 
  w.WorkSpace AS id, 
  w.workspacename AS workspaceName, 
  w.dateCreate,
  w.description,
  j.isPending,
  j.joinWorkSpace,
  j.role,
  mng.userId AS managerId,
  mng.name AS managerName,
  mng.photoPath AS photo
FROM 
  joinWorkSpace j
JOIN 
  WorkSpace w ON j.WorkSpace = w.WorkSpace
-- Join to get manager info for the same workspace
LEFT JOIN joinWorkSpace jm ON jm.WorkSpace = w.WorkSpace AND jm.isManager = TRUE
LEFT JOIN User mng ON mng.userId = jm.userId
WHERE 
  j.userId = ? AND j.isManager = FALSE;

    `;
  const getMemQuery = `
    SELECT 
      j.joinWorkSpace,
      u.userId,
      u.name,
      u.email,
      u.photoPath
    FROM joinWorkSpace j 
    JOIN User u ON j.userId = u.userId
    WHERE j.WorkSpace = ?
  `;
    pool.query(query, [userId], async (err, results) => {
      if (err) {
        console.error("Error finding assigned workspaces of user by ID:", err);
        return callback(err, null);
      }
          try {
      // Map each workspace to a Promise that fetches its members
      const workspacePromises = results.map((row) => {
        return new Promise((resolve, reject) => {
          pool.query(getMemQuery, [row.id], (memberErr, memberResults) => {
            if (memberErr) return reject(memberErr);
            const members = memberResults.map((r) => ({
              id: r.userId,
              name: r.name,
              email: r.email,
              bgColor: bgColorOptions[r.userId % bgColorOptions.length],
              photoPath: r.photoPath 
                ? `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${r.photoPath}` 
                : null,
              initials: r.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            }));
            

            resolve({
          photoPath: row.photo 
                ? `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${row.photo}` 
                : null,
              initials: row.managerName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase(),

          id: row.id,
          workspaceName: row.workspaceName,
          dateCreate: row.dateCreate,
          description: row.description || "",
          isPending: row.isPending, // Include isPending status
          joinWorkSpace: row.joinWorkSpace, // Include joinWorkSpace ID for reference
          members: members,
          role: row.role // Include role information
            });
          });
        });
      });

      // Wait for all workspace member queries to complete
      const workspaces = await Promise.all(workspacePromises);
      return callback(null, workspaces);
    } catch (err) {
      console.error("Error fetching members:", err);
      return callback(err, null);
    }

    });
  }

  static findMyWorkSpaceByUserId(userId, callback) {
  const query = `
    SELECT 
      w.WorkSpace as id, 
      w.workspacename as workspaceName, 
      w.dateCreate,
      w.description,
      j.joinWorkSpace,
      j.role,
      u.photoPath,
      u.name,
      u.userId
    FROM 
      joinWorkSpace j 
    JOIN 
      WorkSpace w ON j.WorkSpace = w.WorkSpace 
      join
      User u on j.userId = u.userId
    WHERE 
      j.userId = ? AND j.isManager = TRUE
  `;

  const getMemQuery = `
    SELECT 
      j.joinWorkSpace,
      u.userId,
      u.name,
      u.email,
      u.photoPath
    FROM joinWorkSpace j 
    JOIN User u ON j.userId = u.userId
    WHERE j.WorkSpace = ?
  `;

  pool.query(query, [userId], async (err, results) => {
    if (err) {
      console.error("Error finding managed workspaces of user by ID:", err);
      return callback(err, null);
    }

    try {
      // Map each workspace to a Promise that fetches its members
      const workspacePromises = results.map((row) => {
        return new Promise((resolve, reject) => {
          pool.query(getMemQuery, [row.id], (memberErr, memberResults) => {
            if (memberErr) return reject(memberErr);
            const members = memberResults.map((r) => ({
              id: r.userId,
              name: r.name,
              email: r.email,
              bgColor: bgColorOptions[r.userId % bgColorOptions.length],
              photoPath: r.photoPath 
                ? `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${r.photoPath}` 
                : null,
              initials: r.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            }));

            resolve({
              id: row.id,
              workspaceName: row.workspaceName,
              dateCreate: row.dateCreate,
              description: row.description || "",
              isPending: false,
              joinWorkSpace: row.joinWorkSpace,
              bgColor: bgColorOptions[row.userId % bgColorOptions.length],
              photoPath: row.photoPath 
                ? `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${row.photoPath}` 
                : null,
              initials: row.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase(),
              members: members,
              role: row.role || "Admin"
            });
          });
        });
      });

      // Wait for all workspace member queries to complete
      const workspaces = await Promise.all(workspacePromises);
      return callback(null, workspaces);
    } catch (err) {
      console.error("Error fetching members:", err);
      return callback(err, null);
    }
  });
}
}

module.exports = HomePage;