import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../../constants/env.const";
import { MdDelete } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ViewImage from "./ViewImage";

const EditMaintenanceRequest = ({ handleCloseEditRequestModal, request }) => {
  const [formData, setFormData] = useState({
    userId: request.userId,
    unitNumber: request.unitNumber,
    requestDate: request.requestDate,
    priority: request.priority,
    status: request.status,
    description: request.description,
    assignedVendorId: request.assignedVendorId,
  });

  const [files, setFiles] = useState([]); // New files selected by the user
  const [existingFiles, setExistingFiles] = useState(request.files || []); // Existing files
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isViewImageClicked, setIsViewImageClicked] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleRemoveExistingFile = async (fileToRemove) => {
    try {
      // Send a DELETE request to the server to remove the file
      const response = await axios.delete(
        `${baseUrl}/delete-maintenance-images/${fileToRemove}/${request.maintenanceRequestId}`
      );

      if (response.data.success) {
        // Remove it from the state if the file was deleted on the server
        setExistingFiles(existingFiles.filter((file) => file !== fileToRemove));
      }
    } catch (error) {
      console.error("Error deleting the file:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = new FormData();
    data.append("userId", formData.userId);
    data.append("unitNumber", formData.unitNumber);
    data.append("requestDate", formData.requestDate);
    data.append("priority", formData.priority);
    data.append("status", formData.status);
    data.append("description", formData.description);
    data.append("assignedVendorId", formData.assignedVendorId);
    data.append("existingFiles", JSON.stringify(existingFiles)); // Add existing files to the form data

    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    try {
      await axios.put(
        `${baseUrl}/maintenance-requests/${request.maintenanceRequestId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Maintenance request updated successfully!");
    } catch (error) {
      setMessage("Failed to update maintenance request.");
    }
  };

  const viewImage = (file) => {
    setSelectedImage(file);
    setIsViewImageClicked(true);
  };

  const closeViewImageModal = (payload) => {
    setIsViewImageClicked(payload);
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex items-center justify-center transition-all duration-300">
      <div className="w-[800px] max-w-full h-[85%] overflow-y-auto mx-auto bg-white p-8 rounded-lg shadow-xl">
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Maintenance Request
          </h2>
          <button
            onClick={() => handleCloseEditRequestModal(false)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600">User ID</label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600">Unit Number</label>
              <input
                type="text"
                name="unitNumber"
                value={formData.unitNumber}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600">
                Request Date
              </label>
              <input
                type="date"
                name="requestDate"
                value={formData.requestDate}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              ></textarea>
            </div>
          </div>

          {/* Display Existing Files */}
          {existingFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-gray-700 font-semibold mb-2">
                Existing Files:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {existingFiles.map((file, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-100 rounded-lg shadow-lg overflow-hidden"
                  >
                    <img
                      src={`${baseUrl}/uploads/${file}`}
                      alt={file}
                      className="w-full h-[150px] object-cover group-hover:opacity-90 transition-opacity duration-300 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center space-x-4">
                      <MdOutlineRemoveRedEye
                        size={30}
                        className="text-white cursor-pointer"
                        onClick={() => viewImage(`${baseUrl}/uploads/${file}`)}
                      />
                      <MdDelete
                        size={30}
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleRemoveExistingFile(file)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload New Files */}
          <div className="mt-6">
            <label className="font-semibold text-gray-600">Add New Files</label>
            <input
              type="file"
              name="files"
              onChange={handleFileChange}
              multiple
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg mt-2 focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Display Selected New Files */}
          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-gray-700 font-semibold mb-2">
                New Selected Files:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-100 rounded-lg shadow-lg overflow-hidden"
                  >
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-[150px] object-cover group-hover:opacity-90 transition-opacity duration-300 ease-in-out"
                      />
                    ) : (
                      <p className="p-4 text-gray-600">{file.name}</p>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center space-x-4">
                      <MdOutlineRemoveRedEye
                        size={30}
                        className="text-white cursor-pointer"
                        onClick={() => viewImage(URL.createObjectURL(file))}
                      />
                      <MdDelete
                        size={30}
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleRemoveExistingFile(file)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>

          {message && (
            <p className="text-center text-red-500 mt-4">{message}</p>
          )}
        </form>

        {selectedImage && isViewImageClicked && (
          <ViewImage
            imgUrl={selectedImage}
            closeViewImageModal={closeViewImageModal}
          />
        )}
      </div>
    </div>
  );
};

export default EditMaintenanceRequest;
