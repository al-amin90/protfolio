"use client";

import { HiOutlineMail } from "react-icons/hi";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import SubHeading from "./SmallComponents/SubHeading";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { useState } from "react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // ✅ Option A: Using FormSubmit (free, no backend needed)
      const response = await fetch("https://formsubmit.co/ijesun30@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "✅ Message sent successfully! I'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "❌ Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      id="contact"
      className="max-w-[1480px] relative z-20 md:pt-4 font-inter mb-6 md:mb-24 mx-auto w-[92%] mt-12"
    >
      <SubHeading title="get in touch" />
      <h2 className="text-center text-white text-3xl md:text-4xl z-50 font-inter font-semibold mt-4">
        Contact with me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7 md:mt-12">
        <div className="relative flex items-center justify-center">
          <img
            className="w-auto h-[416px] opacity-95 object-cover rounded-xl"
            src="/contact.png"
            alt="Contact"
          />
        </div>

        {/* ✅ Updated form with proper submission */}
        <form
          onSubmit={handleSubmit}
          className="text-white w-full text-2xl bg-gradient-to-t gap-4 p-5 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] border border-white/20"
        >
          <div>
            {/* Social Icons */}
            <div className="text-3xl flex gap-x-6 justify-center my-3">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/alaminparvaz.jesun"
                className="p-3 hover:bg-gradient-to-r from-[#6431FE] to-[#B696FF] bg-white/20 rounded-full"
              >
                <FaFacebookF className="text-base text-white" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/al-amin90"
                className="p-3 hover:bg-gradient-to-r from-[#6431FE] to-[#B696FF] bg-white/20 rounded-full"
              >
                <FaGithub className="text-base text-white" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/al-amin-parvaz1"
                className="p-3 hover:bg-gradient-to-r from-[#6431FE] to-[#B696FF] bg-white/20 rounded-full"
              >
                <FaLinkedinIn className="text-base text-white" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com"
                className="p-3 hover:bg-gradient-to-r from-[#6431FE] to-[#B696FF] bg-white/20 rounded-full"
              >
                <FaYoutube className="text-base text-white" />
              </a>
            </div>

            <div className="mt-6">
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-white/20 outline-none text-sm w-full rounded-2xl p-4 placeholder:text-white/50"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="bg-white/20 outline-none text-sm w-full rounded-2xl p-4 placeholder:text-white/50"
                />
              </div>
              <textarea
                className="bg-white/20 outline-none text-sm w-full rounded-2xl p-4 mt-3 placeholder:text-white/50"
                name="message"
                placeholder="Your Message"
                cols={20}
                rows={7}
                required
              />
            </div>

            {/* ✅ Status message */}
            {formStatus.type && (
              <div
                className={`mt-3 p-3 rounded-xl text-sm ${
                  formStatus.type === "success"
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 flex items-center justify-center"
            >
              <span
                className={`bg-gradient-to-r text-white font-inter from-[#6431FE] to-[#B696FF] px-9 w-full py-3 mx-auto rounded-2xl gap-2 text-base font-medium flashEffect relative overflow-hidden ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </span>
            </button>

            {/* ✅ Hidden fields for FormSubmit */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_subject"
              value="New Contact Form Message"
            />
          </div>
        </form>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-5">
        <div className="relative flex mt-5 items-center justify-center flex-col">
          <div className="bg-gradient-to-t gap-4 p-4 px-8 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] hover:border shadow-2xl border-white/20 w-full">
            <div>
              <p className="font-semibold text-white text-2xl bg-gradient-to-t gap-4 p-2 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] w-fit border border-white/20">
                <HiOutlineMail />
              </p>
              <h6 className="text-gray-50 text-lg mt-4">Email Me</h6>
              <a
                href="mailto:ijesun30@gmail.com"
                className="text-gray-200 text-sm mt-2 hover:text-[#B696FF] transition-colors block"
              >
                ijesun30@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex mt-5 items-center justify-center flex-col">
          <div className="bg-gradient-to-t gap-4 p-4 px-8 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] hover:border shadow-2xl border-white/20 w-full">
            <div>
              <p className="font-semibold text-white text-2xl bg-gradient-to-t gap-4 p-2 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] w-fit border border-white/20">
                <IoCallOutline />
              </p>
              <h6 className="text-gray-50 text-lg mt-4">Call Me</h6>
              <a
                href="tel:+8801752736250"
                className="text-gray-200 text-sm mt-2 hover:text-[#B696FF] transition-colors block"
              >
                +8801752736250
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex mt-5 items-center justify-center flex-col">
          <div className="bg-gradient-to-t gap-4 p-4 px-8 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] hover:border shadow-2xl border-white/20 w-full">
            <div>
              <p className="font-semibold text-white text-2xl bg-gradient-to-t gap-4 p-2 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] w-fit border border-white/20">
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
