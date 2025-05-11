const Member = require("../model/Member");

exports.addMember = (req, res) => {
  const { email, role, WorkSpace } = req.body;

  if (!email || !WorkSpace) {
    return res
      .status(400)
      .json({ error: true, message: "Email and workspace ID are required!" });
  }

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

exports.deleteMember = (req, res) => {
  const { joinWorkSpace } = req.body;

  if (!joinWorkSpace) {
    return res
      .status(400)
      .json({ error: true, message: "Member join ID is required!" });
  }

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
};

exports.updateMemberRole = (req, res) => {
  const { joinWorkSpace, role } = req.body;

  if (!joinWorkSpace || !role) {
    return res
      .status(400)
      .json({ error: true, message: "Member join ID and role are required!" });
  }

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
};


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

