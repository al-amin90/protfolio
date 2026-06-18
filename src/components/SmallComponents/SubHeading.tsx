interface SubHeadingProps {
  title: string;
}

const SubHeading = ({ title }: SubHeadingProps) => {
  return (
    <div className="flex items-center justify-center font-inter">
      <div className="p-[5px] border flex w-fit border-white/15 rounded-full btnBackground">
        <span className="bg-gradient-to-r text-white px-3 w-fit gap-2 flex items-center">
          <span className="bg-gradient-to-r font-bold from-[#6431FE] to-[#cfbdfa] inline-block text-transparent bg-clip-text">
            {title}
          </span>
        </span>
      </div>
    </div>
  );
};

export default SubHeading;
