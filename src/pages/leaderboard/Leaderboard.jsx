import React, { useEffect } from "react";
// import Breadcrumbs from "../../Components/Breadcrumbs";
import { motion } from "framer-motion";
import { useState } from "react";
import "../styles.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
// import MainLayout from "../../Components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getLeaderBoard, getLeaderBoard2 } from "../../services/leaderboard";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MainLayout from "../../Components/MainLayout";
const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
const Leaderboard = () => {
  const userState = useSelector((state) => state.user);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [lid, setLid] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [Breadcrumbsdata, setBreadcrumbsdata] = useState([
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Leaderboard",
      link: "/board",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Global");
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchQuery(selectedOption);
    }, 300); // Adjust debounce delay as needed (e.g., 500 milliseconds)

    return () => clearTimeout(debounceTimeout);
  }, [selectedOption]);
  const handleItemClick = (option) => {
    const selectedLeaderboard = leaderboards.find(
      (item) => item.leaderboardname === option
    );
    if (!selectedLeaderboard) {
      throw new Error("Selected leaderboard not found");
    }

    setSelectedOption(option);
    setLid(selectedLeaderboard.lid);
    console.log(selectedLeaderboard.lid);
    setIsOpen(false); // Close the menu after selection, if desired
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption, searchQuery, debouncedSearchQuery, userState.userInfo]);
  const fetchData = () => {
    if (userState.userInfo) {
      refetchLeaderBoard2();
    } else {
      refetchLeaderBoard();
    }
  };
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchLeaderBoard,
  } = useQuery({
    queryFn: () => getLeaderBoard({ selected_leaderboard: lid }),
    queryKey: ["board"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  console.log(userState.userInfo);

  const { data: data2, refetch: refetchLeaderBoard2 } = useQuery({
    queryFn: () => getLeaderBoard2({ selected_leaderboard: lid }),
    queryKey: ["board2"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  console.log(selectedOption);
  const leaderboards = (userState ? data2 : data)?.leaderboards || [];
  const lidAndNameArray = leaderboards.map((item) => [
    item.lid,
    item.leaderboardname,
  ]);
  console.log(lidAndNameArray);

  const LeaderboardData = userState ? data2 : data;
  console.log(LeaderboardData);

  const user_list =
    filteredUserList.length > 0
      ? filteredUserList
      : LeaderboardData?.user_list || [];

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    const filteredUserList = LeaderboardData?.user_list.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );

    // Update the filtered user list based on the search query
    setFilteredUserList(filteredUserList);
  };

  const recordsPerPage = 5;
  const startIndex = currentPage * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentPageUserList = user_list.slice(startIndex, endIndex);
  console.log(endIndex);
  return (
    <MainLayout>
      <div className="flex flex-col bg-[#] text-black mt-[100px] min-w-xl overflow-clip">
        {/* <Breadcrumbs
          data={Breadcrumbsdata}
          activeName="Leaderboard"
          className="mt-2"
        /> */}
        <div
          className={`w-full my-0 lg:h-[160px]   border-t-2 md:h-[200px] h-[140px]  flex flex-col justify-center items-center`}
        >
          <button onClick={() => fetchData()}></button>
          <p className="text-2xl font-bold mt-3 xs:mt-[1px] sm:mt-1 ml-3 lg:text-black lg:text-3xl text-center uppercase">
            Indian priemer Leaugue 2024
          </p>
          <p className="xs:text-sm my-3 mx-3 text-indigo-400 text-xl text-center font-semibold">
            Dive into the pulse-pounding excitement of the IPL!
          </p>
        </div>
        <div class="container flex flex-col  max-w-3xl px-4 mx-auto sm:px-8">
          <div class="py-2 relative w-full">
            <div className="mx-14">
              <div class="flex flex-row justify-center items-center text-center w-full mb-1 mt-4 sm:mb-0">
                <h2 class="text-2xl uppercase font-bold ">Leader Board</h2>
              </div>
              <div className="flex flex-row justify-between mt-6 mx-2">
                <div className="flex justify-start">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search player name..."
                    className="mb-2 px-[1px] text-[14px] sm:w-[160px] xs:w-[80px] md:w-28  lg:w-40 py-2 border-[2px]  placeholder:text-center border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="absolute lg:right-[-47px] right-[-10px] xs:ml-[270px] sm:ml-[290px]  md:ml-[290px] top-[68px] xs:py-0 py-5 mr-0 flex justify-between items-center">
                  <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    className="menu"
                    onHoverStart={() => setIsOpen(true)}
                    onHoverEnd={() => setIsOpen(false)}
                  >
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsOpen(!isOpen)}
                      className="border-2"
                    >
                      <p className="  text-[18px] rounded-md px-3 flex flex-row">
                        {selectedOption}{" "}
                        <span>
                          <IoMdArrowDropdown className="my-[1px]" size={20} />
                        </span>
                      </p>
                      <motion.div
                        variants={{
                          open: { rotate: 180 },
                          closed: { rotate: 0 },
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ originY: 0.55 }}
                      ></motion.div>
                    </motion.button>
                    <motion.ul
                      variants={{
                        open: {
                          clipPath: "inset(0% 0% 0% 0% round 10px)",
                          transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05,
                          },
                        },
                        closed: {
                          clipPath: "inset(10% 50% 90% 50% round 10px)",
                          transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3,
                          },
                        },
                      }}
                      className="bg-black/60 text-white py-3  w-[110px] flex justify-center items-center right-0 ml-[2.8rem]"
                      style={{
                        pointerEvents: isOpen ? "auto " : "none",
                        filter: "drop-shadow(1px 1px 1px #000000)",
                      }}
                    >
                      {lidAndNameArray.map((item) => (
                        <motion.li
                          variants={itemVariants}
                          onClick={() => handleItemClick(item[1])}
                          className="cursor-pointer font-medium text-md hover:text-gray-400 hover:animate-pulse"
                        >
                          {item[1]}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.nav>
                </div>
              </div>
            </div>

            <div class="flex justify-center items-center py-4 w-full sm:w-[90%]  mx-auto mt-1">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="cursor-pointer ml-4 my-auto p-2 w-[48px] animate-pulse"
              >
                <FaArrowLeft color="gray" />
              </button>
              <div class="flex items-center bg-[#F7F0F5]  xs:w-[90%] w-[90%] lg:w-full border-gray-300 shadow-lg  shadow-black scrollbar-hide rounded-lg">
                <table
                  style={{ backgroundColor: "#F7F0F5" }}
                  class="sm:w-[550px] rounded-md w-[600px]"
                >
                  <thead className="bg-indigo-500">
                    <tr>
                      <th
                        scope="col"
                        class="lg:px-9 px-5 py-5 text-md text-white font-semibold text-center  uppercase  border-b border-gray-300"
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        class="lg:px-9 px-5 py-5 text-md text-white font-semibold text-center  uppercase  border-b border-gray-300"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        class="lg:px-9 px-5 py-5 text-md text-white font-semibold text-center  uppercase  border-b border-gray-300"
                      >
                        Score
                      </th>
                    </tr>
                  </thead>

                  {/* {!isLoading ? (
                    <tr className="">
                      <td colSpan={3}>
                        <p className="text-center w-full py-3 animate-pulse">
                          Loading ...
                        </p>
                      </td>
                    </tr>
                  ) : ( */}
                  <tbody
                    style={{ backgroundColor: "#ffffff" }}
                    className=" p-7 text-black"
                  >
                    {[
                      {
                        rank: 1,
                        username: "User1",
                        score1: 100,
                        score2: 200,
                      },
                      {
                        rank: 2,
                        username: "User2",
                        score1: 90,
                        score2: 180,
                      },
                      {
                        rank: 3,
                        username: "User3",
                        score1: 80,
                        score2: 160,
                      },
                      {
                        rank: 4,
                        username: "User4",
                        score1: 70,
                        score2: 140,
                      },
                      {
                        rank: 5,
                        username: "User5",
                        score1: 60,
                        score2: 120,
                      },
                    ].map((record, index) => (
                      <tr className="my-4" key={index}>
                        <td class="px-5 py-8 text-sm border-b border-y-27 border-gray-300">
                          <div class="flex justify-center items-center">
                            <div class="ml-3">
                              <p class=" whitespace-no-wrap">{record.rank}</p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-8 text-sm  border-b border-y-27  border-gray-300">
                          <div class="flex justify-center items-center">
                            <div class="ml-3">
                              <p class=" whitespace-no-wrap">
                                {record.username}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-8 text-sm  border-b border-y-27 border-gray-300">
                          <div class="flex justify-center items-center">
                            <div class="ml-3">
                              <p class=" whitespace-no-wrap">
                                {selectedOption === "Weekly"
                                  ? record.score2
                                  : record.score1}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* )} */}
                </table>
              </div>
              <button
                onClick={handleNextPage}
                disabled={endIndex === user_list?.length}
                className="cursor-pointer disabled:cursor-none mr-4 my-auto p-2 w-[48px] animate-pulse"
              >
                <FaArrowRight color="gray" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Leaderboard;
