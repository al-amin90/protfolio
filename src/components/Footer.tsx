import logo from "/logo.png";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="mt-14 md:mt-32 ">
      <div className="py-16 md:py-20  border-purple-400 border-t relative z-30 rounded-2xl bg-gradient-to-b from-[#ffffff0d] to-[#ffffff00]">
        <div className="text-gray-200 flex justify-center mx-auto flex-col max-w-44 cursor-pointer">
          <div>
            <img src={logo} className="mx-auto" alt="" />
          </div>
        </div>
        <div className="max-w-[900px] mx-auto w-[95%]">
          <p className="text-base text-gray-400 mt-6 font-medium text-center">
            Let's build something amazing together. I'm available for freelance
            projects, collaborations, and full-time opportunities. Drop me a
            message, and let's discuss how we can turn your ideas into reality.
          </p>
          <div className="text-3xl flex gap-x-6 justify-center my-5">
            <a
              target="_blank"
              href="https://www.facebook.com/alaminparvaz.jesun"
              className=" p-3 hover:bg-gradient-to-r from-[#6431FE] to-[#B696FF] bg-white/20 rounded-full"
            >
              <FaFacebookF className="text-base text-white" />
            </a>
            <a
              target="_blank"
              href="https://github.com/al-amin90"
              className=" p-3 hover:bg-gradient-to-r from-[#6431FE] to-[#B696FF] bg-white/20 rounded-full"
            >
              <FaGithub className="text-base text-white" />
            </a>
            <a
              target="_blank"
              href="www.linkedin.com/in/al-amin-parvaz1"
              className=" p-3 hover:bg-gradient-to-r from-[#6431FE] to-[#B696FF] bg-white/20 rounded-full"
            >
              <FaLinkedinIn className="text-base text-white" />
            </a>
            <a className=" p-3 hover:bg-gradient-to-r from-[#6431FE] to-[#B696FF] bg-white/20 rounded-full">
              <FaYoutube className="text-base text-white" />
            </a>
          </div>
        </div>
        <footer className="footer footer-center p-4 text-gray-300">
          <aside>
            <p className="text-center">
              Copyright © 2024 - All rights reserved by AL_AMIN
            </p>
          </aside>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
