import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-9 mx-5 sm:mx-20 md:mx-28 lg:mx-44 ">
      <h1 className=" font-extrabold text-[30px] md:text-[50px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Adventure with AI:{" "}
        </span>
        Personalized Itineraries at your Fingertips
      </h1>
      <p className=" text-lg text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interest and budget.
      </p>
      <Link to={"/create-trip"}>
        <Button> Get Started, It's free</Button>
      </Link>

      <div className=" mt-10">
        <img
          src="/landing_photo.jpg"
          alt=""
          className="h-[32rem] w-full object-cover rounded-xl shadow-lg mb-10"
        />
      </div>
    </div>
  );
};

export default Hero;
