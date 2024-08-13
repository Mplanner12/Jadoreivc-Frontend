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

import { CarouselNext, CarouselPrevious } from "../../components/ui/carousel";
import reviewImage from "../../../public/reviewImg.png";
import { FaStar } from "react-icons/fa";

interface Review {
  // Define the structure of your review data here
  // Example:
  author: string;
  rating: number;
  comment: string;
}

const Reviews = [
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    src: reviewImage,
    alt: "Image",
    width: 100,
    height: 100,
  },
];
const ReviewsCarousel: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const plugin = React.useRef<AutoplayType>(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="w-full mb-[3rem] md:mb-[4.5rem] md:mt-[1.85rem]">
      <h1 className="w-full text-start text-[1.85rem] py-[1rem] md:py-[1.85rem] pb-[0.85rem] md:pb-0 font-semibold text-slate-900">
        Review
      </h1>
      <div className="w-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full py-[1.75rem]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="w-full h-full md:pb-[2rem] pt-[0.85rem] px-0 md:pr-[2rem] gap-x-[0.7rem]">
            {Reviews.map((review, index) => (
              <CarouselItem
                // key={review.alt}
                key={index}
                className="w-fit md:w-full h-fit basis-[98%] md:basis-[27.5%] xl:basis-[27.5%] 2xl:basis-[24%]"
              >
                <Card className="w-full px-[0rem] flex flex-col justify-center items-center p-[1rem] rounded-2xl border-emerald-600 border-[1px] shadow-sm">
                  <CardContent className="w-full md:w-fit p-0 flex flex-col justify-center items-center">
                    <div className="w-fit p-0">
                      <div className="w-full md:w-fit px-[0rem] h-fit flex justify-start items-center gap-x-[0.5rem] md:gap-x-[0.5rem]">
                        <Image
                          className="rounded-full px-[0.5rem]"
                          src={review.src}
                          alt={review.alt}
                          width={review.width}
                          height={review.height}
                        />
                        <div className="md:w-[80%] w-full relative left-[-0.75rem] flex flex-col justify-center items-center text-slate-900">
                          <div>
                            <p className="text-[1.1rem] font-semibold">
                              Viezh Robert
                            </p>
                          </div>
                          <div>
                            <p className="text-[0.85rem] font-[500]">
                              Warsaw, Poland
                            </p>
                          </div>
                        </div>
                        <div className="w-fit flex h-full justify-end ml-[0.95rem] md:ml-[0.5rem] items-center gap-x-[1rem]">
                          <div>
                            <p className="text-[1rem]">4.5</p>
                          </div>
                          <div className="flex justify-center items-start">
                            <FaStar size={20} color="orange" fill="orange" />
                          </div>
                        </div>
                      </div>
                      <div className="w-full px-[0.5rem] mt-[1.25rem]">
                        <p className="w-full text-slate-900 text-[1rem] md:text-[0.9rem] font-[550] leading-[2rem]  md:tracking-tight text-start">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex absolute bottom-4 right-4 gap-x-[2rem]">
            <CarouselPrevious className="w-fit p-[1.5rem] px-[1rem] ml-[-1rem] text-orange-500 font-extrabold rounded-full  bg-white hover:bg-orange-600 hover:text-white focus:bg-orange-600 focus:text-white active:bg-orange-600 active:text-white" />
            <CarouselNext className="w-fit p-[1.5rem] px-[1rem] text-orange-500 font-extrabold rounded-full bg-white hover:bg-orange-600 hover:text-white focus:bg-orange-600 focus:text-white active:bg-orange-600 active:text-white" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ReviewsCarousel;
