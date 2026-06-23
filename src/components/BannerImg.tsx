import Image from "next/image";

const BannerImg = () => {
  return (
    <div className="max-w-[1480px] bannerImg opacity-90 relative z-0 pt-4 font-inter mx-auto w-[92%] mt-8">
      <div className="shape hidden lg:block"></div>
      <Image
        src="/banner.png"
        width={1400}
        height={500}
        className="w-full rounded-3xl mix-blend-multiply"
        alt="GitHub banner"
      />
    </div>
  );
};

export default BannerImg;
