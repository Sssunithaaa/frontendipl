import React, { useEffect } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { useState } from "react";
import Headers from "../../headers/header";
import Matches from "./matches";
import { SectionWrapper } from "../../hoc";
import { getFixtures } from "../../services/fixtures";
import MainLayout from "../../Components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { images } from "../../constants";
const FixturePage = () => {
  const [Breadcrumbsdata, setBreadcrumbsdata] = useState([
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Fixtures",
      link: "/fixtures",
    },
  ]);
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
  }, []);
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
  console.log(data?.match_list);
  const jsondata = data ? data.match_list : null;
  console.log(jsondata);
  // Map over the array of objects and extract the "fields" and "pk" fields
  // const array = jsondata?.map((item) => ({
  //   fields: item.fields,
  //   pk: item.pk,
  // }));

  const upcomingMatches = jsondata?.filter((match) => {
    const matchDateTime = new Date(`${match.matchdate}T${match.matchtime}`);
    const currentDateTime = new Date();
    return matchDateTime > currentDateTime;
  });
  console.log(upcomingMatches);

  // Filter past matches
  const pastMatches = jsondata?.filter((match) => {
    const matchDateTime = new Date(`${match.matchdate}T${match.matchtime}`);
    const currentDateTime = new Date();
    return matchDateTime < currentDateTime;
  });

  return (
    <MainLayout>
      <section className={`lg:h-screen h-full  mt-[104px]`}>
        <Breadcrumbs data={Breadcrumbsdata} activeName="Fixtures" />
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-center my-4 mx-3">
            <div className="lg:flex lg:flex-col lg:text-secondary lg:justify-center lg:h-[380px] lg:w-[90%] lg:mx-auto lg:my-4">
              <div>
                <h2 className="text-3xl uppercase font-bold my-2">
                  IPL Predictions
                </h2>
              </div>
              <div>
                <p className="text-xl text-[#2b072e] font-semibold">
                  Get ready to predict the winners and score big prizes with our
                  IPL prediction game! Check out the upcoming fixtures and make
                  your predictions now!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-y-9 mt-5 pb-10 mx-5 gap-x-3 md:gap-x-5">
            {dataa &&
              dataa?.map((match, index) => (
                <Matches
                  data={match}
                  id={match.matchID}
                  status={match.status}
                  className="h-auto px-5 sm:mx-auto py-2 w-full sm:w-[calc(60%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
                />
              ))}
          </div>
          <div className="flex flex-wrap gap-y-9 mt-5 pb-10 mx-5 gap-x-3 md:gap-x-5">
            <p className="text-xl font-semibold ml-5">Upcoming matches</p>
            {upcomingMatches.map((match, index) => (
              <Matches
                data={match}
                id={match.matchID}
                status={match.status}
                className="h-auto px-5 sm:mx-auto py-2 w-full sm:w-[calc(60%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-y-9 mt-5 pb-10 mx-5 gap-x-3 md:gap-x-5">
            <p className="text-xl font-semibold ml-5">Past matches</p>
            {pastMatches.map((match, index) => (
              <Matches
                data={match}
                id={match.matchID}
                status={match.status}
                className="h-auto px-5 sm:mx-auto py-2 w-full sm:w-[calc(60%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FixturePage;
