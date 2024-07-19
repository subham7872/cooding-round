import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserUpdate = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/getAllUser"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  // Handle user selection for editing
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setFormData({
      fullname: user.fullname,
      email: user.email,
      mobile: user.mobile,
      password: "", // Do not pre-fill password
    });
    setEditMode(true);
  };

  // Handle user update
  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.put(
        `http://localhost:8082/api/updateUser/${selectedUser._id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("User updated successfully!");
        setEditMode(false);
        setSelectedUser(null);
        // Refresh users list
        const fetchUsers = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8082/api/getAllUser"
            );
            setUsers(response.data);
          } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users");
          }
        };
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Users</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Mobile</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user._id}</td>
                <td className="py-2 px-4 border-b">{user.fullname}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.mobile}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleUserSelect(user)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editMode && selectedUser && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Edit User</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              />
            </div>
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Update
            </button>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UserUpdate;
