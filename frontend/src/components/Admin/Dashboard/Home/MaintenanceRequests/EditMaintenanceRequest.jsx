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

      console.log(response);
      if (response.data.success) {
        // If the file was successfully deleted on the server, remove it from the state
        setExistingFiles(existingFiles.filter((file) => file !== fileToRemove));
      } else {
        console.error(
          "Failed to delete the file on the server:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error deleting the file:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
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
      // handleCloseEditRequestModal(false);
    } catch (error) {
      setMessage("Failed to update maintenance request.");
    }
  };

  const formatDate = () => {
    const date = new Date(request.requestDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const viewImage = (file) => {
    setSelectedImage(file);
    setIsViewImageClicked(true);
  };

  const closeViewImageModal = (payload) => {
    console.log(payload);
    setIsViewImageClicked(payload);
  };
  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex items-center justify-items-center">
      <div className="w-[90%] h-[90%] overflow-y-scroll mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="w-full flex items-center justify-end">
          <div
            onClick={() => handleCloseEditRequestModal(false)}
            className="w-fit px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          >
            Close
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Maintenance Request
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

          {/* Display Existing Files */}
          {existingFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-gray-700 mb-2">Existing Files:</h3>
              <div className="flex flex-wrap gap-4 items-center ">
                {existingFiles.map((file, index) => (
                  <div key={index} className="text-gray-600 text-sm">
                    <div className="relative my-8 h-[300px] w-[200px] group cursor-pointer">
                      <p>{file}</p>
                      <img
                        src={`${baseUrl}/uploads/${file}`} // Adjust according to your server setup
                        alt={file}
                        className="h-full w-full object-cover rounded-md"
                      />
                      <div className="w-full mt-4 flex items-center justify-between">
                        <div
                          onClick={() =>
                            viewImage(`${baseUrl}/uploads/${file}`)
                          }
                        >
                          <MdOutlineRemoveRedEye
                            size={40}
                            className="text-blue-500"
                          />
                        </div>
                        <div onClick={() => handleRemoveExistingFile(file)}>
                          <MdDelete size={40} className="text-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <br />
          <br />
          <br />
          <div>
            <label className="block text-gray-700">Add New Files</label>
            <input
              type="file"
              name="files"
              onChange={handleFileChange}
              multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Display Selected New Files */}
          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-gray-700 mb-2">New Selected Files:</h3>
              <div className="flex flex-wrap gap-4 items-center ">
                {files.map((file, index) => (
                  <div key={index} className="text-gray-600 text-sm">
                    {file.type.startsWith("image/") ? (
                      <div>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-[200px] w-[200px] object-cover rounded-md"
                        />
                        <div className="w-full mt-4 flex items-center justify-between">
                          <div
                            onClick={() => viewImage(URL.createObjectURL(file))}
                          >
                            <MdOutlineRemoveRedEye
                              size={40}
                              className="text-blue-500"
                            />
                          </div>
                          <div onClick={() => handleRemoveExistingFile(file)}>
                            <MdDelete size={40} className="text-red-500" />
                          </div>
                        </div>
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
      {selectedImage && isViewImageClicked && (
        <ViewImage
          imgUrl={selectedImage}
          closeViewImageModal={closeViewImageModal}
        />
      )}
    </div>
  );
};

export default EditMaintenanceRequest;
