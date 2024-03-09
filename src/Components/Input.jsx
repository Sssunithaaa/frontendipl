import React, { useState } from "react";
import clsx from "clsx";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { findInputError, isFormInvalid } from "../utils/motion";
import { AnimatePresence } from "framer-motion";
// Input.js
const Input = ({ label, id, type, required, register, errors, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const inputError = findInputError(errors, label);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div>
      <label className="block text-md text-left ml-[1px] font-medium">
        {label}
      </label>
      <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>
      <div className="my-2 relative">
        <input
          id={id}
          type={showPassword ? "text" : type} // Use 'text' type if showPassword is true
          {...register(id, {
            required: {
              value: true,
              message: "required",
            },
          })}
          className={clsx(
            `
              form-input block w-full rounded-md py-1.5 text-black ring-black border-2 border-gray-400 placeholder:text-sm
              focus:border-[3px]
              sm:text-sm
              sm:leading-6
              
              
            `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50"
          )}
          placeholder={`Enter your ${type === "password" ? type : id}`}
        />
        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
          </div>
        )}
      </div>
      {errors[id] && (
        <div className="text-sm text-red-500">This field is required</div>
      )}
    </div>
  );
};
const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
export default Input;
