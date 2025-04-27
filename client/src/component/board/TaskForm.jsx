import React, { useState, useRef, useEffect } from "react";

const TaskForm = ({ isOpen, onClose, onSave, members }) => {
  const fileInputRef = useRef(null);
  const [inputType, setInputType] = useState("text");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // multi-dropdown state

  const initialFormState = {
    title: "",
    description: "",
    status: "TODO",
    priority: "Medium",
    assignedMembers: [],
    dueDate: "",
    file: null,
  };

  const [formData, setFormData] = useState(initialFormState);

  const resetForm = () => {
    setFormData({ ...initialFormState });
    setInputType("text");
    setIsDropdownOpen(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    }
  };

  const handleSelectMember = (member) => {
    const isSelected = formData.assignedMembers.some((m) => m.id === member.id);

    if (isSelected) {
      // if chosen member -> erase member from list
      setFormData({
        ...formData,
        assignedMembers: formData.assignedMembers.filter(
          (m) => m.id !== member.id
        ),
      });
    } else {
      // if not chosen member -> add member to list
      setFormData({
        ...formData,
        assignedMembers: [...formData.assignedMembers, member],
      });
    }
  };

  const handleRemoveMember = (memberId) => {
    setFormData({
      ...formData,
      assignedMembers: formData.assignedMembers.filter(
        (m) => m.id !== memberId
      ),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(), // simple unique ID
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
      fileName: formData.file ? formData.file.name : null,
      assignedTo: formData.assignedMembers.map((member) => ({
        name: member.name,
        initials: member.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
        bgColor: member.bgColor || "bg-blue-700",
        id: member.id,
        email: member.email,
      })),
    };

    onSave(newTask);
    handleClose();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
        {/* FORM TITLE */}
        <div className="flex justify-between items-center !pt-6 !px-10">
          <h2 className="text-xl font-semibold">Task</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* FORM CONTENT */}
        <form onSubmit={handleSubmit} className="!px-10 !py-6">
          <div className="grid grid-cols-2 gap-4 !mb-4">
            <div>
              <label className="block text-sm font-medium !mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
                className="w-full border border-gray-400 rounded-md !p-2 text-sm focus:outline-none focus:border-1 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium !mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md !p-2 text-sm focus:outline-none focus:border-1 focus:border-blue-500"
              >
                <option value="TODO">Todo</option>
                <option value="IN-PROGRESS">In-Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="!mb-4">
            <label className="block text-sm font-medium !mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description"
              className="w-full border border-gray-400 rounded-md !p-2 text-sm focus:outline-none focus:border-1 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 !mb-4">
            <div>
              <label className="block text-sm font-medium !mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md !p-2 text-sm focus:outline-none focus:border-1 focus:border-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* dropdown container */}
            <div className="dropdown-container">
              <label className="block text-sm font-medium !mb-1">
                Assigned to
              </label>
              <div className="relative">
                {/* Dropdown toggle button */}
                <div
                  className="w-full border border-gray-400 rounded-md !p-2 text-sm focus:outline-none focus:border-blue-500 flex items-center justify-between cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {formData.assignedMembers &&
                  formData.assignedMembers.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {formData.assignedMembers.map((member) => (
                        <span
                          key={member.id}
                          className="bg-blue-100 text-blue-800 text-xs !px-2 !py-1 rounded-full flex items-center"
                        >
                          {member.name}
                          <button
                            className="!ml-1 text-blue-500 hover:text-blue-700 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveMember(member.id);
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500">Select members</span>
                  )}
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Dropdown options */}
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full !mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className={`!px-4 !py-2 cursor-pointer hover:bg-gray-100 flex items-center text-sm ${
                          formData.assignedMembers?.some(
                            (m) => m.id === member.id
                          )
                            ? "bg-blue-50"
                            : ""
                        }`}
                        onClick={() => handleSelectMember(member)}
                      >
                        <input
                          type="checkbox"
                          className="!mr-2"
                          checked={
                            formData.assignedMembers?.some(
                              (m) => m.id === member.id
                            ) || false
                          }
                          readOnly
                        />
                        {member.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 !mb-4">
            <div>
              <label className="block text-sm font-medium !mb-1">Due to</label>
              <input
                type={inputType}
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                placeholder="dd-mm-yyyy"
                onFocus={() => setInputType("date")}
                onBlur={() => !formData.dueDate && setInputType("text")}
                className="w-full border border-gray-400 rounded-md !p-2 text-sm focus:outline-none focus:border-1 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col items-center">
              <br />
              <div className="flex justify-center w-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center text-blue-900 hover:text-blue-500"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                  {formData.file ? formData.file.name : "Add file"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-5 !mt-8">
            <button
              type="button"
              onClick={handleClose}
              className="!px-7 !py-2 text-[#6299ec] font-medium rounded-md hover:bg-gray-100 cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="!px-7 !py-2 bg-[#6299ec] text-white font-medium rounded-md hover:bg-blue-900 cursor-pointer"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
