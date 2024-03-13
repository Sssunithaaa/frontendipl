import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const TeamsPage = () => {
  const [players, setPlayers] = useState({
    teamA: ["Player 1A", "Player 2A", "Player 3A"],
    teamB: ["Player 1B", "Player 2B", "Player 3B"],
  });

  const [selectedTeam, setSelectedTeam] = useState("");
  const [slideDirection, setSlideDirection] = useState(""); // State to track sliding direction

  const handleTeamClick = (teamName) => {
    // Determine sliding direction based on the selected team
    const direction = teamName === "teamA" ? "slide-right" : "slide-left";
    setSlideDirection(direction);

    // Delay setting the selected team to allow the animation to finish
    setTimeout(() => {
      setSelectedTeam(teamName);
    }, 300); // Adjust timing according to your animation duration
  };

  return (
    <div className="teams-page text-black shadow-md bg-white font-semibold border-[1px]  rounded-md w-[90%] flex flex-col justify-center items-center mx-auto">
      <div className=" w-full flex flex-row font-semibold gap-x-3 py-4 text-xl blue-text-gradient">
        <div
          className={`team-name ${
            selectedTeam === "teamA" ? "active" : ""
          } w-[50%] cursor-pointer`}
          onClick={() => handleTeamClick("teamA")}
        >
          RCB
        </div>
        <div
          className={`team-name ${
            selectedTeam === "teamB" ? "active" : ""
          } w-[50%] border-l-[1px] border-black cursor-pointer`}
          onClick={() => handleTeamClick("teamB")}
        >
          CSK
        </div>
      </div>
      <div className="players-list-container w-full overflow-hidden">
        <motion.div
          className={`players-list h-full flex justify-center items-center ${slideDirection}`}
        >
          <table className="w-[100%]">
            <motion.tbody
              variants={fadeIn("right", "spring", 0.5, 1)}
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              initial="hidden"
              transition={{ duration: 0.3, x: [-100, 0] }}
            >
              {selectedTeam === "teamA" &&
                players["teamA"].map((player, index) => (
                  <tr
                    key={index}
                    className={`px-4 py-3 font-medium text-gray-900 transition-all duration-300 whitespace-nowrap`}
                  >
                    <td
                      className={` py-3 ${
                        index % 2 === 0 ? "bg-gray-100" : ""
                      }`}
                    >
                      {player}
                    </td>
                  </tr>
                ))}
              {selectedTeam === "teamB" &&
                players["teamB"].map((player, index) => (
                  <tr
                    key={index}
                    className={`${
                      selectedTeam === "teamB" ? "" : "-right-full"
                    } px-4 py-3 font-medium text-gray-900 transition-all duration-300 whitespace-nowrap`}
                  >
                    <td
                      className={` py-3 ${
                        index % 2 === 0 ? "bg-gray-100" : ""
                      }`}
                    >
                      {player}
                    </td>
                  </tr>
                ))}
            </motion.tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamsPage;
