import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../../constants/env.const";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../../../atoms/userAtom";
const CreateMaintenanceRequest = ({ handleCloseCreateRequestModal }) => {
  const user = useRecoilValue(userState);
  const [formData, setFormData] = useState({
    userId: user.user_id,
    unitNumber: "",
    requestDate: "",
    priority: "Low",
    status: "Pending",
    description: "",
    assignedVendorId: 1,
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("userId", formData.userId);
    data.append("unitNumber", formData.unitNumber);
    data.append("requestDate", formData.requestDate);
    data.append("priority", formData.priority);
    data.append("status", formData.status);
    data.append("description", formData.description);
    data.append("assignedVendorId", formData.assignedVendorId);

    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    try {
      const response = await axios.post(
        `${baseUrl}/maintenance-requests`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Maintenance request created successfully!");
      setFormData({
        userId: "",
        unitNumber: "",
        requestDate: "",
        priority: "Low",
        status: "Pending",
        description: "",
        assignedVendorId: "",
      });
      setFiles([]);
    } catch (error) {
      setMessage("Failed to create maintenance request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex items-center justify-items-center">
      <div className="w-[600px] h-[90%] overflow-y-scroll mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="w-full flex items-center justify-end">
          <div
            onClick={() => handleCloseCreateRequestModal(false)}
            className="w-fit px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          >
            Close
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Maintenance Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">User ID</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-gray-700">Unit Number</label>
            <input
              type="text"
              name="unitNumber"
              value={formData.unitNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-gray-700">Request Date</label>
            <input
              type="date"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-gray-700">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">Files</label>
            <input
              type="file"
              name="files"
              onChange={handleFileChange}
              multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Display Selected Files */}
          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-gray-700 mb-2">Selected Files:</h3>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                {files.map((file, index) => (
                  <div key={index} className="text-gray-600 text-sm">
                    {file.type.startsWith("image/") ? (
                      <div className="cursor-pointer">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-[200px] w-[200px] object-contain rounded-md"
                        />
                      </div>
                    ) : (
                      <p>{file.name}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>

          {message && (
            <p className="text-center text-red-500 mt-4">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateMaintenanceRequest;
