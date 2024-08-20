import React from "react";
import MaintenanceRequestsCard from "../../../../components/Admin/Dashboard/Home/MaintenanceRequestsCard";
import MaintenanceRequestsStats from "../../../../components/Admin/Dashboard/Home/MaintenanceRequestsStats";
import { IoIosStats } from "react-icons/io";
import IncomeExpenseChart from "../../../../components/Admin/Dashboard/Home/IncomeExpenseChart";
import UtilitiesChart from "../../../../components/Admin/Dashboard/Home/UtilitiesChart";
import Navbar from "../Navbar";

const AdminHome = () => {
  return (
    <>
      <div className="w-screen h-screen overflow-y-auto bg-[#f1f3fa]">
        <Navbar />

        <div className="p-8">
          <div className=" w-full h-[300px] justify-around flex flex-wrap gap-4">
            <MaintenanceRequestsCard />
            <div className=" w-[700px] h-[300px] bg-white pl-4 pr-4 pt-4 pb-[60px] shadow-md rounded-md ">
              <div className="border-b p-4 text-xl font-bold">
                <div className="flex items-center gap-4">
                  <IoIosStats size={30} />
                  Maintenance Request Stats
                </div>
              </div>

              <MaintenanceRequestsStats />
            </div>
          </div>
          <div className=" mt-10 w-full flex  h-[500px] bg-white  shadow-md rounded-md  ">
            <div className="w-1/2 border-r">
              <div className="border-b p-6 text-xl font-bold mb-2">
                <div className="flex items-center gap-4">
                  <IoIosStats size={30} />
                  Income and Expense
                </div>
              </div>
              <IncomeExpenseChart />
            </div>
            <div className="w-1/2 border-r">
              <div className="w-full flex items-center justify-between border-b p-4 text-xl font-bold mb-2">
                <div className="flex items-center gap-4">
                  <IoIosStats size={30} />
                  Utilities
                </div>

                <div>
                  <div className="flex items-center gap-4">
                    <select
                      className="border p-2"
                      name="utilities"
                      id="utilities"
                    >
                      <option value="">Utility Type</option>
                      <option value="Water">Water</option>
                      <option value="Electricity">Electricity</option>
                    </select>
                    <select
                      className="border p-2"
                      name="utilities"
                      id="utilities"
                    >
                      <option value="">Year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>
              </div>
              <UtilitiesChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
