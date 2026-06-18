import Image from "next/image";
import { FiMonitor } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { TbSquareRotatedFilled } from "react-icons/tb";

export interface ProjectItem {
  name: string;
  description: string;
  backImage: string;
  technologyStack: string[];
  liveLink: string;
  gitRepo: string;
}

interface ProjectProps {
  p: ProjectItem;
}

const Project = ({ p }: ProjectProps) => {
  return (
    <div>
      <div className="group relative">
        <Image
          src={p.backImage}
          alt={p.name}
          width={800}
          height={450}
          className="rounded-xl w-full object-cover"
        />

        <div className="absolute h-fit flex justify-between items-center bg-gradient-to-r p-5 from-[#8850f71c] to-[#2a145425] group-hover:opacity-100 transition-all -bottom-16 group-hover:bottom-5 backdrop-blur-2xl rounded-2xl opacity-0 md:-left-5 duration-500 w-full md:w-[550px]">
          <div className="md:max-w-[85%]">
            <h1 className="text-xl text-white font-semibold">
              Project Name: {p.name}
            </h1>
            <p className="text-sm text-justify text-white mt-1 font-normal">
              {p.description}.....
            </p>
            <div>
              <div className="flex gap-1 flex-wrap text-sm mt-2">
                {p.technologyStack.map((t) => (
                  <span
                    key={t}
                    className="bg-gradient-to-r from-[#6431FE] to-[#6431FE] rounded-full px-3 w-fit gap-2 flex items-center"
                  >
                    <span className="text-white">{t}</span>
                  </span>
                ))}
              </div>
              <div className="flex text-white justify-between my-3 gap-2">
                <a
                  className="flex gap-x-3 text-sm lg:text-base items-center lg:px-6 px-2 py-1 lg:py-2 border rounded-full border-purple-400 hover:bg-[#2a1454] transition-all duration-700 flashEffect relative overflow-hidden"
                  target="_blank"
                  rel="noreferrer"
                  href={p.liveLink}
                >
                  Live View <FiMonitor />
                </a>
                <a
                  className="flex gap-x-3 text-sm lg:text-base items-center lg:px-6 px-2 py-1 lg:py-2 border rounded-full border-purple-400 hover:bg-[#2a1454] transition-all duration-700 flashEffect relative overflow-hidden"
                  target="_blank"
                  rel="noreferrer"
                  href={p.gitRepo}
                >
                  GitHub Link
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <TbSquareRotatedFilled className="text-5xl text-white animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
