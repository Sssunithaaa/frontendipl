import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { images } from "../constants";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/reducers/userReducers";
import { signup, signin } from "../services/user";
import MainLayout from "../Components/MainLayout";
import { createPortal } from "react-dom";
import ErrorMessage from "../Components/Error";
//import MainLayout from "../Components/MainLayout";
const Authform = () => {
  const navigate = useNavigate();
  const [variant, setVariant] = useState("REGISTER");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ username, name, email, password1, password2 }) => {
      return signup({ username, name, email, password1, password2 });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      console.log(data);
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const { mutate: mutatesignin, isLoading: isLoadingg } = useMutation({
    mutationFn: ({ username, password1 }) => {
      return signin({ username, password1 });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (userState?.userInfo) {
      navigate("/");
    }
  }, [navigate, userState?.userInfo]);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password1: "",
      password2: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data) => {
    if (variant === "REGISTER") {
      const { username, name, email, password1, password2 } = data;
      if (password1 !== password2) {
        setError(true);
        setMessage("Passwords do not match");
      }
      mutate({ username, name, email, password1, password2 });
    } else {
      const { username, password1 } = data;
      mutatesignin({ username, password1 });
    }
  };

  return (
    <>
      {error &&
        createPortal(
          <ErrorMessage message={message} setCreateError={setError} />,
          document.getElementById("error")
        )}
      <MainLayout>
        <section className="mt-[60px] bg-gray-400 overflow-hidden w-screen h-full lg:w-screen scrollbar-hide">
          <div className=" flex  rounded-lg w-[100%] justify-center  h-[100vh] lg:h-[90%] bg-gray-300 items-center overflow-y-auto">
            <div
              className={`${
                variant === "LOGIN" ? "h-[40vh]" : ""
              } lg:my-24 mb-24  flex flex-row h-[70vh] lg:h-[90vh] bg-white w-[90%] lg:w-[60%] rounded-lg w-100 mx-auto font-sans  shadow-2xl shadow-black `}
            >
              <div className="w-[50%] hidden lg:flex overflow-hidden h-[90vh] px-10 justify-center items-center">
                <div className="flex flex-col bg-white items-center">
                  <div className="bg-white">
                    <p className="text-3xl my-3 blue-text-gradient font-bold">
                      Let's get started
                    </p>

                    <p className="text-lg">
                      Create an account or login if you already have one
                    </p>
                  </div>
                  <div>
                    <img
                      src={images.sign}
                      alt="signform"
                      className={`${
                        variant === "LOGIN" ? "h-[40vh]" : ""
                      } h-[50vh]`}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white w-[100%]  lg:h-auto lg:w-[50%] px-8 py-8 my-auto shadow sm:rounded-lg rounded-lg ">
                <div className="flex flex-row justify-evenly mb-4">
                  {variant === "LOGIN" && (
                    <div className={`  w-[100%] cursor-pointer h-14`}>
                      <p className="my-2 text-xl ml-2 font-bold text-left blue-text-gradient">
                        SIGN IN
                      </p>
                      <p className="my-2 mb-2 text-md ml-2 font-medium text-left">
                        Sign in below
                      </p>
                    </div>
                  )}
                  {variant === "REGISTER" && (
                    <div className={` w-[100%] cursor-pointer h-14`}>
                      <p className="my-2 text-xl ml-2 font-bold text-left blue-text-gradient">
                        SIGN UP
                      </p>
                      <p className="my-2 mb-2 text-md ml-2 font-medium text-left">
                        Sign up below
                      </p>
                    </div>
                  )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <Input
                    label="Username"
                    id="username"
                    type="text"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    variant={variant}
                  />

                  {variant === "REGISTER" && (
                    <Input
                      label="Name"
                      id="name"
                      type="text"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      variant={variant}
                    />
                  )}
                  {variant === "REGISTER" && (
                    <Input
                      label="Email"
                      id="email"
                      type="email"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      variant={variant}
                    />
                  )}
                  <Input
                    label="Password"
                    id="password1"
                    type="password"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    variant={variant}
                  />
                  {variant === "REGISTER" && (
                    <Input
                      label="Confirm password"
                      id="password2"
                      type="password"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      variant={variant}
                    />
                  )}
                  {/* prettier-ignore */}
                  {variant === "REGISTER" &&
                    errors.password2?.type === "validate" && (
                      <div className="text-red-500">Passwords do not match</div>
                    )}
                  <Button disabled={isLoading} fullWidth type="submit">
                    {variant === "LOGIN" ? "SIGN IN" : "REGISTER"}
                  </Button>
                </form>

                <div className="flex gap-2 justify-center text-md mt-6 px-2 text-gray-800">
                  {variant === "REGISTER"
                    ? "Already have an account?"
                    : "New here ?"}

                  <div
                    onClick={toggleVariant}
                    className="underline cursor-pointer text-md font-medium text-[#3486eb]"
                  >
                    {variant === "LOGIN" ? "Create an account" : "Login"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Authform;
