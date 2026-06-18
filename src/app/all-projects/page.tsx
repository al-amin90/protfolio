"use client";

import { useEffect, useState } from "react";
import Project, { ProjectItem } from "@/components/SmallComponents/Project";

const AllProject = () => {
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
    <div className="overflow-hidden">
      <div
        className="bg-no-repeat"
        style={{ backgroundImage: "url('/line.png')" }}
      >
        <div className="max-w-[1480px] relative z-20 pt-4 font-inter mx-auto w-[92%] mt-8 pb-40">
          <h2 className="text-center text-white text-3xl md:text-4xl z-50 font-inter font-semibold mt-4">
            My All Projects
          </h2>

          <div className="grid grid-cols-1 gap-5 mt-6 md:mt-16 lg:grid-cols-2">
            {projects.map((p) => (
              <Project key={p.name} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProject;
