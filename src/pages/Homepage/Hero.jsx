import React from "react";
import { images } from "../../constants";
import { styles } from "../../styles";
const HeroSection = () => {
  const imagess = [
    images.b,
    images.c,

    images.e,
    images.f,
    images.g,
    images.h,
    images.i,
    images.j,
  ];
  return (
    <div className="hero h-[750px] w-[100vw] relative overflow-hidden">
      <div
        className=" absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        // style={{ backgroundImage: `url(${images.k})` }}
      ></div>
      <div className=" flex flex-col lg:mt-[10%] mt-[20%] z-50 items-center mx-5">
        <h1 className={`${styles.heroHeadText}  `}>Predictive Play</h1>
        <p
          className={`text-xl z-49 mx-20 mt-2 font-bold text-[#301a51] font-md`}
        >
          Compete with other players and showcase your predictive skills!
        </p>
      </div>
      <div className="scrollable-images absolute bottom-0 left-0 z-50 w-full flex items-center justify-start overflow-x-auto whitespace-nowrap scrollbar-hide pl-auto lg:mx-10 py-6">
        {imagess.map((image) => (
          <img
            src={image}
            alt="Image 3"
            className="max-h-[300px] z-50 rounded-md mr-4 object-contain"
          />
        ))}
        {/* Add more images as needed */}
      </div>
    </div>
  );
};

export default HeroSection;
