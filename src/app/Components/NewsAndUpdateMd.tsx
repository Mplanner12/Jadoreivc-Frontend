import React from "react";

import Image from "next/image";
import News1 from "../../../public/News1.png";
import News2 from "../../../public/News2.png";
import News3 from "../../../public/News3.png";
import News4 from "../../../public/News4.png";
import News5 from "../../../public/News5.png";

const NewsUpdate = [
  {
    text: "Smart Farming: 5 Agri-Tech Solutions Boosting Crop Yields in Nigeria",
    src: News1,
    alt: "News1",
    width: 400,
    height: 270,
  },
  {
    text: "The Future of Nigerian Agriculture: 5 Agri-Tech Trends to Watch",
    src: News2,
    alt: "News2",
    width: 400,
    height: 270,
  },
  {
    text: "Northern Nigeria's Agricultural Boom: Key Crops and Techniques",
    src: News3,
    alt: "News3",
    width: 400,
    height: 270,
  },
  {
    text: "The Role of Traditional and Modern Techniques in Northern Nigerian Agriculture",
    src: News4,
    alt: "News4",
    width: 400,
    height: 270,
  },
  {
    text: "Top 5 Agri-Tech Startups Leading the Agricultural Revolution in Nigeria",
    src: News5,
    alt: "News5",
    width: 400,
    height: 270,
  },
];

const NewsAndUpdateMd = () => {
  return (
    <div className="hidden md:flex w-full h-fit md:flex-col justify-between items-center mb-[5.85rem] py-[1.75rem] px-[3.95rem]">
      <div className="w-full flex justify-between items-center md:mb-[1.5rem]  mb-[0.5rem]">
        <div className="py-[1.25rem]">
          <h1 className="font-semibold text-[1.7rem]  md:text-[1.75rem] text-teal-950 tracking-wide md:text-lg relative left-[1.25rem]">
            News & Updates
          </h1>
        </div>
        <button className="md:relative h-fit text-white text-lg md:text-sm tracking-wider font-extralight bg-orange-400 uppercase rounded-[2rem] gap-y-2 px-[1rem] md:px-[1.75rem] py-[0.75rem] md:py-[1rem]">
          View More
        </button>
      </div>
      <div className="grid grid-cols-5 w-full h-fit py-[1.5rem] px-[0.25rem]  gap-x-[0.5rem]">
        {NewsUpdate.map((news, index) => (
          <div
            key={news.alt}
            className="w-full h-fit mb-[1.5rem] flex flex-col justify-center items-center rounded-md gap-y-1.5"
          >
            <Image
              className="rounded-lg px-[0.5rem]"
              src={news.src}
              alt={news.alt}
              width={news.width}
              height={news.height}
            />
            <div className="w-fit px-[0.5rem] pt-[1rem]">
              <p className="text-teal-950 text-[1.1rem] md:text-[0.85rem] font-semibold tracking-wide text-start">
                {news.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsAndUpdateMd;
