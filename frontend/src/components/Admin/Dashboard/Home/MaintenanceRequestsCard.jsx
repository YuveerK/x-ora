import React from "react";
import { FaRegClipboard } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";

const MaintenanceRequestsCard = () => {
  return (
    <div className="border w-[700px] h-[300px] mx-8 rounded-md shadow-md bg-white overflow-y-scroll">
      <div className="border-b p-4 text-xl font-bold">Maintenance Requests</div>
      <div className="p-4">
        <div className="w-full flex items-center my-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 w-fit bg-gray-300 rounded-md">
                <FaRegClipboard size={30} />
              </div>
              <div className="ml-2">
                <h3>AC Repair</h3>
                <p className="text-gray-400 text-xs">2 Days ago | Unit 22</p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center">
                <RiErrorWarningLine size={20} className="text-[#fc3f8d]" />
                <p className="ml-2 text-[#fc3f8d]">Overdue</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center my-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 w-fit bg-gray-300 rounded-md">
                <FaRegClipboard size={30} />
              </div>
              <div className="ml-2">
                <h3>AC Repair</h3>
                <p className="text-gray-400 text-xs">2 Days ago | Unit 22</p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center">
                <RiErrorWarningLine size={20} className="text-[#fc3f8d]" />
                <p className="ml-2 text-[#fc3f8d]">Overdue</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center my-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 w-fit bg-gray-300 rounded-md">
                <FaRegClipboard size={30} />
              </div>
              <div className="ml-2">
                <h3>AC Repair</h3>
                <p className="text-gray-400 text-xs">2 Days ago | Unit 22</p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center">
                <RiErrorWarningLine size={20} className="text-[#fc3f8d]" />
                <p className="ml-2 text-[#fc3f8d]">Overdue</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center my-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 w-fit bg-gray-300 rounded-md">
                <FaRegClipboard size={30} />
              </div>
              <div className="ml-2">
                <h3>AC Repair</h3>
                <p className="text-gray-400 text-xs">2 Days ago | Unit 22</p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center">
                <RiErrorWarningLine size={20} className="text-[#fc3f8d]" />
                <p className="ml-2 text-[#fc3f8d]">Overdue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequestsCard;
