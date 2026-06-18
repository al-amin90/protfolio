import Image from "next/image";
import { LuDownload } from "react-icons/lu";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="max-w-[1480px] relative z-20 pt-4 font-inter mx-auto w-[92%] mt-10 md:pb-40 pb-16">
      <div className="shape right"></div>
      <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-0 text-white">
        {/* left side */}
        <div className="flex-1">
          <div className="text-lg md:text-xl font-medium space-y-1 md:space-y-2">
            <h6>Hello,</h6>
            <h6>I am Al Amin Parvaz</h6>
          </div>
          <h1 className="text-2xl md:text-5xl font-bold mt-4">
            A{" "}
            <span className="bg-linear-to-r from-[#6431FE] to-[#B696FF] inline-block text-transparent bg-clip-text">
              Full Stact Developer_
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-300 mt-4 mb-7">
            I am a Dedicated Junior MERN Stack Developer Developer. My aim to
            contribute meaningfully to projects that challenge and inspire me,
            driving success for the company. My 2 Year Experience in Graphic
            Design helps me make eye-catching and Dynamic websites. I have
            successfully completed around 55+ projects ranging from small
            personal projects to large-scale applications.
          </p>

          <a
            download
            href="/Front%20end%20Developer%20Al%20Amin-%20Resume.pdf%20.pdf"
            className="p-[5px] border flex w-fit border-white/5 rounded-[10px] cursor-pointer btnBackground relative"
          >
            <span className="bg-linear-to-r text-white font-inter from-[#6431FE] to-[#B696FF] px-9 py-3 rounded-[10px] w-fit gap-2 items-center inline-flex flashEffect relative overflow-hidden">
              <span>Download Resume</span>
              <LuDownload />
            </span>
          </a>
        </div>

        {/* right side */}
        <div className="flex-1 mx-auto md:mr-12 relative image">
          <div className="ml-auto w-72 lg:w-96 relative imageProfile">
            <Image
              src="/banner.png"
              alt="Al Amin Parvaz"
              width={400}
              height={500}
              className="rounded-[100px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
