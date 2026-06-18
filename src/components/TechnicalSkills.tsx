import Image from "next/image";
import SubHeading from "./SmallComponents/SubHeading";

const skills = [
  { name: "HTML", level: "Expert", image: "/Skills/html.png" },
  { name: "CSS", level: "Expert", image: "/Skills/css.png" },
  { name: "Javascript", level: "Expert", image: "/Skills/js.png" },
  { name: "Tailwind", level: "Expert", image: "/Skills/tailwind.png" },
  { name: "React", level: "Intermediate", image: "/Skills/rreact.png" },
  { name: "Next JS", level: "Beginner", image: "/Skills/next.png" },
  { name: "MongoDB", level: "Beginner", image: "/Skills/mongo.png" },
  { name: "Node JS", level: "Beginner", image: "/Skills/node.png" },
  { name: "ExpressJs", level: "Beginner", image: "/Skills/expresss.png" },
  { name: "JWT", level: "Beginner", image: "/Skills/jet.png" },
];

const TechnicalSkills = () => {
  return (
    <div
      id="skills"
      className="max-w-[1480px] relative z-20 md:pt-4 font-inter  mx-auto w-[92%] mt-8 pb-16 md:pb-40"
    >
      <div className="lg:block shape hidden"></div>
      <SubHeading title="Speciality"></SubHeading>
      <h2 className="text-center text-white text-3xl md:text-4xl z-50  font-inter font-semibold mt-4">
        My Technical Skills
      </h2>

      {/* all skills */}
      <div className="inline-flex justify-center items-center flex-wrap mt-6 md:mt-16 gap-3">
        {skills.map((skill) => (
          <div className="relative" key={skill.name}>
            <div className="bg-linear-to-b gap-4 p-4 px-8 justify-between rounded-xl from-[#ffffff0d] to-[#ffffff00] hover:shadow-[#2a1454] shadow-black/20 hover:border shadow-2xl border-white/20 inline-flex flashEffect relative overflow-hidden">
              <Image
                src={skill.image}
                alt={skill.name}
                width={40}
                height={40}
                className="w-10 duration-500 object-contain"
              />
              <div>
                <p className="text-gray-50">{skill.level}</p>
                <h6 className="font-semibold text-white text-lg">
                  {skill.name}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSkills;
