import React, { useState, useRef, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

const getInitials = (name) => {
  return name
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
  const [members, setMembers] = useState([
    { name: "TT", email: "thaotrinh@gmail.com", role: "Manager" },
    {
      name: "Alex Pfeiffer",
      email: "alex@gmail.com",
      role: "Front end developer",
    },
    { name: "Mike Dean", email: "mike@gmail.com", role: "Front end developer" },
    {
      name: "Mateus Cunha",
      email: "cunha@gmail.com",
      role: "Back end developer",
    },
    {
      name: "Nzola Uemo",
      email: "nzola@gmail.com",
      role: "Back end developer",
    },
    { name: "Antony Mack", email: "mack@gmail.com", role: "UI designer" },
    {
      name: "André da Silva",
      email: "andré@gmail.com",
      role: "Quality Assurance",
    },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setMembers(members.filter((m) => m.email !== memberToDelete.email));
    setShowConfirm(false);
    setMemberToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setMemberToDelete(null);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddMember = () => {
    if (!newEmail.trim()) return;
    const name = newEmail
      .split("@")[0]
      .replace(/\./g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    setMembers([...members, { name, email: newEmail, role: "Member" }]);
    setShowAddModal(false);
    setNewEmail("");
  };

  const cancelAdd = () => {
    setShowAddModal(false);
    setNewEmail("");
  };

  return (
    <div className="bg-[#f7f8fc] min-h-screen relative">
      <div className="flex justify-between items-center !mb-6">
        <h1 className="text-xl font-bold text-[#455294]">Team Members</h1>
        <button
          className="bg-blue-400 hover:bg-blue-900 text-white !py-2 !px-4 rounded-md text-sm font-medium cursor-pointer"
          onClick={handleAddClick}
        >
          + Add member
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="!py-4 !px-8 text-left font-semibold">Name</th>
              <th className="!py-4 !px-8 text-left font-semibold">Email address</th>
              <th className="!py-4 !px-8 text-left font-semibold">Role</th>
              <th className="!py-4 !px-8 text-center font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="!py-4 !px-8 text-gray-800">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold ${getAvatarColor(
                        member.email
                      )}`}
                    >
                      {getInitials(member.name)}
                    </div>
                    <span className="text-sm text-[#111827] font-medium">
                      {member.name}
                    </span>
                  </div>
                </td>
                <td className="!py-4 !px-8 text-gray-700">{member.email}</td>
                <td className="!py-4 !px-8 text-gray-700">{member.role}</td>
                <td className="!py-4 !px-8 text-center">
                  <button
                    className="text-red-600 hover:scale-110 transition"
                    onClick={() => handleDeleteClick(member)}
                  >
                    <FaTrashAlt size={16} />
                  </button>
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-50">
          <div className="bg-white rounded-xl shadow-xl !p-8 max-w-md w-full animate-fade-in-scale">
            <div className="flex flex-col items-center">
              <div className="text-red-500 !mb-4">
                <svg
                  className="w-16 h-16 animate-bounce"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path fill="#FACC15" d="M12 2L1 21h22L12 2z" />
                  <path
                    d="M12 8v4"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16" r="1.25" fill="#000" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-500 !mb-2">DELETE</h3>
              <p className="text-center text-sm text-gray-700 !mb-2">
                Are you sure to delete member <br />
                <span className="text-[#f44336] font-semibold">
                  {memberToDelete?.name} ({memberToDelete?.email})
                </span>{" "}
                ?
              </p>
              <p className="text-sm text-gray-400 !mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-4 w-full">
                <button
                  className="w-1/2 !py-2 border text-gray-700 font-medium rounded-md hover:bg-gray-100"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="w-1/2 !py-2 bg-[#6e6cf4] text-white font-medium rounded-md hover:bg-[#4b3bbd]"
                  onClick={confirmDelete}
                >
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-50">
          <div className="bg-white rounded-xl shadow-xl !p-8 max-w-md w-full animate-fade-in-scale">
            <h3 className="text-xl font-bold text-gray-800 !mb-4">
              Add new member
            </h3>
            <label className="block text-sm text-gray-600 !mb-1">
              Email address
            </label>
            <input
              type="email"
              className="w-full border rounded-md !px-3 !py-2 !mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                className="text-[#6b7280] hover:underline text-sm font-semibold uppercase"
                onClick={cancelAdd}
              >
                Cancel
              </button>
              <button
                className="bg-[#6e6cf4] hover:bg-[#4b3bbd] text-white text-sm font-medium !px-6 !py-2 rounded-md"
                onClick={handleAddMember}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
