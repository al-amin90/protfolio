// app/components/Banner.tsx (Server Component)
import Image from "next/image";
import { LuDownload } from "react-icons/lu";
import { BsEyeFill } from "react-icons/bs";
import "./Banner.css";
import TypedText from "./TypedText";
import Link from "next/link";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

// ✅ This is a Server Component by default (no "use client")
const Banner = () => {
  return (
    <div className="max-w-[1480px] relative z-20 pt-4 font-inter mx-auto w-[92%] mt-10 md:mt-20 md:pb-40 pb-16">
      <div className="shape right"></div>

      <div className="flex flex-col  lg:flex-row-reverse items-center justify-center md:flex-row gap-12 md:gap-20 text-white">
        {/* Right side - Image with Creative Animations */}
        <div className="mx-auto md:mr-12 relative image">
          {/* Animated Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-[#6431FE]/30 animate-spin-slow -z-10"></div>
          <div className="absolute inset-0 rounded-full border-2 border-[#B696FF]/20 animate-spin-slower -z-10"></div>
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
              priority // ✅ Priority loading for above-the-fold image
            />

            {/* Overlay Shine Effect */}
            <div className="absolute inset-0 rounded-[100px] overflow-hidden z-20 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-shine"></div>
            </div>
          </div>
        </div>

        {/* Left side - Content */}
        <div className="flex-1">
          {/* Name - Made bigger and more attractive */}
          <div className="text-left space-y-1 md:space-y-2">
            <h6 className="text-[2rem] text-center md:text-left  font-extrabold relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6431FE] via-[#B696FF] to-[#6431FE] bg-[length:200%] animate-gradient">
                Al Amin Parvaje
              </span>
              {/* Glow effect behind the name */}
              <span className="absolute inset-0 blur-3xl -z-10 bg-gradient-to-r from-[#6431FE]/20 via-[#B696FF]/20 to-[#6431FE]/20"></span>
            </h6>
          </div>

          {/* ✅ Client Component for typing effect */}
          <TypedText />

          {/* Description */}
          <p className="text-sm md:text-base text-center md:text-left text-gray-300 mt-4 lg:mt-2 mb-7">
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
          <div className="flex items-center justify-center md:justify-start">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/file/d/1TGd0jAVYkjqDw9ePyqMWrqpVefnq4XCy/view?usp=drivesdk"
              className="group relative inline-block p-[5px] border border-white/5 rounded-[10px] cursor-pointer"
            >
              {/* Glow effect - positioned behind the button */}
              <span className="absolute -inset-1 bg-gradient-to-r from-[#6431FE] to-[#B696FF] rounded-xl blur-0 group-hover:blur-2xl opacity-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />

              {/* Button content */}
              <span className="relative flex items-center gap-3 px-9 py-3 bg-gradient-to-r from-[#6431FE] to-[#B696FF] rounded-[10px] text-white font-inter font-medium overflow-hidden">
                {/* Left eye icon */}
                <BiLeftArrow className="text-white text-sm group-hover:animate-pulse transition-all duration-300" />

                {/* Text */}
                <span className="relative z-10 font-semibold tracking-wider text-sm group-hover:tracking-widest transition-all duration-300">
                  Resume
                </span>

                {/* Right eye icon with animation */}
                <BiRightArrow className="text-white text-sm group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />

                {/* Shine effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
