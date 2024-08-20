import React, { useState } from "react";

const MobileMenu = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div>
      <div className="w-full p-4">
        <div className="w-full flex items-center justify-end">
          <div
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={() => setIsOpened(!isOpened)}
          >
            <div
              className={`w-[100%] my-[5px] h-[3px] bg-red-500 transition-all duration-300 ${
                isOpened ? "transform rotate-45 translate-y-[8px]" : ""
              }`}
            ></div>
            <div
              className={`w-[100%] my-[5px] h-[3px] bg-red-500 transition-all duration-300 ${
                isOpened ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-[100%] my-[5px] h-[3px] bg-red-500 transition-all duration-300 ${
                isOpened ? "transform -rotate-45 -translate-y-[8px]" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute w-[70%] h-screen bg-red-500 transition-all duration-200 ${
          isOpened ? "left-[40%]" : "left-[100%]"
        }`}
      ></div>
    </div>
  );
};

export default MobileMenu;
