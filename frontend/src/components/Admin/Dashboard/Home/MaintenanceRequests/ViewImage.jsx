import React from "react";

const ViewImage = ({ imgUrl, closeViewImageModal }) => {
  console.log(imgUrl);
  return (
    <div className="w-full overflow-auto h-screen absolute top-0 left-0 flex items-center justify-center bg-black/50">
      <div>
        <img src={imgUrl} alt="image" className="w-auto h-auto" />
        <div className="w-full flex items-center justify-center">
          <div
            onClick={() => closeViewImageModal(false)}
            className="w-fit mt-8 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          >
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
