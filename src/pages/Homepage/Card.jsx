import React from "react";
import { useState, useEffect } from "react";
import { images } from "../../constants";
import { FaLocationDot } from "react-icons/fa6";
const Card = ({ data }) => {
  const teamImages = {
    "Chennai Super Kings": images.csk,
    "Delhi Capitals": images.dc,
    "Kolkata Knight Riders": images.kkr,
    "Mumbai Indians": images.mi,
    "Punjab Kings": images.pbks,
    "Rajasthan Royals": images.rr,
    "Royal Challengers Bangalore": images.rcb,
    "Sunrisers Hyderabad": images.srh,
    "Lucknow Super Giants": images.lsg,
    "Gujarat Titans": images.gt,
  };
  console.log(data);

  const teamA = data.teamA;
  const teamB = data.teamB;
  const teamAImage = teamImages[teamA.teamname];
  const teamBImage = teamImages[teamB.teamname];
  console.log(data);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let formattedHours = parseInt(hours, 10);
    let period = "AM";

    if (formattedHours === 0) {
      formattedHours = 12;
    } else if (formattedHours === 12) {
      period = "PM";
    } else if (formattedHours > 12) {
      formattedHours -= 12;
      period = "PM";
    }

    return `${formattedHours}:${minutes.padStart(2, "0")} ${period} IST`;
  };
  const [currentMatch, setCurrentMatch] = useState(null);

  // Update currentMatch based on current time and match time
  useEffect(() => {
    // Get current date and time
    const currentDate = new Date();
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    const matchTime =
      parseInt(data.matchtime.split(":")[0]) * 60 +
      parseInt(data.matchtime.split(":")[1]);
    if (currentTime > matchTime) {
      setCurrentMatch("completed");
    } else if (currentTime > matchTime && matchTime - currentTime <= 90) {
      setCurrentMatch("upcoming");
    } else {
      setCurrentMatch("future");
    }
  }, [data]);
  console.log(currentMatch);
  return (
    <div
      className={`lg:w-[500px] w-auto rounded-xl pb-5 lg:py-5 text-secondary font-semibold bg-[#2c293b] hover:scale-105 transition-all duration-75`}
    >
      <div className="flex flex-col lg:justify-center items-start w-[72vw] lg:w-[30vw] px-5 h-[190px] my-7 ">
        <p className="flex flex-row justify-start items-start gap-x-3 mb-2 text-[#828df4]">
          <span className="ml-5 mt-[2px]">
            <FaLocationDot size={15} />
          </span>
          {data.location}
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col justify-start items-start w-[40%]">
            <div className="flex flex-row justify-start items-center my-[1px]">
              <img
                src={teamAImage}
                alt={data.teamA.teamname}
                className="w-9 h-auto object-cover my-[2px] rounded mx-3"
              />
              <p>{data.teamA.teamname}</p>
            </div>
            <div className="flex flex-row justify-start items-center my-[1px]">
              <img
                src={teamBImage}
                alt={data.teamB}
                className="w-9 h-auto object-cover my-[2px] rounded mx-3"
              />
              <p>{data.teamB.teamname}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start ml-5 my-2">
            <p>{formatDate(data.matchdate)}</p>
            <p>{formatTime(data.matchtime)}</p>
          </div>
        </div>
        <button className="w-[50%] mx-auto my-2 bg-black font-semibold hover:bg-blue-900 rounded-md text-white py-1">
          Make prediction
        </button>
      </div>
    </div>
  );
};

export default Card;
