const Member = require("../model/Member");

exports.addMember = (req, res) => {
  const { email, role, WorkSpace } = req.body;

  if (!email || !WorkSpace) {
    return res
      .status(400)
      .json({ error: true, message: "Email and workspace ID are required!" });
  }

  const dateJoin = new Date().toISOString().split("T")[0];
  const memberData = { email, role, WorkSpace, dateJoin };

  Member.addMember(memberData, (err, result) => {
    if (err) {
      console.error("Error adding member:", err);
      return res.status(500).json({
        error: true,
        message: err.message || "Error when adding member",
      });
    }

    console.log("Member added successfully!");
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
