import React from "react";
import { IoIosStats } from "react-icons/io";

const CommunityPosts = () => {
  return (
    <div className=" hidden md:block w-[91%] m-auto mt-10 bg-white rounded-md shadow-md">
      <div className="border-b p-4 text-xl font-thin">
        <div className="flex items-center gap-4">
          <IoIosStats size={30} />
          Maintenance Request Stats
        </div>
      </div>
      <table
        className=" h-[500px] text-left mt-10 overflow-scroll"
        width={"100%"}
      >
        <thead>
          <tr>
            <td className="px-4 py-2 font-bold">Posted By</td>
            <td className="px-4 py-2 font-bold">Description</td>
            <td className="px-4 py-2 font-bold">Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Yuveer Kallideen</td>
            <td className="px-4 py-2">This is a test post</td>
            <td className="px-4 py-2">
              <button>View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CommunityPosts;
