import React, { useState, useEffect, useRef } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileUpdateSuccessModal from "../component/profile/ProfileUpdateSuccessfulModal";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      let userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        toast.error("User not found in localStorage", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }
      const response = await fetch("http://localhost:5000/getProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.userId,
        }),
      });

      const data = await response.json();
      if (data.success && data.userInformation) {
        const userInfo = {
          id: userData.userId,
          username: data.userInformation.name,
          email: data.userInformation.email,
          password: data.userInformation.password,
          avatarUrl: data.userInformation.avatarUrl || null,
        };
        setUserData(userInfo);
        setFormData({ ...userInfo });
        setAvatarUrl(userInfo.avatarUrl);
      } else {
        toast.error(data.message || "Failed to fetch user", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error: " + (error.message || "Unknown error"), {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const submitHandler = async (data) => {
    setLoading(true);
    const loadingToast = toast.loading("Updating user name...", {
      position: "top-right",
      pauseOnHover: false,
      closeOnClick: false,
      autoClose: false,
    });

    try {
        const response = await axios.post("http://localhost:5000/updateProfile", {
        id: userData.id,
        username: data.username,
        // avatarUrl: avatarUrl,
      });
      if (response.data.success) {
        toast.dismiss(loadingToast);
        // Show success modal instead of toast
        setShowUpdateSuccess(true);
      } else {
        toast.error(response.data.message || "Update failed", {
          position: "top-right",
        });
      }
    
      
      

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Error when update!", {
          position: "top-right",
        });
      } else if (error.request) {
        toast.error("Unable to connect to server. Please try again later.", {
          position: "top-right",
        });
      } else {
        toast.error("Error during update: " + error.message, {
          position: "top-right",
        });
      }
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file', {
        position: "top-right",
      });
      return;
    }

    // Maximum file size of 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File is too large. Maximum size is 5MB', {
        position: "top-right",
      });
      return;
    }

    setAvatarLoading(true);
    const avatarToast = toast.loading("Uploading avatar...", {
      position: "top-right",
      pauseOnHover: false,
      closeOnClick: false,
      autoClose: false,
    });
    const data = new FormData();
      data.append('userId',userData.id);
      data.append('uploaded_file', file); 
      try {
        const response = await fetch("http://localhost:5000/addProfilePicture", {
        method: 'POST',
        body: data,
      });
        const result = await response.json();
        console.log('Success:', result);  
        toast.success("Avatar updated successfully", {
        position: "top-right",
      });
      }
      catch (err) {
        console.error('Error uploading:', err);
        toast.error(`Error updating avatar: ${error.message}`, {
        position: "top-right",
      });
      }
     finally {
      toast.dismiss(avatarToast);
      setAvatarLoading(false);
    }
  }

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    submitHandler(formData);
  };

  const handleCloseSuccessModal = () => {
    setShowUpdateSuccess(false);
  };

  const handleRefreshProfile = () => {
    fetchUser();
  };

  // DEFAULT: when user not have avatar, get initials from username
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      return `${words[0][0]}${words[0][1]}`.toUpperCase();
    } else if (words.length === 1) {
      return `${words[0][0]}`.toUpperCase();
    }
    return "";
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Add a loading state while userData is null
  if (!userData) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-50 !py-8 !px-4">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl font-bold text-indigo-900 !mb-8">
            My Profile
          </h1>
          <div className="bg-white rounded-lg shadow-sm !p-6 !mb-6">
            <p>Loading profile information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 !py-8 !px-4">
      <div className="fixed top-0 right-0 left-0 z-20">
        <Navbar />
      </div>

      <div className="w-full max-w-3xl !my-15">
        <h1 className="text-3xl font-bold text-indigo-900 !mb-8">My Profile</h1>

        {/* User section */}
        <div className="bg-white rounded-lg shadow-md !p-6 !mb-6">
          <div className="flex items-center">
            {/* Avatar with image or initials */}
            <div className="relative">
              {avatarUrl ? (
                // If user has avatar image
                <div 
                  className="relative group w-20 h-20 cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {avatarLoading ? (
                      <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                </div>
              ) : (
                // Get initials instead
                <div 
                  className="relative group w-20 h-20 cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-2xl font-medium">
                    {getInitials(userData.username)}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-full opacity-0 group-hover:opacity-50 transition-opacity flex items-center justify-center">
                    {avatarLoading ? (
                      <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="!ml-6">
              <h2 className="text-2xl font-semibold">{userData.username}</h2>
              <p className="text-gray-500">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md !p-6">
          <h2 className="text-xl font-semibold text-indigo-900 !mb-6">
            Personal Information
          </h2>

          <div className="flex flex-col gap-4 ">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 !mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full !px-3 !py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 !mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                // onChange={handleInputChange}
                disabled={true}
                className="w-full !px-3 !py-2 border border-gray-300 bg-[3F4F7FA] text-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 !mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                disabled={true}
                className="w-full !px-3 !py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                className="!ml-2 text-blue-500 text-sm hover:text-blue-700 cursor-pointer"
                onClick={() => {
                  /* Add password change functionality */
                }}
              >
                Change Password
              </button>
            </div>

            {/* UPDATE btn */}
            <div className="flex justify-end !mt-6">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className={`!px-3 !py-2 ${
                  loading ? "bg-gray-400" : "bg-blue-400 hover:bg-blue-700"
                } text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer`}
              >
                {loading ? "UPDATING..." : "UPDATE"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Update Success Modal */}
      {showUpdateSuccess && (
        <ProfileUpdateSuccessModal
          onClose={handleCloseSuccessModal}
          onRefresh={handleRefreshProfile}
        />
      )}
    </div>
  );
};

export default Profile;