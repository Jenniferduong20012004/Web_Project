import React, { useState, useRef, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import userAvatar from "../../assets/user-avatar.svg";

const ManageMembers = () => {
  const [members, setMembers] = useState([
    { name: "TT", email: "thaotrinh@gmail.com", role: "Manager" },
    { name: "Alex Pfeiffer", email: "alex@gmail.com", role: "Member" },
    { name: "Mike Dean", email: "mike@gmail.com", role: "Member" },
    { name: "Mateus Cunha", email: "cunha@gmail.com", role: "Member" },
    { name: "Nzola Uemo", email: "nzola@gmail.com", role: "Member" },
    { name: "Antony Mack", email: "mack@gmail.com", role: "Member" },
    { name: "André da Silva", email: "andré@gmail.com", role: "Member" },
  ]);

  // add state
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const addMemberModalRef = useRef(null);

  // delete state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const deleteModalRef = useRef(null);

  // add member modal
  const openAddMemberModal = () => {
    setShowAddMemberModal(true);
  };

  const closeAddMemberModal = () => {
    setShowAddMemberModal(false);
    setNewMemberEmail("");
  };

  const addNewMember = () => {
    if (newMemberEmail && newMemberEmail.trim() !== "") {
      // Extract name from email (before @)
      const nameFromEmail = newMemberEmail.split("@")[0];
      // Capitalize first letter of each word
      const formattedName = nameFromEmail
        .split(".")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const newMember = {
        name: formattedName,
        email: newMemberEmail,
        role: "Member",
      };

      setMembers([...members, newMember]);
      closeAddMemberModal();
    }
  };

  // delete modal
  const deleteMember = (member) => {
    setMemberToDelete(member);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      setMembers(
        members.filter((member) => member.email !== memberToDelete.email)
      );
      setShowConfirmation(false);
      setMemberToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setMemberToDelete(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        deleteModalRef.current &&
        !deleteModalRef.current.contains(event.target)
      ) {
        cancelDelete();
      }
      if (
        addMemberModalRef.current &&
        !addMemberModalRef.current.contains(event.target)
      ) {
        closeAddMemberModal();
      }
    };

    if (showConfirmation || showAddMemberModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConfirmation, showAddMemberModal]);

  return (
    <div className="bg-gray-50">
      <div className="flex justify-between items-center !mb-4">
        <h2 className="text-xl font-bold text-indigo-900">
          Manage team members
        </h2>
        <button
          className="bg-blue-400 hover:bg-blue-900 text-white !px-4 !py-2 rounded-lg transition"
          onClick={openAddMemberModal}
        >
          Add member
        </button>
      </div>
      <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left !py-3 !px-4 font-medium">Name</th>
            <th className="text-left !py-3 !px-4 font-medium">Email address</th>
            <th className="text-left !py-3 !px-4 font-medium">Role</th>
            <th className="text-left !py-3 !px-4 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index} className="border-b">
              <td className="!py-3 !px-4 flex items-center gap-3">
                <img
                  src={userAvatar}
                  alt="avatar"
                  className="!w-8 !h-8 rounded-full"
                />
                <span>{member.name}</span>
              </td>
              <td className="!py-3 !px-4">{member.email}</td>
              <td className="!py-3 !px-4">{member.role}</td>
              <td className="!py-3 !px-8">
                <button
                  className="text-red-500 hover:text-red-700 transition hover:cursor-pointer"
                  onClick={() => deleteMember(member)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pop up for Delete confirmation */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div
            ref={deleteModalRef}
            className="bg-white rounded-lg !p-6 shadow-xl max-w-md w-full"
          >
            <div className="flex flex-col items-center">
              <div className="text-red-500 !mb-4">
                <svg
                  className="!w-16 !h-16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8V13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 16V16.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center !mb-2">DELETE</h3>
              <p className="text-center !mb-6">
                Are you sure to delete member
                <br />
                <span className="text-red-500">{memberToDelete?.email}</span>?
              </p>
              <p className="text-center text-gray-500 !mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-4 w-full">
                <button
                  className="w-1/2 !py-2 text-[#6299ec] font-medium rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="w-1/2 !py-2 bg-[#6299ec] text-white font-medium rounded-md hover:bg-blue-900 cursor-pointer"
                  onClick={confirmDelete}
                >
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pop up for Add new member */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div
            ref={addMemberModalRef}
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
          >
            <div className="!p-6">
              <h3 className="text-2xl font-bold !mb-6">Add New Member</h3>

              <div className="!mb-4">
                <label className="block text-gray-700 text-2sm font-medium !mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full !py-2 !px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Add email address"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
              </div>

              <div className="flex justify-end !mt-8 gap-4">
                <button
                  className="!py-2 !px-6 text-[#6299ec] font-medium rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={closeAddMemberModal}
                >
                  CANCEL
                </button>
                <button
                  className="!py-2 !px-6 bg-[#6299ec] text-white font-medium rounded-md hover:bg-blue-900 cursor-pointer"
                  onClick={addNewMember}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
