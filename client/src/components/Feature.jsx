import React from "react";
import feature from "../assets/images/feature.jpg";
const Feature = () => {
  return (
    <div className="main w-full flex">
      <div className="left w-1/2 bg-[#f0f0f0] h-[80vh] flex flex-col items-start justify-center px-16">
        <div className="text-6xl py-4 leading-[4rem] text-[#9aafbf] ">Welcome To Our BookStore</div>
        <div className=" pb-3 text-slate-500 text-lg font-semibold max-w-md text-start">"I have always imagined that Paradise will be a kind of library." — Jorge Luis Borges</div>
        <button className=" text-white bg-gradient-to-r from-[#31a9bd] to-[#9aafbf] hover:bg-gradient-to-bl focus:outline-none  font-medium rounded-lg text-sm px-5 py-3 text-center my-4">Get Started</button>
      </div>
      <div className="right w-1/2 h-[80vh]">
        <img
          className="w-full h-full"
          src={feature}
          alt="feature image"
        />
      </div>
    </div>
  );
};

export default Feature;
