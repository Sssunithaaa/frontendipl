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
import { RiArrowDropDownLine } from "react-icons/ri";
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
  const jsondata = [
    {
      matchID: "1",
      match_teamA: "Team A",
      match_teamB: "Team B",
      predictedteam: "Team A",
      winner_team: "Team A",
      predictedpom: "Player 1",
      playerofmatch: "Player 1",
      predictedmr: "Player 2",
      mostRunsPlayer: "Player 2",
      predictedMWK: "Player 3",
      mostwickettaker: "Player 3",
    },
    {
      matchID: "2",
      match_teamA: "Team C",
      match_teamB: "Team D",
      predictedteam: "Team D",
      winner_team: "null",
      predictedpom: "Player 4",
      playerofmatch: "null",
      predictedmr: "Player 5",
      mostrunsplayer: "null",
      predictedmwk: "Player 6",
      mosttickettaker: "Player 6",
    },
    {
      matchID: "3",
      match_teamA: "Team E",
      match_teamB: "Team F",
      predictedteam: "Team E",
      winner_team: "Team F",
      predictedpom: "Player 7",
      playerofmatch: "Player 8",
      predictedmr: "null",
      mostrunsplayer: "null",
      predictedmwk: "null",
      mosttickettaker: "null",
    },
    // Add more records as needed
  ];
  const [showDetails, setShowDetails] = useState(
    Array(jsondata?.length).fill(false)
  );

  const toggleDetails = (index) => {
    setShowDetails((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  console.log(showDetails);

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
  const jsondataa = data?.submissions;

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

            <div class="flex justify-center items-center py-4 w-90 mt-7 sm:ml-0 md:ml-0 lg:ml-0  scrollbar-hide sm:mx-5 md:mx-5">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="cursor-pointer my-auto rounded-full p-2 w-[45px] animate-pulse"
              >
                <FaArrowLeft color="gray" />
              </button>
              <div class="flex items-center border-2 border-gray-200 shadow-2xl lg:ml-0 md:ml-0 sm:ml-0  scrollbar-hide rounded-lg">
                <table class="min-w-2xl lg:min-w-4xl  leading-normal">
                  <thead className="black-gradient text-white">
                    <tr>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase border-b border-gray-200"
                      ></th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center  uppercase border-b border-gray-200"
                      >
                        Match ID
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center  uppercase border-b border-gray-200"
                      >
                        Match
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center  uppercase border-b border-gray-200 hidden lg:table-cell"
                      >
                        Predicted team
                      </th>

                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center  uppercase border-b border-gray-200 hidden lg:table-cell"
                      >
                        Player of the match
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center  uppercase border-b border-gray-200 hidden lg:table-cell"
                      >
                        Most runs
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center  uppercase border-b border-gray-200 hidden lg:table-cell"
                      >
                        Most wickets
                      </th>
                    </tr>
                  </thead>

                  <tbody className="w-full ">
                    {jsondata
                      ?.slice(startIndex, endIndex)
                      .map((record, index) => (
                        <React.Fragment key={index}>
                          <tr
                            className={`hover:bg-black/50 hover:cursor-pointer`}
                          >
                            <td className="px-5 py-5 text-sm  border-b ">
                              <RiArrowDropDownLine
                                size={25}
                                onClick={() => toggleDetails(index)}
                              />
                            </td>
                            <td className="px-5 py-5 text-sm  border-b border-gray-200">
                              <span
                                className={`relative inline-block px-5 py-1 font-semibold leading-tight`}
                              >
                                <span
                                  aria-hidden="true"
                                  className={`absolute inset-0 rounded-full opacity-50`}
                                ></span>
                                <span className="relative">{index}</span>
                              </span>
                            </td>
                            <td class="px-5 py-5 text-sm  border-b border-gray-200">
                              <div class="flex justify-center items-center">
                                <div class="ml-3">
                                  <p class=" whitespace-no-wrap">
                                    {record.match_teamA} vs {record.match_teamB}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td class="px-5 py-5 text-sm  border-b border-gray-200 hidden lg:table-cell">
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
                            <td class="px-5 py-5 text-sm  border-b border-gray-200 hidden lg:table-cell">
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
                            <td class="px-5 py-5 text-smborder-b border-gray-200 hidden lg:table-cell">
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
                                <span class="relative">
                                  {record.predictedmr}
                                </span>
                              </span>
                            </td>
                            <td class="px-5 py-5 text-sm  border-b border-gray-200 hidden lg:table-cell">
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
                                    record.predictedmwk ===
                                    record.mostwickettaker
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
                          {showDetails[index] && (
                            <tr>
                              <td
                                colSpan={6}
                                className="text-left px-5 py-5 text-md  border-b border-gray-20"
                              >
                                <div className="ml-10">
                                  <p className="my-2">
                                    Team: {record.winner_team}
                                  </p>

                                  <p className="my-2">
                                    Most wicket: {record.predictedmwk}
                                  </p>

                                  <p className="my-2">
                                    Most wicktes: {record.predictedmr}
                                  </p>

                                  <p className="my-2">
                                    Player of the match: {record.predictedpom}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handleNextPage}
                disabled={endIndex >= jsondata?.length}
                className="cursor-pointer my-auto rounded-full p-2 w-[45px] animate-pulse"
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

export default UserSubmission;
