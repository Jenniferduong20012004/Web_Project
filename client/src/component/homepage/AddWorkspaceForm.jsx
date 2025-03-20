import React, { useState } from "react";
import axios from "axios";
const AddWorkspaceForm = ({ isOpen, onClose, onAdd }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateCreate = new Date().toISOString().split('T')[0];


    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/addWorkSpace", {
          workspacename: workspaceName,
          description: description,
          dateCreate: dateCreate,
        });
      const result = await response.data;
      onAdd(result);
      setWorkspaceName("");
      setDescription("");
      onClose();
    } catch (error) {
      alert("Error: " + (error.response ? JSON.stringify(error.response.data) : error.message));
      alert (dateCreate)
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 !z-50 flex items-center justify-center">
      {/* Darker backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      {/* Form content */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md !p-6 !z-10">
        <h2 className="text-2xl font-bold !mb-4">Add new Workspace</h2>

        <form onSubmit={handleSubmit}>
          <div className="!mb-4">
            <label htmlFor="name" className="block font-medium !mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Workspace name"
              className="w-full !p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#6299ec] focus:border-1"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              required
            />
          </div>
          <div className="!mb-6">
            <label htmlFor="description" className="block font-medium !mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Task description"
              className="w-full !p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#6299ec] focus:border-1"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-5">
            <button
              type="button"
              onClick={onClose}
              className="!px-7 !py-2 text-[#6299ec] font-medium rounded-md hover:bg-gray-100"
              disabled={loading}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="!px-7 !py-2 bg-[#6299ec] text-white font-medium rounded-md hover:bg-blue-900 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "ADDING..." : "ADD"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkspaceForm;
