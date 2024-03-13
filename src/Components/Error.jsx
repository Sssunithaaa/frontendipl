import React from "react";
import { images } from "../constants";
import { MdClose } from "react-icons/md";
const ErrorMessage = ({ message, setCreateError }) => {
  return (
    <div className="fixed inset-0 h-screen mt-24 z-[1000] bg-black/80">
      <div className="relative flex flex-col items-center justify-center w-[60%] text-center mx-auto my-auto bg-white h-[80%]">
        <MdClose
          onClick={() => setCreateError(false)}
          size={30}
          className="absolute cursor-pointer right-0 top-0 m-5"
        />
        <img
          src={images.error}
          alt="Error"
          className="mb-4"
          style={{ maxWidth: "300px" }}
        />
        <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong.</h1>
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
