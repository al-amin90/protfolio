import React from "react";
import SubHeading from "./SmallComponents/SubHeading";

const Education = () => {
  return (
    <div
      id="education"
      className="max-w-[1480px] relative z-10 font-inter  mx-auto w-[92%] pb-20"
    >
      <div className="shape right "></div>
      <SubHeading title="CSE "></SubHeading>
      <h2 className="text-center mt-1 text-white text-3xl md:text-4xl z-50  font-inter font-semibold   md:mt-4">
        My Education
      </h2>

      <div className="relative flex mt-5 items-center justify-center flex-col">
        <div className="bg-gradient-to-b gap-4 p-4 px-8 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] hover:shadow-[#2a1454] shadow-black/20 hover: border shadow-2xl border-white/20 inline-flex flashEffect relative overflow-hidden w-full md:w-2/3">
          <div>
            <p className=" font-semibold text-white text-lg">
              Computer Science and Technology (CST)
            </p>
            <h6 className="text-gray-50">Kushtia Polytechnic Institute</h6>
            <p className="text-sm text-white  mt-4">
              In College, I learned basic Java, data structures, and Python.
              knowing JavaScript which helped me understand those languages very
              easily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
