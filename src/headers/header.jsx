import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import { useNavigate } from "react-router-dom";
import { signout } from "../services/user";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
const NavItemInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Leaderboard", type: "link", href: "/board" },
  { name: "Fixtures", type: "link", href: "/fixtures" },
  { name: "Profile", type: "link", href: "/usersubmission" },
];
const NavItem = ({ item }) => {
  const userState = useSelector((state) => state.user);

  return (
    <div>
      <li
        className={`${
          userState.userInfo || item.name !== "Profile" ? "block" : "hidden"
        } group relative px-4 py-2`}
      >
        <div>
          <div className={`mx-auto`}>
            <a
              href={`${item.href}`}
              className="cursor-pointer px-8 py-2 text-[18px] lg:text-secondary font-bold  shadow-none hover:text-white lg:hover:text-white "
            >
              {item.name}
            </a>
          </div>
        </div>
      </li>
    </div>
  );
};
const Headers = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [naVisible, setNavisible] = useState(false);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const naVisibilityHandler = () => {
    setNavisible((curState) => {
      console.log(curState);
      return !curState;
    });
  };
  const loginHandler = () => {
    navigate("/user");
    setLogin((curState) => {
      return !curState;
    });
  };
  const { mutate: mutatesignout, isLoading: isLoadingg } = useMutation({
    mutationFn: ({}) => {
      return signout({});
    },
    onSuccess: (data) => {
      console.log("Logout successful");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const logoutHandler = () => {
    dispatch(logout());
    mutatesignout({});
    navigate("/");
  };
  return (
    <>
      <section className="fixed left-0 right-0 top-0 m-0 z-50 bg-[#0E0C15] py-1">
        <header className="container mx-auto my-0 flex items-center justify-between px-5 sm:px-0 py-2">
          <div className="left-0 text-xl flex flex-row justify-center items-center gap-x-5 my-auto">
            <div className=" flex flex-row">
              {
                <a href="/">
                  <h3 className="font-bold text-2xl lg:ml-4 py-6 text-secondary">
                    <p>PREDICTIVE PLAY</p>
                  </h3>
                </a>
              }
            </div>
          </div>
          <div className="z-50 lg:hidden">
            {naVisible ? (
              <AiOutlineClose
                className="h-6 w-6"
                onClick={naVisibilityHandler}
                color="#aaa6c3"
              />
            ) : (
              <IoMenu
                className="h-6 w-6"
                onClick={naVisibilityHandler}
                color="#ffffff"
              />
            )}
          </div>
          <div
            className={`${
              !naVisible
                ? "-right-full"
                : "right-0 black-gradient text-secondary  backdrop-blur-3xl"
            } fixed bottom-0 top-0 z-[1000]  mt-[98px] flex w-full flex-col items-center bg-none  justify-center gap-x-9 gap-y-2 lg:gap-y-8 p-4 transition-all duration-300 lg:static lg:mt-0 lg:w-auto lg:flex-row lg:justify-end`}
          >
            <ul className="flex flex-col lg:bg-none items-center gap-x-5 gap-y-5 font-bold lg:flex-row">
              {NavItemInfo.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}{" "}
            </ul>
            {userState?.userInfo ? (
              <button
                onClick={logoutHandler}
                type="button"
                href="/"
                className="hover:text-white font-bold text-[20px] lg:text-secondary w-[30%] hover:bg-tertiary rounded-full border-2  sm:px-2 xs:px-1 py-1 transition-all duration-300 lg:mt-0"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={loginHandler}
                className="hover:text-white font-bold text-[20px] text-secondary w-[30%] hover:bg-tertiary rounded-full border-2   sm:px-2 xs:px-1 py-1 transition-all duration-300 lg:mt-0"
              >
                SIGN IN
              </button>
            )}
          </div>
        </header>
      </section>
    </>
  );
};

export default Headers;
