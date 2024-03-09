import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";

const texts = [
  {
    "Sachin Tendulkar":
      "IPL is not just a cricket tournament; it's a celebration of the sport, uniting players and fans from all over the world.",
  },
  {
    "Harsha Bhogle":
      "IPL is cricketainment at its best, where every match is like a blockbuster movie, with twists and turns that keep you on the edge of your seat.",
  },
  {
    "MS Dhoni":
      "In IPL, every team has the potential to be a champion, making it the most unpredictable and exciting cricket league in the world.",
  },
  {
    "Rahul Dravid":
      "The IPL has revolutionized the way cricket is played and watched, bringing innovation, entertainment, and global recognition to the sport.",
  },
  {
    "Virat Kohli":
      "IPL is not just about cricket; it's about creating unforgettable moments and memories that last a lifetime, both on and off the field.",
  },
];

export default function Scrollable() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {texts.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="my-3 overflow-hidden rounded-xl p-5  bg-[#eeedf0] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
              style={{ position: "relative" }}
            >
              <p className="font-semibold text-teal-500">
                {Object.keys(item)[0]}
              </p>

              {Object.values(item)[0]}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
