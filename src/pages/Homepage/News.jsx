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
            className="flex flex-col  w-[95%] mg:w-[50%] lg:h-[60vh] h-auto lg:w-[30%] mx-auto lg:m-[20px] bg-[#14111f] text-white rounded-sm justify-center items-center my-4"
            variants={fadeIn("left", "spring", 0.5, 2)} // Assuming fadeIn is defined
          >
            <div className="lg:w-[100%] lg:h-[45vh] h-[48vh]  flex">
              <img src={team.img} alt="teams" className="h-auto mx-auto " />
            </div>
            <div className="py-4 px-4 font-semibold">{team.news}</div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default News;
