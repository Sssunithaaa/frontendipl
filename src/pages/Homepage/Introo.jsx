import { fadeIn } from "../../utils/motion";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { useState } from "react";
import { getTodayMatch } from "../../services/fixtures";
import React, { useEffect, useRef, lazy, Suspense } from "react";
import { MdLeaderboard } from "react-icons/md";
import MainLayout from "../../Components/MainLayout";
import { MdNotStarted } from "react-icons/md";
import { images } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { teams } from "../../constants";
import ScrollDownArrow from "../../Components/ScrollDown";
import HeroSection from "./Hero";

const Quote = lazy(() => import("./Quote"));
const News = lazy(() => import("./News"));
const Card = lazy(() => import("./Card"));

const textss = [
  { index: 1, title: "Browse the upcoming matches and make your predictions." },
  { index: 2, title: "Earn points based on the accuracy of your predictions." },
  {
    index: 3,
    title: "Check the leaderboard to see your ranking among other players.",
  },
  { index: 4, title: "Enjoy the thrill of predicting and winning!" },
];
const HowItWorks = ({ index, title }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
      className="w-[100%] sm:w-[90%] mx-auto lg:h-40  p-[1px] my-[10px] "
    >
      <div className="bg-[#eeedf0] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-[20px] text-black m-[1px] py-[14px] px-10 min-h-[90px] lg:h-40 flex justify-evenly items-center flex-col">
        <p className="text-lg font-semibold text-start">{title}</p>
      </div>
    </motion.div>
  );
};
const Intro = () => {
  const navigate = useNavigate("/");

  // const teamImages = {
  //   "Chennai Super Kings": images.csk,
  //   "Delhi Capitals": images.dc,
  //   "Kolkata Knight Riders": images.kkr,
  //   "Mumbai Indians": images.mi,
  //   "Punjab Kings": images.pbks,
  //   "Rajasthan Royals": images.rr,
  //   "Royal Challengers Bangalore": images.rcb,
  //   "Sunrisers Hyderabad": images.srh,
  //   "Lucknow Super Giants": images.lsg,
  //   "Gujarat Titans": images.gt,
  // };
  // const [matchesToday, setMatchesToday] = useState([]);
  // const {
  //   data: dataa,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useQuery({
  //   queryFn: () => {
  //     return getTodayMatch();
  //   },
  //   queryKey: ["todaymatch"],
  // });
  // useEffect(() => {
  //   refetch();
  // }, [isLoading]);
  // const [completed, isCompleted] = useState(false);
  // const date = new Date();
  // let day = date.getDate();
  // let month = date.getMonth() + 1;
  // let year = date.getFullYear();

  // // const compareDates = (d1, d2) => {
  // //   let date1 = new Date(d1).getTime();
  // //   let date2 = new Date(d2).getTime();
  // //   console.log(date1);
  // //   console.log(date2);
  // //   if (date1 < date2) {
  // //     isCompleted(false);
  // //   } else if (date1 > date2) {
  // //     isCompleted(true);
  // //   }
  // // };
  // console.log(completed);
  // const [Breadcrumbsdata, setBreadcrumbsdata] = useState([
  //   {
  //     name: "Home",
  //     link: "/",
  //   },
  // ]);
  // const index = 1;
  // useEffect(() => {
  //   const fetchMatchesToday = () => {
  //     const response = getTodayMatch();
  //     setMatchesToday(response.data);
  //   };
  //   fetchMatchesToday();
  // });

  // const dataaa = dataa?.matches;
  const data = [];
  const dataa = [];
  const sectionRefs = {
    intro: useRef(null),
    quote: useRef(null),
    about: useRef(null),
    howItWorks: useRef(null),
    fixtures: useRef(null),
    leaderboard: useRef(null),
    getStarted: useRef(null),
    end: useRef(null),
  };
  const [showIntroArrow, setShowIntroArrow] = useState(false);
  const [showAboutArrow, setShowAboutArrow] = useState(false);
  const [showQuoteArrow, setQuoteArrow] = useState(false);
  const [showHowItWorksArrow, setShowHowItWorksArrow] = useState(false);
  const [showFixturesArrow, setShowFixturesArrow] = useState(false);
  const [showLeaderboardArrow, setShowLeaderboardArrow] = useState(false);
  const [showGetStartedArrow, setShowGetStartedArrow] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        switch (entry.target) {
          case sectionRefs.intro.current:
            setShowIntroArrow(entry.isIntersecting);
            break;
          case sectionRefs.about.current:
            setShowAboutArrow(entry.isIntersecting);
            break;
          case sectionRefs.quote.current:
            setQuoteArrow(entry.isIntersecting);
            break;
          case sectionRefs.howItWorks.current:
            setShowHowItWorksArrow(entry.isIntersecting);
            break;
          case sectionRefs.fixtures.current:
            setShowFixturesArrow(entry.isIntersecting);
            break;
          case sectionRefs.leaderboard.current:
            setShowLeaderboardArrow(entry.isIntersecting);
            break;
          case sectionRefs.getStarted.current:
            setShowGetStartedArrow(entry.isIntersecting);
            break;
          default:
            break;
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    observer.observe(sectionRefs.intro.current);
    observer.observe(sectionRefs.about.current);
    observer.observe(sectionRefs.quote.current);
    observer.observe(sectionRefs.howItWorks.current);
    observer.observe(sectionRefs.fixtures.current);
    observer.observe(sectionRefs.leaderboard.current);
    observer.observe(sectionRefs.getStarted.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <MainLayout>
        <section className="h-full w-[100vw] scrollbar-hide">
          <div className={` w-[100vw]  mt-20 mb-4 flex flex-col  `}>
            <div ref={sectionRefs.intro}>
              <HeroSection />

              {showIntroArrow && (
                <ScrollDownArrow targetRef={sectionRefs.quote} />
              )}
            </div>
            <div ref={sectionRefs.quote} className="my-10 w-[90vw] ml-4 px-5">
              {/* <Quote images={images} />
              {showQuoteArrow && (
                <ScrollDownArrow targetRef={sectionRefs.fixtures} />
              )} */}
            </div>
            <div
              ref={sectionRefs.fixtures}
              className="my-10 w-[100vw] ml-4 px-5"
            >
              <motion.h2
                variants={fadeIn("right", "spring", 0.5, 1)}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                initial="hidden"
                className={`${styles.sectionHeadText} text-secondary text-left ml-4`}
              >
                Today's fixtures&nbsp;
              </motion.h2>
              <div className="lg:flex lg:flex-row lg:w-full lg:gap-x-1">
                <div
                  className="scrollable-wrapper scrollbar-hide py-5 flex flex-row whitespace-nowrap gap-x-4 lg:gap-x-15"
                  style={{ width: "95vw", overflowX: "auto" }}
                >
                  {teams["data"] &&
                    teams["data"].map((match, index) => {
                      const matchDate = new Date(match.matchdate);
                      const currentDate = new Date();
                      const isMatchCompleted = matchDate < currentDate;
                      const currentTime =
                        currentDate.getHours() * 60 + currentDate.getMinutes();

                      const isTodayBefore330PM =
                        currentDate.toDateString() ===
                          matchDate.toDateString() &&
                        currentTime < 15 * 60 + 30;

                      const matchTimeParts = match.matchtime.split(":");
                      const matchHours = parseInt(matchTimeParts[0], 10);
                      const matchMinutes = parseInt(matchTimeParts[1], 10);

                      let isTodayBeforeMatchTime = false;
                      if (
                        currentDate.toDateString() === matchDate.toDateString()
                      ) {
                        const matchTimeInMinutes =
                          matchHours * 60 + matchMinutes;
                        isTodayBeforeMatchTime =
                          currentTime < matchTimeInMinutes;
                      }

                      if (!isMatchCompleted && !isTodayBeforeMatchTime) {
                        return <Card data={match} />;
                      } else {
                        return null;
                      }
                    })}
                </div>
              </div>
              {showFixturesArrow && (
                <ScrollDownArrow targetRef={sectionRefs.about} />
              )}
            </div>
            <div className="w-[100vw] px-10">
              <p
                className={`${styles.sectionHeadText} text-secondary ml-4 text-left`}
              >
                News
              </p>
              <News />
            </div>
            <motion.div
              ref={sectionRefs.about}
              animate="show"
              initial="hidden"
              className="w-[100vw] mx-auto px-10 my-10"
            >
              <motion.p
                variants={fadeIn("up", "spring", 0.5, 1)}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                initial="hidden"
                className="text-[#6b042c] text-start font-semibold"
              >
                About
              </motion.p>
              <motion.p
                className={`${styles.sectionHeadText} text-secondary text-left  mb-5`}
              >
                Predictive Play
              </motion.p>
              <div>
                <p className="text-justify text-white font-medium text-lg">
                  Welcome to our prediction website, where the excitement of
                  sports meets the thrill of forecasting outcomes! Whether
                  you're a seasoned predictor or just starting out, our platform
                  offers an immersive experience that's both engaging and
                  rewarding. Before you dive into the action, here's a quick
                  overview of how it all works:
                </p>
              </div>
              {showAboutArrow && (
                <ScrollDownArrow targetRef={sectionRefs.howItWorks} />
              )}
            </motion.div>
            <div
              ref={sectionRefs.howItWorks}
              className="lg:w-[60vw] w-full py-10 px-5 lg:px-10 text-secondary bg-[#1f1c2b]"
            >
              <h2
                className={`${styles.sectionHeadText} text-secondary text-left`}
              >
                How it works&nbsp;?
              </h2>
              <div className="flex">
                <ol>
                  {textss.map((text, index) => (
                    <li className="text-left text-lg text-white my-4">
                      <p className="flex flex-row">
                        <p className=" rounded-full text-center lg:mr-2 justify-center w-10 lg:w-7 bg-none font-bold text-pink-900 lg:bg-pink-500">
                          {index + 1}
                        </p>
                        &nbsp;
                        <p className="font-medium">{text.title}</p>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              {showHowItWorksArrow && (
                <ScrollDownArrow targetRef={sectionRefs.leaderboard} />
              )}
            </div>
            <div ref={sectionRefs.leaderboard} className="my-4 w-[100vw] px-10">
              <motion.div>
                <div className="w-14 h-14 my-2 hover:opacity-85 bg-slate-300 flex justify-center items-center rounded-full px-2">
                  <div
                    onClick={() => {
                      navigate("/board");
                    }}
                    className="w-12 h-12 hover:cursor-pointer bg-slate-200 flex justify-center items-center rounded-full px-2"
                  >
                    <MdLeaderboard size={28} color="blue" />
                  </div>
                </div>
                <h5 className="text-[#6b042c] text-start font-semibold">
                  Check out
                </h5>
                <h3
                  className={`${styles.sectionHeadText} text-secondary text-left  mb-5`}
                >
                  LeaderBoard
                </h3>
                { /*prettier-ignore  */}
                <p className={`text-white text-left text-lg font-semibold`}>
                Keep an eye on the <b  className="text-[#b3a4a4]">leaderboard </b>
                to see how you stack up against other players. The more accurate
                your predictions, the higher you'll climb!
              </p>
              </motion.div>
              {showLeaderboardArrow && (
                <ScrollDownArrow targetRef={sectionRefs.getStarted} />
              )}
            </div>
            <div
              ref={sectionRefs.getStarted}
              className="my-5 w-[100vw] mx-auto ml-5 px-10"
            >
              <motion.div>
                <h3
                  className={`${styles.sectionHeadText}  flex flex-row gap-x-2 items-center`}
                >
                  Get started <MdNotStarted color="#2b072e" />
                </h3>
                <div className="flex flex-row justify-evenly">
                  <div className="w-[50%]">
                    <p className={` text-xl text-start  py-4`}>
                      Register to start predicting matches and earning points.
                      The more you play, the more chances you have to win
                      exciting rewards!
                    </p>
                  </div>
                  <div className="w-[50%] text-xl gap-y-2 font-medium flex flex-col justify-center items-center">
                    <a
                      href="/user"
                      className="bg-brown p-2 rounded-md w-[50%] text-secondary  hover:text-white"
                    >
                      SIGN IN
                    </a>

                    <a
                      href="/user"
                      className="bg-brown p-2 rounded-md w-[50%] text-secondary  hover:text-white"
                    >
                      Register
                    </a>
                  </div>
                </div>
              </motion.div>
              {showGetStartedArrow && (
                <ScrollDownArrow targetRef={sectionRefs.end} />
              )}
            </div>
            <motion.div
              ref={sectionRefs.end}
              variants={fadeIn("right", "spring", 4, 1)}
              animate="show"
              initial="hidden"
              className="w-full"
            >
              <div className="flex flex-row justify-evenly items-center">
                <p className="font-bold text-2xl">Number of players waiting</p>
                <p className="text-2xl font-bold bg-brown text-secondary p-5 rounded-md animate-pulse">
                  {dataa?.total_users}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Intro;
