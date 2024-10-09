import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../constants/env.const";
import { invoiceCategories } from "../../../../constants/invoice-categories.const";

const AddInvoiceModal = ({ handleCloseAddInvoiceModal }) => {
  const [data, setData] = useState({
    maintenanceRequestId: "",
    invoiceNumber: "",
    title: "",
    amount: "",
    description: "",
    invoicedDate: "",
    dueDate: "",
    invoiceCategory: "",
    fileName: "",
    paymentStatus: "Pending",
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the amount is a valid number before submitting
    const numericAmount = parseFloat(data.amount);
    if (isNaN(numericAmount)) {
      setMessage("Please enter a valid number for the amount.");
      return;
    }

    const formData = new FormData();
    formData.append("invoiceNumber", data.invoiceNumber);
    formData.append("title", data.title);
    formData.append("amount", numericAmount); // Send the numeric amount
    formData.append("description", data.description);
    formData.append("invoicedDate", data.invoicedDate);
    formData.append("dueDate", data.dueDate);
    formData.append("invoiceCategory", data.invoiceCategory);
    formData.append("fileName", data.fileName);
    formData.append("invoice", files);
    formData.append("paymentStatus", data.paymentStatus);

    try {
      const response = await axios.post(`${baseUrl}/add-invoice`, formData);
      console.log(response);
    } catch (error) {
      setMessage("Error submitting invoice.");
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  useEffect(() => {
    getMaintenanceRequests();
  }, []);

  const getMaintenanceRequests = async () => {
    const response = await axios.get(`${baseUrl}/maintenance-requests`);
    setMaintenanceRequests(response.data.maintenanceRequests);
  };
  console.log(files);
  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex items-center justify-center">
      <div className="w-[800px] max-w-full h-[85%] overflow-y-auto mx-auto bg-white p-8 rounded-lg shadow-xl">
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add Invoice</h2>
          <button
            onClick={() => handleCloseAddInvoiceModal(false)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2">
                Maintenance Request
              </label>
              <label className="font-semibold text-gray-600 text-xs mb-4">
                Please select a maintenance request if this invoice is linked to
                one
              </label>
              <select
                name="maintenanceRequestId"
                id="maintenanceRequestId"
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                value={data.maintenanceRequestId}
              >
                <option value="">Select Request</option>
                {maintenanceRequests.map((request, index) => (
                  <option key={index} value={`${request.maintenanceRequestId}`}>
                    {request.description}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2">
                Invoice Number
              </label>
              <input
                type="text"
                name="invoiceNumber"
                value={data.invoiceNumber}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                value={data.amount}
                onChange={handleChange}
                min="0"
                step="0.01" // Allow decimals in the input
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={data.description}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2">
                Invoiced Date
              </label>
              <input
                type="date"
                name="invoicedDate"
                value={data.invoicedDate}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={data.dueDate}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2">
                Invoice Category
              </label>
              <select
                name="invoiceCategory"
                value={data.invoiceCategory}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              >
                <option value="">Please select a category</option>
                {invoiceCategories.map((category, index) => (
                  <option value={`${category}`} key={index}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2">
                Payment Status
              </label>
              <select
                name="paymentStatus"
                value={data.paymentStatus}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              >
                <option value="Unpaid">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2">
                File Name
              </label>
              <input
                type="text"
                name="fileName"
                value={data.fileName}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* File Input */}
          <div className="mt-6">
            <label className="font-semibold text-gray-600 mb-2">
              Upload Invoice
            </label>
            <input
              type="file"
              name="invoice"
              onChange={handleFileChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg mt-2 focus:ring focus:ring-indigo-300"
            />
          </div>

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
      </div>
    </div>
  );
};

export default AddInvoiceModal;
