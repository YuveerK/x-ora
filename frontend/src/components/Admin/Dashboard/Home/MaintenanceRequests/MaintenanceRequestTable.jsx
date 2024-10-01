import React, { useEffect, useState } from "react";
import avatar from "../../../../../assets/avatar.png";
import EditMaintenanceRequest from "./EditMaintenanceRequest";
import axios from "axios";
import { baseUrl } from "../../../../../constants/env.const";
const MaintenanceRequestTable = ({ requests }) => {
  const [editRequestModal, setEditRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const handleCloseEditRequestModal = (payload) => {
    setEditRequestModal(payload);
  };

  const editRequest = (request) => {
    setSelectedRequest(request);
    setEditRequestModal(true);
  };

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    const response = await axios.get(`${baseUrl}/maintenance-requests`);
    setMaintenanceRequests(response.data.maintenanceRequests);
  };
  return (
    <table className="w-full bg-red-50 overflow-auto mt-8 rounded-md shadow-md">
      <thead>
        <tr>
          <th className="text-left p-4">Task</th>
          <th className="text-left p-4">Task Description</th>
          <th className="text-left p-4">Unit</th>
          <th className="text-left p-4">Status</th>
          <th className="text-left p-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {maintenanceRequests.map((request, index) => (
          <tr className="bg-white " key={index}>
            <td className="p-4">
              <div className="flex items-center ">
                <div>
                  <img
                    src={avatar}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex ml-2 items-center gap-4">
                    <p className="text-[10px] text-green-500 font-bold">
                      {`${request.role} Request`}
                    </p>
                    <p className="text-[10px] px-[5px] rounded-md bg-red-300 text-red-600 font-bold">
                      {request.priority}
                    </p>
                  </div>

                  <p className="ml-2 text-sm">
                    By: {request.first_name + " " + request.last_name} ||{" "}
                    {new Date(request.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            </td>
            <td className="p-4">
              <p>{request.description}</p>
            </td>
            <td className="p-4">{request.unitNumber}</td>
            <td className="p-4">
              <div className="w-fit px-[10px] rounded-md bg-red-300 text-red-600 font-bold">
                {request.status}
              </div>
            </td>
            <td className="p-4">
              <div
                onClick={() => editRequest(request)}
                className="w-fit px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              >
                View Details
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      {editRequestModal && (
        <EditMaintenanceRequest
          handleCloseEditRequestModal={handleCloseEditRequestModal}
          request={selectedRequest}
        />
      )}
    </table>
  );
};

export default MaintenanceRequestTable;
