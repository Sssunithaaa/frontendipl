import React, { useEffect, useRef } from "react";
import { SectionWrapper } from "../../hoc";
import { fadeIn, slideIn, textVariant, zoomIn } from "../../utils/motion";
import { styles } from "../../styles";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { getTodayMatch } from "../../services/fixtures";
import { MdLeaderboard } from "react-icons/md";
import MainLayout from "../../Components/MainLayout";
import { MdNotStarted } from "react-icons/md";
import { images } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import Matches from "../fixtures/matches";

import { useNavigate } from "react-router-dom";
import { teams } from "../../constants";
import Card from "./Card";
import ScrollDownArrow from "../../Components/ScrollDown";
const QuoteItem = ({ name, text }) => {
  const [namee, setName] = useState("");
  const [textt, setText] = useState("");
  useEffect(() => {
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      setName(name);
      setText(text);
    }, 20000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="quote-item">
      <h4>{namee}</h4>
      <p>{textt}</p>
    </div>
  );
};
const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};
export function CursorBlinker() {
  return (
    <motion.div
      variants={cursorVariants}
      animate="blinking"
      className="inline-block h-5 w-[1px] translate-y-1 bg-slate-900"
    />
  );
}
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
      className="w-[100%] sm:w-[90%] mx-auto lg:h-40  p-[1px] my-[10px] rounded-[20px] border-[1px] xs:black-gradient sm:black-gradient md:black-gradient"
    >
      <div className="bg-[#2b072e] rounded-[20px] text-secondary m-[1px] py-[14px] px-10 min-h-[90px] lg:h-40 flex justify-evenly items-center flex-col">
        <p className="text-lg font-semibold text-start">{title}</p>
      </div>
    </motion.div>
  );
};
const Intro = () => {
  const navigate = useNavigate("/");
  const [currentQuote, setCurrentQuote] = useState("Sachin Tendulkar");
  const [previousQuote, setPreviousQuote] = useState("");
  const textIndex = useMotionValue(0);
  const [animationn, setAnimation] = useState(false);

  const texts = [
    {
      "Sachin Tendulkar":
        "IPL is not just a cricket tournament; it's a celebration of the sport, uniting players and fans from all over the world.",
    },
  ];
  const baseText = useTransform(
    textIndex,
    (latest) => Object.values(texts[latest])[0] || ""
  );

  console.log(baseText);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);
  useEffect(() => {
    const animation = animate(count, 200, {
      type: "tween",
      duration: 7,
      ease: "easeIn",
      repeat: 0,
      delay: 0.5,
      repeatDelay: 1,
      onUpdate(latest) {
        if (latest === 0) {
          const currentQuoteIndex =
            textIndex.get() >= texts.length - 1 ? 0 : textIndex.get() + 1;
          setCurrentQuote(Object.keys(texts[currentQuoteIndex])[0]);
          setPreviousQuote(Object.keys(texts[textIndex.get()])[1]);
          textIndex.set(currentQuoteIndex);
        }
      },
    });
    return () => {
      console.log(animation.time);
      animation.stop();
      setAnimation(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // // This arrangement can be altered based on how we want the date's format to appear.

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
  // const data = [
  //   {
  //     location: "Eden Gardens, Kolkata",
  //     teamA: {
  //       teamname: "Kolkata Knight Riders",
  //       teamImage: "kolkataImageURL",
  //     },
  //     teamB: { teamname: "Mumbai Indians", teamImage: "mumbaiImageURL" },
  //     matchdate: "2024-02-10",
  //     matchtime: "19:30",
  //   },
  //   {
  //     location: "Eden Gardens, Kolkata",
  //     teamA: {
  //       teamname: "Kolkata Knight Riders",
  //       teamImage: "kolkataImageURL",
  //     },
  //     teamB: { teamname: "Mumbai Indians", teamImage: "mumbaiImageURL" },
  //     matchdate: "2024-02-10",
  //     matchtime: "19:30",
  //   },
  // ];
  // console.log(dataa?.matches);
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
      threshold: 0.5, // Trigger when half of the section is in view
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
          <div
            className={` w-[100vw]  max-w-7xl mt-20 mb-4 flex flex-col items-start  `}
          >
            <div
              ref={sectionRefs.intro}
              className="lg:h-[85vh] h-[80vh] w-[100vw] flex flex-row justify-center items-center"
            >
              <div className=" w-[100%] lg:w-[100%] flex flex-col mt-[10%] items-center mx-5">
                <h1 className={`${styles.heroHeadText} text-black`}>
                  <span className="text-[#381634]">Predictive Play</span>
                </h1>
                <p
                  className={`text-2xl mx-20 mt-2 text-black font-semibold  font-md`}
                >
                  Predict the outcomes of the matches and earn points to climb
                  the leaderboard. Compete with other players and showcase your
                  predictive skills!
                </p>
              </div>
              {showIntroArrow && (
                <ScrollDownArrow targetRef={sectionRefs.quote} />
              )}
            </div>
            <div ref={sectionRefs.quote}>
              <div className="lg:flex lg:flex-row mx-5 sm:mx-10 md:mx-10 flex flex-col lg:w-[100vw] lg:px-4 lg:mx-10 lg:gap-x-7 lg:justify-center lg:items-center lg:h-[90vh]">
                <motion.div
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  initial="hidden"
                  className="hidden lg:flex text-secondary w-[50%] rounded-md justify-center mx-auto my-4"
                  variants={fadeIn("left", "spring", 0.4, 2)}
                >
                  <img
                    src={images.crick}
                    alt="teams"
                    className="h-[60vh] w-auto rounded-md m-5"
                  />
                </motion.div>
                <motion.div
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  initial="hidden"
                  variants={fadeIn("right", "spring", 0.4, 2)}
                  className="my-3 overflow-hidden h-[40%] w-[100%] lg:w-[50%] rounded-xl mx-auto lg:ml-10"
                  style={{ position: "relative" }}
                >
                  <div className="w-[80vw] lg:w-[80%] p-5 m-5 bg-[#faf9fd] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
                    <img
                      src={images.sachin}
                      alt=""
                      className="w-14 h-auto rounded-full my-3 mx-auto"
                    />

                    <motion.div>{displayText}</motion.div>
                    <p className="font-bold text-purple-950">
                      -&nbsp;{currentQuote}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  initial="hidden"
                  className="lg:hidden flex flex-col text-secondary w-[80vw] p-2 bg-[#faf9fd] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-md justify-center items-center mx-auto my-4"
                  variants={fadeIn("left", "spring", 2, 2)}
                >
                  <div className="flex">
                    <img
                      src={images.crowd}
                      alt="teams"
                      className=" rounded-md"
                    />
                  </div>
                  <div className="py-4 text-black font-semibold">
                    In a clash of titans, ten formidable teams compete for
                    ultimate glory. Who will emerge triumphant and etch their
                    name in history?
                  </div>
                </motion.div>
              </div>
              {showQuoteArrow && (
                <ScrollDownArrow targetRef={sectionRefs.about} />
              )}
            </div>
            <motion.div
              ref={sectionRefs.about}
              animate="show"
              initial="hidden"
              className="w-[100vw] mx-auto px-10 my-10"
            >
              <motion.p
                variants={fadeIn("up", "spring", 2, 1)}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                initial="hidden"
                className="text-[#6b042c] ml-4 text-start font-semibold"
              >
                About
              </motion.p>
              <motion.p
                className={`${styles.sectionHeadText} ml-4 text-start  mb-5`}
              >
                Predictive Play
              </motion.p>
              <div>
                <p className="text-justify mx-4 font-medium text-lg">
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
              className="w-[100vw] mx-auto px-10"
            >
              <h2 className={`${styles.sectionHeadText} text-center mb-5`}>
                How it works&nbsp;?
              </h2>
              <div className="lg:flex lg:flex-row lg:w-full lg:justify-center lg:items-center px-4 lg:gap-x-3">
                {textss.map((text, index) => (
                  <HowItWorks index={index} {...text} />
                ))}
              </div>
              {showHowItWorksArrow && (
                <ScrollDownArrow targetRef={sectionRefs.fixtures} />
              )}
            </div>
            <div
              ref={sectionRefs.fixtures}
              className="my-10 w-[100vw] mx-4 px-10 "
            >
              <motion.h2
                variants={fadeIn("right", "spring", 0.5, 1)}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                initial="hidden"
                className={`${styles.sectionHeadText} text-center mb-2`}
              >
                Today's fixtures&nbsp;
              </motion.h2>
              <div className="lg:flex lg:flex-row lg:w-full lg:gap-x-3 my-4">
                <div
                  className="scrollable-wrapper scrollbar-hide py-5 flex flex-row whitespace-nowrap gap-x-5 lg:gap-x-20"
                  style={{ width: "90vw", overflowX: "auto" }}
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
                      console.log(currentTime);
                      const matchTimeParts = match.matchtime.split(":");
                      const matchHours = parseInt(matchTimeParts[0], 10);
                      const matchMinutes = parseInt(matchTimeParts[1], 10);

                      const matchTimeInMinutes = matchHours * 60 + matchMinutes;

                      const isTodayBeforeMatchTime =
                        currentDate.toDateString() ===
                          matchDate.toDateString() &&
                        currentTime < matchTimeInMinutes;
                      console.log(currentDate);
                      if (!isMatchCompleted && !isTodayBeforeMatchTime) {
                        return <Card data={match} />;
                      } else {
                        return null;
                      }
                    })}
                </div>
              </div>
              {showFixturesArrow && (
                <ScrollDownArrow targetRef={sectionRefs.leaderboard} />
              )}
            </div>
            <div ref={sectionRefs.leaderboard} className="my-4 w-[100vw] px-10">
              <motion.div>
                <div className="w-14 h-14 my-2 ml-5 hover:opacity-85 bg-slate-300 flex justify-center items-center rounded-full px-2">
                  <div
                    onClick={() => {
                      navigate("/board");
                    }}
                    className="w-12 h-12 hover:cursor-pointer bg-slate-200 flex justify-center items-center rounded-full px-2"
                  >
                    <MdLeaderboard size={28} color="blue" />
                  </div>
                </div>
                <h5 className="text-[#6b042c] ml-5 text-start font-semibold">
                  Check out
                </h5>
                <h3
                  className={`${styles.sectionHeadText} ml-5 text-start  mb-5`}
                >
                  LeaderBoard
                </h3>
                { /*prettier-ignore  */}
                <p className={` text-xl font-medium"`}>
                Keep an eye on the <motion.b  className="text-[#000000]">leaderboard </motion.b>
                to see how you stack up against other players. The more accurate
                your predictions, the higher you'll climb!
              </p>
              </motion.div>
              {showLeaderboardArrow && (
                <ScrollDownArrow targetRef={sectionRefs.leaderboard} />
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
                      href="/userinfo"
                      className="bg-brown p-2 rounded-md w-[50%]"
                    >
                      <button className=" text-secondary  hover:text-white">
                        SIGN IN
                      </button>
                    </a>
                    <a
                      href="/userinfo"
                      className="bg-brown p-2 rounded-md w-[50%]"
                    >
                      <button className=" text-secondary  hover:text-white">
                        Register
                      </button>
                    </a>
                    <p></p>
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

export default SectionWrapper(Intro, "intro");
