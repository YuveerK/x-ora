import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoTools } from "react-icons/go";
import MaintenanceRequestTable from "../../../../components/Admin/Dashboard/Home/MaintenanceRequests/MaintenanceRequestTable";
import CreateMaintenanceRequest from "../../../../components/Admin/Dashboard/Home/MaintenanceRequests/CreateMaintenanceRequest";
import { BiCloudLightRain } from "react-icons/bi";
import axios from "axios";
import { baseUrl } from "../../../../constants/env.const";

function MaintenanceRequests() {
  const [createRequest, setCreateRequest] = useState(false);

  const handleCloseCreateRequestModal = (payload) => {
    setCreateRequest(payload);
  };

  return (
    <div className="h-screen w-full bg-[#f1f3fa] p-8 overflow-y-auto">
      {/* Maintenance Requests Bar */}

      <div className="w-full flex items-center justify-between">
        {/* Search Requests */}
        <div className="w-fit flex px-4 rounded-md items-center gap-4 bg-white justify-center">
          <CiSearch size={30} />
          <input
            className="border-none p-2  w-[300px] outline-none"
            type="text"
            name="search"
            id="search"
            placeholder="Search Maintenance Requests"
          />
        </div>

        {/* Create Request */}
        <div
          onClick={() => setCreateRequest(true)}
          className="w-fit cursor-pointer hover:bg-blue-600 px-4 py-2 rounded-md text-white bg-blue-500"
        >
          <p>Create Request</p>
        </div>
      </div>

      <MaintenanceRequestTable />

      {createRequest && (
        <CreateMaintenanceRequest
          handleCloseCreateRequestModal={handleCloseCreateRequestModal}
        />
      )}
    </div>
  );
}

export default MaintenanceRequests;
