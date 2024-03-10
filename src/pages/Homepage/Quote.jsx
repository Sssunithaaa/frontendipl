import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import { useState, useEffect } from "react";
import ScrollDownArrow from "../../Components/ScrollDown";

const Quote = ({ sectionRefs, images, showQuoteArrow, ScrollDownArrow }) => {
  const texts = [
    {
      "Sachin Tendulkar":
        "IPL is not just a cricket tournament; it's a celebration of the sport, uniting players and fans from all over the world.",
    },
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const currentText = Object.keys(texts[currentTextIndex])[0];
  const baseText = Object.values(texts[currentTextIndex])[0];

  const count = useMotionValue(0);
  const roundedCount = useTransform(count, Math.round);
  const displayText = useTransform(roundedCount, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const animation = animate(count, baseText.length, {
      type: "tween",
      duration: 7,
      ease: "easeIn",
      repeat: 1,
      repeatDelay: 1,
    });

    return () => {
      animation.stop();
    };
  }, [baseText.length]); // Ensure animation restarts when baseText changes

  const handleTextChange = () => {
    const nextTextIndex = (currentTextIndex + 1) % texts.length;
    setCurrentTextIndex(nextTextIndex);
  };
  return (
    <div className="lg:flex lg:flex-row mx-0 sm:mx-10 md:mx-10 flex flex-col lg:w-[100vw] lg:justify-center lg:items-center lg:h-[90vh]">
      <motion.div
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        initial="hidden"
        variants={fadeIn("right", "spring", 0.5, 2)}
        className="my-3 overflow-hidden h-[45%] w-[100%] lg:w-[50%] rounded-xl "
        style={{ position: "relative" }}
      >
        <div className="w-[80vw] lg:w-[70%] my-10 flex flex-col justify-center items-center mx-auto p-5 bg-[#faf9fd] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
          <img
            src={images.sachin}
            alt=""
            className="w-14 h-auto rounded-full my-3 mx-auto"
          />

          <motion.div>{displayText}</motion.div>
          <p className="font-bold text-purple-950">-&nbsp;{currentText}</p>
        </div>
      </motion.div>
      <motion.div
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        initial="hidden"
        className="flex flex-col text-secondary w-[80%] lg:w-[50%] mx-auto lg:m-[100px] p-2 bg-[#faf9fd] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-md justify-center items-center my-4"
        variants={fadeIn("left", "spring", 0.5, 2)}
      >
        <div className="lg:w-[100%] flex">
          <img
            src={images.crowd}
            alt="teams"
            className="w-[100%] mx-auto rounded-md"
          />
        </div>
        <div className="py-4 text-black font-semibold">
          In a clash of titans, ten formidable teams compete for ultimate glory.
          Who will emerge triumphant and etch their name in history?
        </div>
      </motion.div>
    </div>
  );
};

export default Quote;
