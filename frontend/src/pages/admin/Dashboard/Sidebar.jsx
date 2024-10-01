import React, { useState } from "react";
import { IoPieChartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BiBuildings } from "react-icons/bi";
import { LuScrollText } from "react-icons/lu";
import { MdGroups } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { CiDollar } from "react-icons/ci";
import { TbSpeakerphone } from "react-icons/tb";
import { RxPencil2 } from "react-icons/rx";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { IoHelpCircle } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
  const [selectedMenuOption, setSelectedMenuOption] = useState("Home");
  return (
    <div className="w-[100px] h-screen overflow-y-auto bg-[#2a3269] p-2 lg:p-4 transition-all xl:w-[300px] ">
      <div>
        <h1 className="font-bold text-xl text-white text-center hidden ">
          X-ORA
        </h1>
      </div>

      <div className=" lg:flex h-[calc(100vh-80px)] flex-col  justify-between">
        <div className="text-white mt-7">
          <Link
            to={"/admin/dashboard/home"}
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Overview" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Overview")}
          >
            <IoPieChartOutline size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Overview</p>
          </Link>
          <Link
            to={"/admin/dashboard/rentals"}
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Rentals" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Rentals")}
          >
            <BiBuildings size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Rentals</p>
          </Link>
          <Link
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Leasing" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Leasing")}
          >
            <LuScrollText size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Leasing</p>
          </Link>
          <Link
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "People" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("People")}
          >
            <MdGroups size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">People</p>
          </Link>
          <Link
            to={"/admin/dashboard/maintenance-requests"}
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Maintenance" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Maintenance")}
          >
            <BsCardChecklist size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">
              Tasks & Maintenance
            </p>
          </Link>
          <Link
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Accounting" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Accounting")}
          >
            <CiDollar size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Accounting</p>
          </Link>
          <Link
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Communication" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Communication")}
          >
            <TbSpeakerphone size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Communication</p>
          </Link>
          <Link
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Notes" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Notes")}
          >
            <RxPencil2 size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Notes</p>
          </Link>
          <Link
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Files" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Files")}
          >
            <FaRegFolderOpen size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Files</p>
          </Link>
          <Link
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Reports" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Reports")}
          >
            <FaChartSimple size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Reports</p>
          </Link>
        </div>
        <div className="text-white mt-7">
          <Link
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Help" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Help")}
          >
            <IoHelpCircle size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Help</p>
          </Link>
          <Link
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Settings" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Settings")}
          >
            <IoSettingsOutline size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Settings</p>
          </Link>
          <Link
            className={`flex items-center justify-center my-8 p-2  rounded-md hover:bg-blue-800   ${
              selectedMenuOption === "Logout" && "bg-[#2c3c6f] "
            } xl:justify-start`}
            onClick={() => setSelectedMenuOption("Logout")}
          >
            <CiLogout size={30} className="mr-0 size-5 lg:size-8" />
            <p className="text-xl hidden xl:block xl:ml-2 ">Logout</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
