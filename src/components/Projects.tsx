"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Project, { ProjectItem } from "./SmallComponents/Project";
import SubHeading from "./SmallComponents/SubHeading";

const Projects = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    fetch("/project.json")
      .then((res) => res.json())
      .then((data: ProjectItem[]) => setProjects(data))
      .catch((error) => {
        console.error("Failed to load projects", error);
      });
  }, []);

  return (
    <div
      id="projects"
      className="max-w-[1480px] relative z-20 pt-4 font-inter mx-auto w-[92%] mt-8 pb-40"
    >
      <SubHeading title="Expert" />
      <h2 className="text-center text-white text-3xl md:text-4xl z-50 font-inter font-semibold mt-4">
        My Recent Projects
      </h2>

      <div className="grid grid-cols-1 gap-5 mt-6 md:mt-16 lg:grid-cols-2">
        {projects.slice(0, 4).map((p) => (
          <Project key={p.name} p={p} />
        ))}
      </div>

      <div className="flex items-center justify-center mt-8">
        <Link
          href="/all-projects"
          className="p-[5px] border flex w-fit border-white/5 rounded-[10px] cursor-pointer btnBackground relative"
        >
          <span className="bg-gradient-to-r text-white font-inter from-[#6431FE] to-[#B696FF] px-9 py-3 rounded-[10px] w-fit gap-2 items-center inline-flex flashEffect relative overflow-hidden">
            See All 55+
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Projects;
