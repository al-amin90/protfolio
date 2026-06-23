import Image from "next/image";
import { FiMonitor } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { TbSquareRotatedFilled } from "react-icons/tb";
import Link from "next/link";

export interface ProjectItem {
  _id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  sourceLink: string;
  order: number;
}

interface ProjectProps {
  p: ProjectItem;
}

const InfoContent = ({ p }: { p: ProjectItem }) => (
  <div className="w-full">
    <h1 className="text-base text-white font-semibold">{p.title}</h1>
    <p className="text-sm text-white/80 mt-1 leading-relaxed">
      {p.description.slice(0, 100)}...
    </p>

    <div className="flex gap-1 flex-wrap mt-2">
      {p.tags.map((t) => (
        <span
          key={t}
          className="px-2.5 py-0.5 text-xs bg-purple-600/20 text-purple-300 rounded-full border border-purple-400/20"
        >
          {t}
        </span>
      ))}
    </div>

    <div className="flex text-white gap-2 mt-3">
      <Link
        className="flex items-center gap-2 text-sm px-4 py-1.5 border rounded-full border-purple-400 text-white hover:bg-[#2a1454] transition-all duration-300"
        target="_blank"
        rel="noreferrer"
        href={p.liveLink}
      >
        Live View <FiMonitor />
      </Link>
      <Link
        className="flex items-center gap-2 text-sm px-4 py-1.5 border rounded-full border-purple-400 text-white hover:bg-[#2a1454] transition-all duration-300"
        target="_blank"
        rel="noreferrer"
        href={p.sourceLink}
      >
        GitHub <FaGithub />
      </Link>
    </div>
  </div>
);

const Project = ({ p }: ProjectProps) => {
  return (
    <div className="flex flex-col">
      {/* Image + desktop hover overlay */}
      <div className="group relative">
        <Image
          src={p.image}
          alt={p.title}
          width={800}
          height={450}
          className="rounded-t-xl group-hover:rounded-xl w-full object-cover"
        />
        <div className="group-hover:opacity-0 flex justify-between items-center gap-4 p-5 bg-gradient-to-r from-[#8850f71c] to-[#2a145425] backdrop-blur-2xl rounded-b-2xl  border border-white/10 w-full transition-all duration-500">
          <InfoContent p={p} />
        </div>

        {/* Desktop hover card */}
        <div className="hidden md:flex absolute justify-between items-center gap-4 p-5 bg-gradient-to-r from-[#8850f71c] to-[#2a145425] backdrop-blur-2xl rounded-2xl border border-white/10 opacity-0 -bottom-48 group-hover:opacity-100 group-hover:bottom-24 -left-4 w-[550px] transition-all duration-500">
          <InfoContent p={p} />
          <TbSquareRotatedFilled className="hidden md:block text-5xl text-white animate-spin flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default Project;
