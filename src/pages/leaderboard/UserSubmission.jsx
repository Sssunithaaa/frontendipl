import React, { useEffect } from "react";
import { useState } from "react";
import "../styles.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { getUserSubmission } from "../../services/leaderboard";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MainLayout from "../../Components/MainLayout";
import { TbScoreboard } from "react-icons/tb";
const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
const UserSubmission = () => {
  const userState = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default");

  const handleItemClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the menu after selection, if desired
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: () =>
      getUserSubmission({ username: userState?.userInfo?.user?.username }),
    queryKey: ["usersubmissions"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  useEffect(() => {
    refetch();
  }, [isLoading]);
  console.log(userState?.userInfo?.username);
  console.log(data?.submissions);
  const jsondata = data?.submissions;

  const recordsPerPage = 5;
  // const filteredData =
  //   selectedOption === "Top 5"
  //     ? UserData.slice(0, 3)
  //     : selectedOption === "Correct"
  //     ? UserData.filter((record) => record.stats === "Win")
  //     : UserData;
  // Calculate start and end index for pagination

  const startIndex = currentPage * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  return (
    <MainLayout>
      <div className="flex flex-col my-auto mx-auto overflow-x-auto mt-[100px]">
        <div className={`w-full flex flex-col justify-center items-center"`}>
          <div className="flex flex-col gap-y-4 rounded-md border-[#38292e] justify-center items-center mt-20 border-2 h-60 w-50 lg:w-[300px] sm:w-[300px] md:w-[300px] m-5 lg:mx-auto md:mx-auto bg-[#2d1a57] shadow-md ">
            <div>
              <p className="font-semibold text-white">Name: Eren</p>
              <p className=" font-semibold  text-white">Username: 2017894</p>
            </div>
            <div className=" flex flex-row justify-evenly gap-x-5 font-serif items-center space-between bottom-0">
              <div className="flex flex-col h-15 w-15 border-2 rounded-md border-black/10 mt-30 flex-grow-1 p-2 px-2 bg-black/40">
                <p className="text-lg text-white">5</p>
                <p className="text-md text-white">Wins</p>
              </div>
              <div className="flex flex-col h-15 w-15 border-2 rounded-md border-black/10 mt-30 flex-grow-1 p-2 px-2 bg-black/40">
                <p className="text-lg text-white">10</p>
                <p className="text-sm text-white">Rank</p>
              </div>
              <div className="flex flex-col h-15 w-15 border-2 rounded-md border-black/10 mt-30 flex-grow-1 p-2 px-2 bg-black/40">
                <p className="text-lg text-white">5</p>
                <p className="text-sm text-white">Wins</p>
              </div>
            </div>
          </div>
        </div>
        <div class="container max-w-6xl px-4 mx-auto sm:px-8">
          <div class="py-8 relative">
            <div class="flex flex-row justify-center items-center text-center w-full mb-1 sm:mb-0">
              <h2 class="text-xl uppercase text-center font-bold">
                User Submissions
              </h2>
            </div>

            <div class="flex justify-center items-center py-4 w-90 mt-7 sm:ml-0 md:ml-0 lg:ml-0 overflow-x-auto scrollbar-hide sm:mx-5 md:mx-5">
              <div class="flex items-center border-2 border-gray-200 shadow-2xl ml-[200px] lg:ml-0 md:ml-0 sm:ml-0 shadow-black scrollbar-hide rounded-lg">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="cursor-pointer my-auto rounded-full p-2 w-[45px] animate-pulse"
                >
                  <FaArrowLeft color="gray" />
                </button>
                <table class="min-w-2xl lg:min-w-4xl  leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Match ID
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Match
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Predicted team
                      </th>

                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Player of the match
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Most runs
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Most wickets
                      </th>
                    </tr>
                  </thead>

                  <tbody className="w-full ">
                    {jsondata
                      ?.slice(startIndex, endIndex)
                      .map((record, index) => (
                        <tr
                          className={` hover:bg-black/50 hover:cursor-pointer`}
                        >
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <span
                              class={` relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={` absolute inset-0  rounded-full opacity-50`}
                              ></span>
                              <span class="relative">{index}</span>
                            </span>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div class="flex justify-center items-center">
                              <div class="ml-3">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  {record.match_teamA} vs {record.match_teamB}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <span
                              class={`${
                                record.predictedteam === record.winner_team
                                  ? "text-green-900"
                                  : record.winner_team === null
                                  ? "text-black"
                                  : "text-red-700"
                              } relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={`${
                                  record.predictedteam === record.winner_team
                                    ? "bg-green-200"
                                    : record.winner_team === null
                                    ? "bg-white"
                                    : "bg-red-200"
                                } absolute inset-0 bg-green-200 rounded-full opacity-50`}
                              ></span>
                              <span class="relative">
                                {record.predictedteam}
                              </span>
                            </span>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <span
                              class={`${
                                record.predictedpom === record.playerofmatch
                                  ? "text-green-900"
                                  : record.playerofmatch === null
                                  ? "text-black"
                                  : "text-red-700"
                              } relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={`${
                                  record.predictedpom === record.playerofmatch
                                    ? "bg-green-200"
                                    : record.playerofmatch === null
                                    ? "bg-white"
                                    : "bg-red-200"
                                } absolute inset-0 bg-green-200 rounded-full opacity-50`}
                              ></span>
                              <span class="relative">
                                {record.predictedpom}
                              </span>
                            </span>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <span
                              class={`${
                                record.predictedmr === record.mostrunsplayer
                                  ? "text-green-900"
                                  : record.mostrunsplayer !== null
                                  ? "text-red-700"
                                  : "text-black"
                              } relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={`${
                                  record.predictedmr === record.mostrunsplayer
                                    ? "bg-green-200"
                                    : record.mostrunsplayer === null
                                    ? "bg-white"
                                    : "bg-red-200"
                                } absolute inset-0 bg-green-200 rounded-full opacity-50`}
                              ></span>
                              <span class="relative">{record.predictedmr}</span>
                            </span>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <span
                              class={`${
                                record.predictedmwk === record.mostwickettaker
                                  ? "text-green-700"
                                  : record.mostwickettaker === null
                                  ? "text-black"
                                  : "text-red-700"
                              } relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={`${
                                  record.predictedmwk === record.mostwickettaker
                                    ? "bg-green-200"
                                    : record.mostwickettaker === null
                                    ? "bg-white"
                                    : "bg-red-200"
                                } absolute inset-0 bg-green-200 rounded-full opacity-50`}
                              ></span>
                              <span class="relative">
                                {record.predictedmwk}
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <button
                  onClick={handleNextPage}
                  disabled={endIndex >= jsondata?.length}
                  className="cursor-pointer my-auto rounded-full bg-black/10 p-2 w-[55px] animate-pulse"
                >
                  <FaArrowRight color="gray" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserSubmission;
