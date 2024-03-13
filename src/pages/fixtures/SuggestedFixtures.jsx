import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Matches from "./matches";
import { toast, ToastContainer } from "react-toastify";
import { getFixtures } from "../../services/fixtures";
const SuggestedFixtures = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: () => getFixtures({}),
    queryKey: ["board"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  useEffect(() => {
    refetch();
  }, [isLoading]);
  const dataa = [
    {
      location: "Eden Gardens, Kolkata",
      teamA: {
        teamname: "Kolkata Knight Riders",
        teamImage: "kolkataImageURL",
      },
      teamB: { teamname: "Mumbai Indians", teamImage: "mumbaiImageURL" },
      matchdate: "2024-03-01",
      matchtime: "19:30",
    },
    {
      location: "Wankhede Stadium, Mumbai",
      teamA: { teamname: "Chennai Super Kings", teamImage: "chennaiImageURL" },
      teamB: {
        teamname: "Royal Challengers Bangalore",
        teamImage: "bangaloreImageURL",
      },
      matchdate: "2024-03-01",
      matchtime: "20:00",
    },
    {
      location: "Feroz Shah Kotla, Delhi",
      teamA: { teamname: "Delhi Capitals", teamImage: "delhiImageURL" },
      teamB: { teamname: "Rajasthan Royals", teamImage: "rajasthanImageURL" },
      matchdate: "2024-03-01",
      matchtime: "19:00",
    },
    {
      location: "M. A. Chidambaram Stadium, Chennai",
      teamA: {
        teamname: "Sunrisers Hyderabad",
        teamImage: "hyderabadImageURL",
      },
      teamB: { teamname: "Punjab Kings", teamImage: "punjabImageURL" },
      matchdate: "2024-03-18",
      matchtime: "16:00",
    },
    {
      location: "Sawai Mansingh Stadium, Jaipur",
      teamA: {
        teamname: "Kolkata Knight Riders",
        teamImage: "kolkataImageURL",
      },
      teamB: { teamname: "Rajasthan Royals", teamImage: "rajasthanImageURL" },
      matchdate: "2024-03-20",
      matchtime: "15:30",
    },
  ];
  const jsondata = data ? data.match_list : null;
  const upcomingMatches = dataa?.filter((match) => {
    const matchDateTime = new Date(`${match.matchdate}T${match.matchtime}`);
    const currentDateTime = new Date();
    return matchDateTime > currentDateTime;
  });

  return (
    <div className="mt-10 ">
      <p className="text-xl font-bold ml-5 my-5 blue-text-gradient">
        Upcoming matches
      </p>
      <div className="flex flex-wrap gap-y-5 mx-5 gap-x-3 md:gap-x-5">
        {upcomingMatches.map((match, index) => (
          <Matches
            data={match}
            id={match.matchID}
            status={match.status}
            className="h-auto px-5 sm:mx-auto bg-[#f4f4f1] shadow-lg py-2 w-full sm:w-[calc(60%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedFixtures;
