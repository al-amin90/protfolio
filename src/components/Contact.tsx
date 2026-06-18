import { HiOutlineMail } from "react-icons/hi";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import SubHeading from "./SmallComponents/SubHeading";
import email from "../assets/gmail.gif";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const Contact = () => {
  return (
    <div
      id="contact"
      className="max-w-[1480px] relative z-20 md:pt-4 font-inter mb-6 md:mb-24 mx-auto w-[92%] mt-12 "
    >
      <SubHeading title="get in touch"></SubHeading>
      <h2 className="text-center text-white text-3xl md:text-4xl z-50  font-inter font-semibold mt-4">
        Contact with me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7 md:mt-12">
        <div className="">
          <img
            className=" w-full h-[26rem] opacity-95 object-cover rounded-xl"
            src={email}
            alt=""
          />
        </div>
        <form className="text-white w-full text-2xl bg-gradient-to-t gap-4 p-5  justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] border border-white/20">
          <div>
            <div className="text-3xl flex gap-x-6 justify-center my-3">
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

            <div className="mt-6">
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-white/20 outline-none text-sm w-full rounded-2xl p-4"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white/20 outline-none text-sm w-full rounded-2xl p-4"
                />
              </div>
              <textarea
                className="bg-white/20 outline-none text-sm w-full rounded-2xl p-4 mt-3"
                name=""
                id=""
                placeholder="Message"
                cols="20"
                rows="7"
              ></textarea>
            </div>
            <button className="w-full mt-2 flex items-center justify-center">
              <span className="bg-gradient-to-r text-white font-inter from-[#6431FE] to-[#B696FF] px-9 w-full py-3 mx-auto rounded-2xl gap-2 text-base font-medium  flashEffect relative overflow-hidden">
                Submit
              </span>
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-5">
        <div className="relative flex mt-5 items-center justify-center flex-col">
          <div className="bg-gradient-to-t gap-4 p-4 px-8 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] hover: border shadow-2xl border-white/20 w-full ">
            <div>
              <p className=" font-semibold text-white text-2xl bg-gradient-to-t gap-4 p-2  justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] w-fit border border-white/20">
                <HiOutlineMail />
              </p>
              <h6 className="text-gray-50 text-lg mt-4">Email Me</h6>
              <p className="text-gray-200 text-sm mt-2">ijesun30@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="relative flex mt-5 items-center justify-center flex-col">
          <div className="bg-gradient-to-t gap-4 p-4 px-8 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] hover: border shadow-2xl border-white/20 w-full ">
            <div>
              <p className=" font-semibold text-white text-2xl bg-gradient-to-t gap-4 p-2  justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] w-fit border border-white/20">
                <IoCallOutline />
              </p>
              <h6 className="text-gray-50 text-lg mt-4">Call Me</h6>
              <p className="text-gray-200 text-sm mt-2">+8801752736250</p>
            </div>
          </div>
        </div>
        <div className="relative flex mt-5 items-center justify-center flex-col">
          <div className="bg-gradient-to-t gap-4 p-4 px-8 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] hover: border shadow-2xl border-white/20 w-full ">
            <div>
              <p className=" font-semibold text-white text-2xl bg-gradient-to-t gap-4 p-2  justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] w-fit border border-white/20">
                <IoLocationOutline />
              </p>
              <h6 className="text-gray-50 text-lg mt-4">My Location</h6>
              <p className="text-gray-200 text-sm mt-2">
                Kushtia, Khulna Division, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
