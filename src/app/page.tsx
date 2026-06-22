import Banner from "@/components/Banner";
import TechnicalSkills from "@/components/TechnicalSkills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import BannerImg from "@/components/BannerImg";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Banner />
      <div
        className="bg-no-repeat"
        style={{ backgroundImage: "url('/line.png')" }}
      >
        <TechnicalSkills />
        <Projects />
      </div>
      <Education />
      <Contact />
      <BannerImg />
    </main>
  );
}
