"use client";

import { ReactTyped } from "react-typed";

// ✅ This is a Client Component with "use client"
const TypedText = () => {
  return (
    <h1 className="text-xl text-center md:text-left font-bold mt-1 lg:mt-3">
      A{" "}
      <span className="bg-linear-to-r from-[#6431FE] to-[#B696FF] inline-block text-transparent bg-clip-text">
        <ReactTyped
          strings={[
            "Full Stack Developer",
            "Team Lead",
            "Problem Solver",
            "Tech Enthusiast",
          ]}
          typeSpeed={80}
          backSpeed={50}
          backDelay={2000}
          loop
          showCursor={true}
          cursorChar="_"
        />
      </span>
    </h1>
  );
};

export default TypedText;
