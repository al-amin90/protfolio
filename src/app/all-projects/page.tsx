"use client";

import { useEffect, useState } from "react";
import Project, { ProjectItem } from "@/components/SmallComponents/Project";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

const AllProject = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("projects", projects);

  async function fetchProjects() {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
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
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-700/50 rounded-xl h-[250px]"></div>
                  <div className="mt-4 space-y-3">
                    <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-full"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Navbar />

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
