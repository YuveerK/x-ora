import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import CreateMaintenanceRequest from "../../../../components/Admin/Dashboard/Home/MaintenanceRequests/CreateMaintenanceRequest";
import InvoiceTable from "../../../../components/Admin/Dashboard/Invoices/InvoiceTable";
import AddInvoiceModal from "../../../../components/Admin/Dashboard/Invoices/AddInvoiceModal";

function Invoices() {
  const [addInvoice, setAddInvoice] = useState(false);

  const handleCloseAddInvoiceModal = (payload) => {
    setAddInvoice(payload);
  };

  return (
    <div className="h-screen w-full bg-[#f1f3fa] p-8 overflow-y-auto">
      {/* Invoices Bar */}

      <div className="w-full flex items-center justify-between">
        {/* Search Invoices */}
        <div className="w-fit flex px-4 rounded-md items-center gap-4 bg-white justify-center">
          <CiSearch size={30} />
          <input
            className="border-none p-2  w-[300px] outline-none"
            type="text"
            name="search"
            id="search"
            placeholder="Search Invoices"
          />
        </div>

        {/* Add Invoice */}
        <div
          onClick={() => setAddInvoice(true)}
          className="w-fit cursor-pointer hover:bg-blue-600 px-4 py-2 rounded-md text-white bg-blue-500"
        >
          <p>Add Invoice</p>
        </div>
      </div>

      <InvoiceTable />

      {addInvoice && (
        <AddInvoiceModal
          handleCloseAddInvoiceModal={handleCloseAddInvoiceModal}
        />
      )}
    </div>
  );
}

export default Invoices;
