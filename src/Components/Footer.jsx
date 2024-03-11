import React from "react";
import SocialMediaShare from "./SocialMediaShare";
import { ShareSocial } from "react-share-social";
const getUrl = () => {
  return window.location.href;
};
const style = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
  },
  copyContainer: {
    border: "1px solid blue",
    background: "rgb(0,0,0,0.7)",
  },
  title: {
    color: "aquamarine",
    fontStyle: "italic",
  },
};
const RSS = () => {
  return (
    <ShareSocial
      title={"Check out this website"}
      url=""
      socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
      style={style}
    />
  );
};
const CTA = () => {
  const url = getUrl();
  // Do something with the URL

  return (
    <div>
      <section className=" bottom-0 left-0 right-0 w-full">
        <svg
          className="h-auto max-h-40 w-full translate-y-[1px]"
          preserveAspectRatio="none"
          viewBox="0 0 2160 263"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Wave"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
            fill="#262626"
          />
        </svg>
        <section
          className="relative"
          style={{
            backgroundColor: "#262626",
            height: "auto",
          }}
        >
          <div className="container w-screen py-6 mx-auto ">
            <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-3 gap-x-4 gap-y-8 place-items-center">
              <div>
                <h4 className="text-white text-3xl font-semibold">Share on:</h4>
                <div className="mx-auto mt-2 flex w-full flex-col content-center items-center text-center">
                  <SocialMediaShare
                    url={encodeURI(window.location.href)}
                    title="Check out the predictive play website"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-white text-3xl font-semibold">
                  Contact Us
                </h4>
                <p className="text-gray-300 mt-2">Email: example@example.com</p>
                <p className="text-gray-300">
                  Social Media: [Facebook] [Twitter] [Instagram]
                </p>
              </div>
              <div>
                <h4 className="text-white text-3xl font-semibold">
                  Quick Links
                </h4>
                <ul className="mt-2">
                  <li>
                    <a href="/terms" className="text-gray-300 hover:text-white">
                      Register
                    </a>
                  </li>
                  <li>
                    <a href="/board" className="text-gray-300 hover:text-white">
                      Leaderboard
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-300">
                &copy; {new Date().getFullYear()} Predictive Play. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default CTA;
