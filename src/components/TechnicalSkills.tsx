"use client";

import Image from "next/image";
import SubHeading from "./SmallComponents/SubHeading";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  { name: "HTML", image: "/Skills/html.png", color: "#E34F26" },
  { name: "CSS", image: "/Skills/css.png", color: "#1572B6" },
  { name: "JavaScript", image: "/Skills/javascript.svg", color: "#F7DF1E" },
  { name: "TypeScript", image: "/Skills/typescript.svg", color: "#3178C6" },
  { name: "Tailwind", image: "/Skills/tailwind.svg", color: "#06B6D4" },
  { name: "React", image: "/Skills/rreact.png", color: "#61DAFB" },
  { name: "Redux", image: "/Skills/redux.svg", color: "#764ABC" },
  { name: "Next JS", image: "/Skills/NextJS-Dark.svg", color: "#fff" },
  { name: "Node JS", image: "/Skills/node.png", color: "#339933" },
  { name: "ExpressJs", image: "/Skills/expresss.png", color: "#67686C" },
  { name: "JWT", image: "/Skills/jet.png", color: "#FB2271" },
  { name: "MongoDB", image: "/Skills/mongo.png", color: "#47A248" },
  {
    name: "Mongoose",
    image: "/Skills/mongoose-original-wordmark.svg",
    color: "#880000",
  },
  { name: "MySQL", image: "/Skills/MySQL-Dark.svg", color: "#4479A1" },
  { name: "PostgreSQL", image: "/Skills/postgres.svg", color: "#4169E1" },
  { name: "Prisma", image: "/Skills/Prisma.svg", color: "#2D3748" },
  { name: "Firebase", image: "/Skills/firebase.svg", color: "#FFCA28" },
  { name: "SCSS", image: "/Skills/file_type_scss2.svg", color: "#CC6699" },
  { name: "Linux", image: "/Skills/linux.svg", color: "#FCC624" },
];

const TechnicalSkills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [bubbles, setBubbles] = useState<
    { name: string; x: number; y: number; id: number; color: string }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  let bubbleId = 0;

  // Random bubble pop-out animation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * skills.length);
      const skill = skills[randomIndex];

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = Math.random() * (rect.width - 80) + 40;
      const y = Math.random() * (rect.height - 80) + 40;

      const newBubble = {
        name: skill.name,
        x: x,
        y: y,
        color: skill.color,
        id: bubbleId++,
      };

      setBubbles((prev) => [...prev, newBubble]);

      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, 2500);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="skills"
      ref={containerRef}
      className="max-w-[1480px] relative z-20 md:pt-4 font-inter mx-auto w-[92%] pb-16 md:pb-40 overflow-hidden"
    >
      <div className=" shape "></div>
      <SubHeading title="Speciality"></SubHeading>
      <h2 className="text-center text-white text-3xl md:text-4xl z-50 font-inter font-semibold mt-4">
        My Technical Skills
      </h2>

      {/* Floating Bubbles */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{
              scale: 0,
              opacity: 0,
              x: bubble.x,
              y: bubble.y,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: bubble.y - 40,
            }}
            exit={{
              scale: 0,
              opacity: 0,
              y: bubble.y - 80,
            }}
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0.5,
            }}
            className="fixed pointer-events-none z-50"
            style={{
              left: bubble.x,
              top: bubble.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
              className="relative"
            >
              {/* Bubble Circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${bubble.color}33, ${bubble.color}11)`,
                  border: `2px solid ${bubble.color}44`,
                  boxShadow: `0 0 40px ${bubble.color}22, inset 0 0 30px ${bubble.color}11`,
                }}
              >
                <span
                  className="text-xs font-bold text-center px-2"
                  style={{ color: bubble.color }}
                >
                  {bubble.name}
                </span>
              </div>

              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full blur-xl -z-10"
                style={{
                  background: bubble.color,
                  opacity: 0.2,
                }}
              ></div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Skills Grid */}
      <div className="flex w-[75%] mx-auto justify-center items-center flex-wrap mt-6 md:mt-16 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.03,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{
              scale: 1.12,
              rotate: [0, -3, 3, -3, 0],
              transition: { duration: 0.4 },
            }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            className="relative w-[116px] h-[84px] bg-linear-to-b gap-4 p-4 px-8 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] hover:shadow-[#2a1454] shadow-black/20 border shadow-2xl border-white/20 inline-flex flashEffect overflow-hidden cursor-pointer group"
            style={{
              borderColor:
                hoveredSkill === skill.name
                  ? skill.color + "66"
                  : "rgba(255,255,255,0.1)",
              transition: "border-color 0.3s ease",
            }}
          >
            <Image
              src={skill.image}
              alt={skill.name}
              fill
              className="p-5 duration-500 object-contain group-hover:scale-110 transition-transform"
            />

            {/* Hover Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: hoveredSkill === skill.name ? 1 : 0,
                y: hoveredSkill === skill.name ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-[#1a1b26] via-[#1a1b26]/80 to-transparent rounded-xl flex items-center justify-center"
            >
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{
                  scale: hoveredSkill === skill.name ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                className="text-white font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${skill.color}, ${skill.color}88)`,
                }}
              >
                {skill.name}
              </motion.span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Floating Marquee */}
      <div className="relative w-full h-12 mt-8 overflow-hidden opacity-30">
        <motion.div
          animate={{
            x: [0, -1200],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <span
              key={index}
              className="text-gray-400 font-mono text-xs tracking-widest"
            >
              {skill.name} ◆
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechnicalSkills;
