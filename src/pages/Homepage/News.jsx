import React from "react";
import { motion } from "framer-motion";
import { teams } from "../../constants";
import { fadeIn } from "../../utils/motion";
const News = () => {
  return (
    <>
      <div className="w-[100%] flex lg:flex-row flex-col flex-wrap justify-center">
        {teams["news"].map((team) => (
          <motion.div
            key={team.id} // Add a unique key for each mapped item
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            initial="hidden"
            className="flex flex-col text-secondary w-[95%] mg:w-[50%] h-[60vh]  lg:w-[30%] mx-auto lg:m-[20px] p-2 bg-[#faf9fd] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-md justify-center items-center my-4"
            variants={fadeIn("left", "spring", 0.5, 2)} // Assuming fadeIn is defined
          >
            <div className="lg:w-[100%] h-[40vh] flex">
              <img src={team.img} alt="teams" className=" mx-auto rounded-md" />
            </div>
            <div className="py-4 text-black font-semibold">{team.news}</div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default News;
