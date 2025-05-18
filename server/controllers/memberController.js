const Member = require("../model/Member");

exports.addMember = (req, res) => {
  const { email, role, WorkSpace, userId } = req.body;

  if (!email || !WorkSpace) {
    return res
      .status(400)
      .json({ error: true, message: "Email and workspace ID are required!" });
  }

  // check if admin role before add new mem
  if (userId) {
    Member.checkAdmin(userId, WorkSpace, (err, isAdmin) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Error checking permission",
        });
      }

      if (!isAdmin) {
        return res.status(403).json({
          success: false,
          code: "PERMISSION_DENIED",
          message: "You don't have permission to add members",
        });
      }

      addMemberProcess(email, role, WorkSpace, res);
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "User ID is required!",
    });
  }
};

// ADD MEMBER
const addMemberProcess = (email, role, WorkSpace, res) => {
  const dateJoin = new Date().toISOString().split("T")[0];
  const memberData = { email, role, WorkSpace, dateJoin, isPending: true };

  Member.addMember(memberData, (err, result) => {
    if (err) {
      console.error("Error adding member:", err);

      if (err.message && err.message.includes("Not found user")) {
        return res.status(404).json({
          success: false,
          code: "USER_NOT_FOUND",
          message: err.message,
        });
      }

      return res.status(500).json({
        error: true,
        message: err.message || "Error when adding member",
      });
    }

    console.log("Invitation sent successfully!");
    res.status(201).json({ success: true, member: result });
  });
};

exports.getMembers = (req, res) => {
  const { workspace } = req.body;

  if (!workspace) {
    return res
      .status(400)
      .json({ error: true, message: "Workspace ID is required!" });
  }

  Member.getMembers(workspace, (err, results) => {
    if (err) {
      console.error("Error fetching members:", err);
      return res
        .status(500)
        .json({ error: true, message: "Error fetching members" });
    }

    res.status(200).json({ success: true, members: results });
  });
};

exports.getActiveMembers = (req, res) => {
  const { workspaceId } = req.body;

  if (!workspaceId) {
    return res
      .status(400)
      .json({ error: true, message: "Workspace ID is required!" });
  }

  Member.getActiveMembers(workspaceId, (err, results) => {
    if (err) {
      console.error("Error fetching active members:", err);
      return res
        .status(500)
        .json({ error: true, message: "Error fetching active members" });
    }

    res.status(200).json({ success: true, members: results });
  });
};

exports.deleteMember = (req, res) => {
  const { joinWorkSpace, userId } = req.body;

  if (!joinWorkSpace) {
    return res
      .status(400)
      .json({ error: true, message: "Member join ID is required!" });
  }

  // check admin to delete mem
  Member.checkAdminForMember(userId, joinWorkSpace, (err, isAdmin) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Error checking permission",
      });
    }

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        code: "PERMISSION_DENIED",
        message: "You don't have permission to delete members",
      });
    }

    // DELETE MEMBER
    Member.deleteMember(joinWorkSpace, (err, result) => {
      if (err) {
        console.error("Error deleting member:", err);
        return res.status(500).json({
          error: true,
          message: err.message || "Error when deleting member",
        });
      }

      console.log("Member deleted successfully!");
      res.status(200).json({ success: true, id: result.id });
    });
  });
};

exports.updateMemberRole = (req, res) => {
  const { joinWorkSpace, role, userId } = req.body;

  if (!joinWorkSpace || !role) {
    return res
      .status(400)
      .json({ error: true, message: "Member join ID and role are required!" });
  }

  // Kiểm tra quyền admin trước khi cập nhật vai trò thành viên
  Member.checkAdminForMember(userId, joinWorkSpace, (err, isAdmin) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Error checking permission",
      });
    }

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        code: "PERMISSION_DENIED",
        message: "You don't have permission to update member roles",
      });
    }

    // UPDATE MEMBER ROLE
    Member.updateMemberRole(joinWorkSpace, role, (err, result) => {
      if (err) {
        console.error("Error updating member role:", err);
        return res.status(500).json({
          error: true,
          message: err.message || "Error when updating member role",
        });
      }

      console.log("Member role updated successfully!");
      res.status(200).json({ success: true });
    });
  });
};

// API to check user admin in workspace
exports.getCurrentUserRole = (req, res) => {
  const { userId, workspaceId } = req.body;

  if (!userId || !workspaceId) {
    return res
      .status(400)
      .json({ error: true, message: "User ID and Workspace ID are required!" });
  }

  Member.getUserRole(userId, workspaceId, (err, result) => {
    if (err) {
      console.error("Error fetching user role:", err);
      return res
        .status(500)
        .json({ error: true, message: "Error fetching user role" });
    }

    res.status(200).json({
      success: true,
      isAdmin: result?.isManager || 0,
      role: result?.role || "Member",
    });
  });
};

// Accept/Decline workspace inviation
exports.respondToInvitation = (req, res) => {
  const { joinWorkSpace, accept } = req.body;

  if (joinWorkSpace === undefined) {
    return res
      .status(400)
      .json({ error: true, message: "joinWorkSpace ID is required!" });
  }

  if (accept) {
    // Accept invitation
    Member.acceptInvitation(joinWorkSpace, (err, result) => {
      if (err) {
        console.error("Error accepting invitation:", err);
        return res.status(500).json({
          error: true,
          message: err.message || "Error when accepting invitation",
        });
      }

      console.log("Invitation accepted successfully!");
      res
        .status(200)
        .json({ success: true, message: "Invitation accepted successfully" });
    });
  } else {
    // Decline invitation (delete the record)
    Member.deleteMember(joinWorkSpace, (err, result) => {
      if (err) {
        console.error("Error declining invitation:", err);
        return res.status(500).json({
          error: true,
          message: err.message || "Error when declining invitation",
        });
      }

      console.log("Invitation declined successfully!");
      res
        .status(200)
        .json({ success: true, message: "Invitation declined successfully" });
    });
  }
};

// Get pending invitations for a user
exports.getUserInvitations = (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ error: true, message: "User ID is required!" });
  }

  Member.getUserInvitations(userId, (err, results) => {
    if (err) {
      console.error("Error fetching invitations:", err);
      return res
        .status(500)
        .json({ error: true, message: "Error fetching invitations" });
    }

    res.status(200).json({ success: true, invitations: results });
  });
};
