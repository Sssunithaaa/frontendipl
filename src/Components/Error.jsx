import React from "react";

import { IoCloseOutline } from "react-icons/io5";
import { images } from "../constants";
const ErrorMessage = ({ message, setCreateError }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex justify-center w-full overflow-auto bg-black/50">
      <img
        src={images.error}
        alt="Error"
        className="mb-4"
        style={{ maxWidth: "300px" }}
      />
      <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong.</h1>
      <p className="text-lg text-gray-600">
        We apologize for the inconvenience. Please try again later.
      </p>
    </div>
  );
};

export default ErrorMessage;
