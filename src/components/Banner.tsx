"use client";
import Image from "next/image";
import { LuDownload } from "react-icons/lu";
import "./Banner.css";
import { BsEyeFill } from "react-icons/bs";
import { ReactTyped } from "react-typed";

const Banner = () => {
  return (
    <div className="max-w-[1480px] relative z-20 pt-4 font-inter mx-auto w-[92%] mt-10 md:mt-20 md:pb-40 pb-16">
      <div className="shape right"></div>

      <div className="flex flex-col-reverse items-center justify-center md:flex-row gap-12 md:gap-20 text-white">
        {/* Right side - Image */}
        {/* Right side - Image with Creative Animations */}
        <div className="mx-auto md:mr-12 relative image">
          {/* Animated Ring 1 */}
          <div className="absolute inset-0 rounded-full border-2 border-[#6431FE]/30 animate-spin-slow -z-10"></div>

          {/* Animated Ring 2 */}
          <div className="absolute inset-0 rounded-full border-2 border-[#B696FF]/20 animate-spin-slower -z-10"></div>

          {/* Animated Ring 3 */}
          <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse-ring -z-10"></div>

          {/* Floating Particles */}
          <div className="absolute -top-8 -right-8 w-4 h-4 bg-[#6431FE] rounded-full animate-float-particle"></div>
          <div className="absolute -bottom-6 -left-6 w-3 h-3 bg-[#B696FF] rounded-full animate-float-particle-delay"></div>
          <div className="absolute top-1/2 -right-12 w-2 h-2 bg-white/50 rounded-full animate-float-particle-2"></div>
          <div className="absolute bottom-1/3 -left-10 w-3 h-3 bg-[#6431FE]/50 rounded-full animate-float-particle-3"></div>

          {/* Animated Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6431FE]/10 to-[#B696FF]/10 rounded-full blur-2xl animate-glow-pulse -z-20"></div>

          <div className="ml-auto w-72 lg:w-96 relative imageProfile">
            <Image
              src="/banner.webp"
              alt="Al Amin Parvaz"
              width={400}
              height={500}
              className="rounded-[100px] relative z-10"
            />

            {/* Overlay Shine Effect */}
            <div className="absolute inset-0 rounded-[100px] overflow-hidden z-20 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-shine"></div>
            </div>

            {/* Status Badge */}
            {/* <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#6431FE] to-[#B696FF] text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg z-30 animate-bounce-slow">
              🚀 Available
            </div> */}
          </div>
        </div>

        {/* Left side - Content */}
        <div className="flex-1">
          {/* Name - Made bigger and more attractive */}
          <div className="text-left space-y-1 md:space-y-2">
            <h6 className=" text-2xl md:text-5xl font-extrabold relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6431FE] via-[#B696FF] to-[#6431FE] bg-[length:200%] animate-gradient">
                Al Amin Parvaje
              </span>
              {/* Glow effect behind the name */}
              <span className="absolute inset-0 blur-3xl -z-10 bg-gradient-to-r from-[#6431FE]/20 via-[#B696FF]/20 to-[#6431FE]/20"></span>
            </h6>
          </div>

          {/* Typing effect */}
          <h1 className="text-xl md:text-2xl  font-bold mt-3">
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

          {/* Description */}
          <p className="text-sm md:text-base text-gray-300 mt-4 mb-7">
            I am a skilled Full-Stack Developer with One Year of experience.
            Currently, I work at Al Jaami Technologies as a MERN Stack Team
            Lead, where I contribute to international, enterprise-level
            applications using TypeScript, Next.js, Node.js, PostgreSQL,
            MongoDB, and Prisma. I have a strong understanding of TypeScript and
            Object-Oriented Programming (OOP) principles. Additionally, I have
            Basic in DevOps practices and tools including Git, GitHub, Linux,
            VPS hosting, Nginx, PM2, Firebase, and Postman. I am passionate
            about leveraging my skills to develop high-quality, impactful web
            solutions with robust deployment and infrastructure.
          </p>

          {/* Resume Button */}
          <a
            download
            target="_blank"
            href="https://drive.google.com/file/d/1TGd0jAVYkjqDw9ePyqMWrqpVefnq4XCy/view?usp=drivesdk"
            className="p-[5px] border flex w-fit border-white/5 rounded-[10px] cursor-pointer btnBackground relative"
          >
            <span className="bg-linear-to-r text-white font-inter from-[#6431FE] to-[#B696FF] px-9 py-3 rounded-[10px] w-fit gap-2 items-center inline-flex flashEffect relative overflow-hidden">
              <span>Resume</span>
              <BsEyeFill />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
