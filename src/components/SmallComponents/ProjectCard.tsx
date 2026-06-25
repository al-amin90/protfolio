import Image from "next/image";
import { FiImage, FiMonitor } from "react-icons/fi";
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
      {p.description.slice(0, 180)}...
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

const ProjectCard = ({ p }: ProjectProps) => {
  return (
    <div className="flex flex-col">
      {/* Image + desktop hover overlay */}
      <div className="flex-1 min-w-0">
        <div className="relative w-full h-72 rounded-lg overflow-hidden bg-gradient-to-br from-[#6431FE]/10 to-[#B696FF]/10 mb-3">
          {p.image ? (
            <Image src={p.image} alt={p.title} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <FiImage className="text-4xl" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="group-hover:opacity-0 flex justify-between items-center gap-4 p-5 bg-gradient-to-r from-[#8850f71c] to-[#2a145425] backdrop-blur-2xl rounded-b-2xl  border border-white/10 w-full transition-all duration-500">
          <InfoContent p={p} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
