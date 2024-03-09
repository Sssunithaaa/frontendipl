import React from "react";

import { IoCloseOutline } from "react-icons/io5";
const ErrorMessage = ({ message, setCreateError }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex justify-center w-full overflow-auto bg-black/50">
      <div className="mx-auto sm:w-[45%] md:w-[45%] lg:w-[45%] w-[60%] flex flex-row justify-center items-center max-w-md gap-x-6 py-2 text-center font-sans rounded-md font-bold text-black bg-white my-auto">
        <div>
          <p className="text-lg text-center my-2 text-red-900">{message}</p>
        </div>
        <div>
          <button
            className=" flex my-2 text-white/90 hover:text-white font-semibold py-1 rounded-md mx-auto items-center "
            onClick={() => setCreateError(false)}
          >
            <IoCloseOutline color="black" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
