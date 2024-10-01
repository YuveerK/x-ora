import React from "react";
import MaintenanceRequestsCard from "../../../../components/Admin/Dashboard/Home/MaintenanceRequestsCard";
import MaintenanceRequestsStats from "../../../../components/Admin/Dashboard/Home/MaintenanceRequestsStats";
import { IoIosStats } from "react-icons/io";
import IncomeExpenseChart from "../../../../components/Admin/Dashboard/Home/IncomeExpenseChart";
import UtilitiesChart from "../../../../components/Admin/Dashboard/Home/UtilitiesChart";
import Navbar from "../Navbar";
import CommunityPosts from "../../../../components/Admin/Dashboard/Home/CommunityPosts";

const AdminHome = () => {
  return (
    <>
      <div className="w-full  bg-[#f1f3fa]">
        {/* <Navbar /> */}
        <div className="p-8 h-screen overflow-y-auto">
          <div className=" w-full  justify-center flex transition-all flex-wrap gap-4">
            <MaintenanceRequestsCard />
            <div className=" w-full h-[400px] bg-white pl-4 pr-4 pt-4 pb-[60px] shadow-md rounded-md  lg:w-[45%] ">
              <div className="border-b p-4 text-xl font-thin">
                <div className="flex items-center gap-4">
                  <IoIosStats size={30} />
                  Maintenance Request Stats
                </div>
              </div>
              <MaintenanceRequestsStats />
            </div>
          </div>
          <div className="mt-10 w-full gap-4  flex flex-col lg:flex-row lg:justify-center">
            <div className="w-full h-[400px] max-h-[400px] bg-white lg:w-[45%]  p-4 rounded-md shadow-md">
              <div className="border-b p-6 text-xl font-thin mb-2">
                <div className="flex items-center gap-4">
                  <IoIosStats size={30} />
                  Income and Expense
                </div>
              </div>
              <IncomeExpenseChart />
            </div>
            <div className="w-full h-[400px] max-h-[400px] bg-white lg:w-[45%] p-4 rounded-md shadow-md">
              <div className="w-full flex items-center justify-between border-b p-4 text-xl font-thin mb-2">
                <div className="flex items-center gap-4">
                  <IoIosStats size={30} />
                  Utilities
                </div>
              </div>
              <UtilitiesChart />
            </div>
          </div>
          {/* Community Posts */}
          <CommunityPosts />
        </div>
      </div>
    </>
  );
};

export default AdminHome;
