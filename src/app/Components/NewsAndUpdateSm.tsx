"use client";

import * as React from "react";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";

import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
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
const NewsAndUpdate = () => {
  const plugin = React.useRef<AutoplayType>(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="md:hidden p-[2rem] md:px-[4.25rem] pt-[1rem] md:pt-[2rem] pb-[1rem] w-full flex flex-col justify-center mb-[4rem] md:mb-[32rem]">
      <div className="w-full flex justify-between items-center md:mb-[-1.5rem]  mb-[0.5rem]">
        <div className="py-[1.25rem]">
          <h1
            id="mini-header"
            className="font-semibold text-[1.35rem] tracking-wide md:text-lg"
          >
            News and Updates
          </h1>
        </div>
        <button
          id="viewMore"
          className="md:relative md:-left-[1.75rem] h-fit text-white text-[1rem] md:text-sm tracking-wider font-extralight bg-orange-400 uppercase rounded-[2rem] -gap-y-3 px-[1rem] md:px-[1.75rem] py-[0.75rem] md:py-[1.25rem]"
        >
          View More
        </button>
      </div>
      <div className="">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full py-[1.75rem]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="w-full h-fit">
            {NewsUpdate.map((news, index) => (
              <CarouselItem key={news.alt} className="w-full h-fit basis-[83%]">
                <div className="py-[4rem]">
                  <Card className="w-full h-fit flex justify-center items-center">
                    <CardContent className="w-full h-fit flex aspect-square items-center justify-center p-2 py-1">
                      <div className="w-full h-fit mb-[1.5rem] flex flex-col justify-center items-center rounded-md gap-y-1.5">
                        <Image
                          className="rounded-lg px-[0.5rem]"
                          src={news.src}
                          alt={news.alt}
                          width={news.width}
                          height={news.height}
                        />
                        <div className="w-fit px-[1.5rem]">
                          <p className="text-teal-950 text-[1.1rem] font-semibold tracking-wide text-start">
                            {news.text}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
        <CarouselNext /> */}
        </Carousel>
      </div>
    </div>
  );
};

export default NewsAndUpdate;
