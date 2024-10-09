import React, { useEffect, useState } from "react";
import avatar from "../../../../assets/avatar.png";
import axios from "axios";
import { baseUrl } from "../../../../constants/env.const";
import UpdateInvoiceModal from "./UpdateInvoiceModal";
const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [isUpdateInvoiceModalClicked, setIsUpdateInvoiceModalClicked] =
    useState(false);
  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = async () => {
    try {
      const response = await axios.get(`${baseUrl}/get-all-invoices`);
      setInvoices(response.data.invoices);
    } catch (error) {
      console.log(error);
    }
  };

  const updateInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsUpdateInvoiceModalClicked(true);
  };

  const handleCloseUpdateInvoiceModal = (payload) => {
    setIsUpdateInvoiceModalClicked(payload);
  };

  const determineClass = (paymentStatus) => {
    if (paymentStatus === "Pending") {
      return "w-fit px-[10px] rounded-md bg-red-300 text-red-600 font-bold";
    } else {
      return "w-fit px-[10px] rounded-md bg-green-300 text-green-600 font-bold";
    }
  };
  return (
    <div>
      <table className="w-full bg-red-50 overflow-auto mt-8 rounded-md shadow-md">
        <thead>
          <tr>
            <th className="text-left p-4">Invoice Number</th>
            <th className="text-left p-4">Description</th>
            <th className="text-left p-4">Payment Status</th>
            <th className="text-left p-4">Category</th>
            <th className="text-left p-4">Created</th>
            <th className="text-left p-4">Due Date</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index} className="bg-white ">
              <td className="p-4">{invoice.invoiceNumber}</td>
              <td className="p-4">{invoice.description}</td>
              <td className="p-4">
                <div className={determineClass(invoice.paymentStatus)}>
                  {invoice.paymentStatus}
                </div>
              </td>
              <td>{invoice.invoiceCategory}</td>
              <td className="p-4">
                {new Date(invoice.createdAt).toLocaleDateString()}
              </td>
              <td className="p-4">{invoice.dueDate}</td>
              <td className="p-4">
                <div
                  onClick={() => updateInvoice(invoice)}
                  className="w-fit px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                >
                  View Details
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdateInvoiceModalClicked && (
        <UpdateInvoiceModal
          handleCloseUpdateInvoiceModal={handleCloseUpdateInvoiceModal}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};

export default InvoiceTable;
