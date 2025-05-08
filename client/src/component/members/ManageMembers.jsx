import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit, FaCrown } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchMembers,
  addMember,
  deleteMember,
  updateMemberRole,
  createWorkspace,
} from "./membersService";
import {
  DeleteConfirmModal,
  AddMemberModal,
  UpdateRoleModal,
  UserNotFoundModal,
} from "./MemberModals";

const getInitials = (name) => {
  const nameStr = String(name).trim();
  return nameStr
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const avatarColors = [
  "bg-orange-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-indigo-500",
];

const getAvatarColor = (email) => {
  const index =
    [...email].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    avatarColors.length;
  return avatarColors[index];
};

const ManageMembers = () => {
  // Main states
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [workspace, setWorkspace] = useState(null);

  // Modal visibility states
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateRoleModal, setShowUpdateRoleModal] = useState(false);
  const [showUserNotFoundModal, setShowUserNotFoundModal] = useState(false);

  // Selected data states
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [memberToUpdate, setMemberToUpdate] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");
  const [notFoundEmail, setNotFoundEmail] = useState("");

  // Initialize data
  useEffect(() => {
    const storedWorkspace = JSON.parse(localStorage.getItem("workspace"));
    setWorkspace(storedWorkspace);

    if (storedWorkspace) {
      loadMembers(storedWorkspace);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Load members data
  const loadMembers = async (workspace) => {
    setIsLoading(true);
    try {
      const data = await fetchMembers(workspace);
      if (data.success) {
        // Process member data to ensure names don't have trailing numbers
        const processedMembers = data.members.map((member) => ({
          ...member,
          // Remove any trailing digits from names
          name: String(member.name).replace(/\d+$/, "").trim(),
        }));
        setMembers(processedMembers);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handler functions
  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deleteMember(memberToDelete, members, setMembers);
    if (success) {
      setShowConfirm(false);
      setMemberToDelete(null);
    }
  };

  const handleUpdateRoleClick = (member) => {
    setMemberToUpdate(member);
    setUpdatedRole(member.role);
    setShowUpdateRoleModal(true);
  };

  const handleConfirmUpdateRole = async () => {
    if (!updatedRole.trim()) {
      toast.error("Role cannot be empty");
      return;
    }

    const success = await updateMemberRole(
      memberToUpdate,
      updatedRole,
      members,
      setMembers
    );

    if (success) {
      setShowUpdateRoleModal(false);
      setMemberToUpdate(null);
    }
  };

  const handleAddClick = () => {
    if (!workspace) {
      toast.error("Please create a workspace first");
      return;
    }
    setShowAddModal(true);
  };

  const handleAddMember = async (email, role) => {
    const result = await addMember(email, role, workspace, members, setMembers);

    if (result === true) {
      setShowAddModal(false);
      return true;
    } else if (result && result.userNotFound) {
      setNotFoundEmail(email);
      setShowUserNotFoundModal(true);
      setShowAddModal(false);
      return false;
    }

    return false;
  };

  return (
    <div className="bg-[#f7f8fc] min-h-screen relative">
      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable={false}
      />

      {/* Header */}
      <div className="flex justify-between items-center !mb-6">
        <h1 className="text-xl font-bold text-[#455294]">Team Members</h1>
        <div className="flex gap-2">
          <button
            className="bg-blue-400 hover:bg-blue-900 text-white !py-2 !px-4 rounded-md text-sm font-medium cursor-pointer"
            onClick={handleAddClick}
          >
            + Add member
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : workspace ? (
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="!py-4 !px-8 text-left font-semibold">Name</th>
                <th className="!py-4 !px-8 text-left font-semibold">
                  Email address
                </th>
                <th className="!py-4 !px-8 text-left font-semibold">Role</th>
                <th className="!py-4 !px-8 text-center font-semibold">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr
                  key={index}
                  className={`border-t border-gray-200 hover:bg-gray-50`}
                >
                  {/* Name */}
                  <td className="!py-4 !px-8 text-gray-800">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold ${getAvatarColor(
                          member.email
                        )}`}
                      >
                        {getInitials(String(member.name))}
                      </div>

                      <span className=" text-[#111827] font-medium">
                        {String(member.name)}
                        {member.isManager ? (
                          <span className="!ml-2 text-yellow-500 inline-block">
                            <FaCrown size={14} />
                          </span>
                        ) : null}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="!py-4 !px-8 text-gray-700">
                    {member.isManager ? (
                      <span className="text-[#111827]">{member.email}</span>
                    ) : (
                      member.email
                    )}
                  </td>

                  {/* Role with Edit button */}
                  <td className="!py-4 !px-8 text-gray-700">
                    <div className="flex items-center gap-2">
                      {member.isManager ? (
                        <span className="text-[#455294] font-semibold">
                          Admin
                        </span>
                      ) : (
                        <>
                          <button
                            className="text-blue-600 hover:scale-130 transition cursor-pointer"
                            onClick={() => handleUpdateRoleClick(member)}
                            title="Edit Role"
                          >
                            <FaEdit size={14} />
                          </button>
                          <span>{String(member.role)}</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Delete button */}
                  <td className="!py-4 !px-8 text-center">
                    {!member.isManager && (
                      <button
                        className="text-red-600 hover:scale-110 transition"
                        onClick={() => handleDeleteClick(member)}
                        title="Delete Member"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan="4" className="!py-16 text-center text-gray-400">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {/* Modals */}
      {showConfirm && (
        <DeleteConfirmModal
          member={memberToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowConfirm(false);
            setMemberToDelete(null);
          }}
        />
      )}

      {showAddModal && (
        <AddMemberModal
          onAdd={handleAddMember}
          onCancel={() => setShowAddModal(false)}
        />
      )}

      {showUpdateRoleModal && (
        <UpdateRoleModal
          member={memberToUpdate}
          role={updatedRole}
          onRoleChange={(value) => setUpdatedRole(value)}
          onUpdate={handleConfirmUpdateRole}
          onCancel={() => {
            setShowUpdateRoleModal(false);
            setMemberToUpdate(null);
          }}
        />
      )}

      {showUserNotFoundModal && (
        <UserNotFoundModal
          email={notFoundEmail}
          onClose={() => {
            setShowUserNotFoundModal(false);
            setNotFoundEmail("");
          }}
        />
      )}
    </div>
  );
};

export default ManageMembers;
