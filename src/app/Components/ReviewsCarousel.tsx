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
  reviewerName: string;
  rating: number;
  text: string;
  alt: string;
  img: string;
  width: number;
  height: number;
  location: string;
}

const Reviews = [
  {
    reviewerName: "John carkl",
    location: "New York, USA",
    rating: 4,
    text: "Our tour guide was incredibly knowledgeable and passionate about the city's history. We learned so much!",
    alt: "Image",
    img: "/rvw1.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "David Lee",
    location: "Paris, France",
    rating: 4.5,
    text: "The tour was well-paced and covered all the major sights. Our guide's stories brought the city to life.",
    alt: "Image",
    img: "/rvw2.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "Emily Chen",
    location: "Tokyo, Japan",
    rating: 5,
    text: "Excellent tour! Our guide was very accommodating and provided great recommendations for local restaurants.",
    alt: "Image",
    img: "/rvw4.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "Michael Garcia",
    location: "Madrid, Spain",
    rating: 4,
    text: "We had a fantastic time on this tour. Our guide was a great storyteller and kept us entertained throughout.",
    alt: "Image",
    img: "/rvw3.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "Sophia Kim",
    location: "Seoul, South Korea",
    rating: 4.5,
    text: "The tour was informative and engaging. Our guide's enthusiasm was contagious, making it a memorable experience.",
    alt: "Image",
    img: "/rvw5.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "Oliver Rodriguez",
    location: "Mexico City, Mexico",
    rating: 5,
    text: "Highly recommend this tour for anyone visiting the city. Our guide provided valuable insights and tips.",
    alt: "Image",
    img: "/rvw8.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "Isabella Singh",
    location: "New Delhi, India",
    rating: 4,
    text: "Our guide was fantastic! They were very knowledgeable, friendly, and made the tour a lot of fun.",
    alt: "Image",
    img: "/rvw6.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "William Wang",
    location: "Beijing, China",
    rating: 4.5,
    text: "The tour was well-organized and informative. Our guide's passion for the city was evident.",
    alt: "Image",
    img: "/rvw7.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "Ava Patel",
    location: "Mumbai, India",
    rating: 5,
    text: "We had a wonderful time on this tour. Our guide was very knowledgeable and answered all our questions.",
    alt: "Image",
    img: "/rvw10.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "Ethan Nguyen",
    location: "Ho Chi Minh City, Vietnam",
    rating: 4,
    text: "This tour exceeded our expectations. Our guide was exceptional - knowledgeable, engaging, and funny!",
    alt: "Image",
    img: "/rvw9.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "Ridwan Qassam",
    location: "Buenos Aires, Argentina",
    rating: 4.5,
    text: "Highly recommend this tour! Our guide was a local and shared fascinating stories about the city.",
    alt: "Image",
    img: "/rvw11.jpeg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "Noah Santos",
    location: "Rio de Janeiro, Brazil",
    rating: 5,
    text: "The tour was a great way to see the city's highlights. Our guide was very informative and helpful.",
    alt: "Image",
    img: "/rvw15.jpeg",
    width: 100,
    height: 100,
  },
  // {
  //   reviewerName: "Gibreil Ahmad",
  //   location: "Berlin, Germany",
  //   rating: 4,
  //   text: "We had a fantastic experience on this tour. Our guide was passionate, knowledgeable, and made it fun.",
  //   alt: "Image",
  //   img: "/rvw11.jpeg",
  //   width: 100,
  //   height: 100,
  // },
  {
    reviewerName: "Juliat Johnson",
    location: "Rome, Italy",
    rating: 4.5,
    text: "Highly recommend this tour! Our guide was excellent and provided a wealth of information.",
    alt: "Image",
    img: "/rvw14.jpg",
    width: 100,
    height: 100,
  },
  {
    reviewerName: "Mubarak Ahmed",
    location: "Paris, France",
    rating: 5,
    text: "The tour was well-paced and covered a lot of ground. Our guide's commentary was insightful and engaging.",
    alt: "Image",
    img: "/rvw12.jpeg",
    width: 100,
    height: 100,
  },
];

const randomReviews = Reviews.sort(() => 0.5 - Math.random()).slice(0, 3);

// Assign the random reviews to the user
let reviewList = randomReviews;
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
            {reviewList.slice(0, 3).map((review, index) => (
              <CarouselItem
                // key={review.alt}
                key={index}
                className="w-fit md:w-full h-fit basis-[98%] md:basis-[27.5%] xl:basis-[27.5%] 2xl:basis-[24%]"
              >
                <Card className="w-full px-[0rem] flex flex-col justify-center items-center p-[1rem] rounded-2xl border-emerald-600 border-[1px] shadow-sm">
                  <CardContent className="w-full h-[12rem] md:h-[19.75rem] lg:h-[14rem] lg:w-fit md:w-full p-0 flex flex-col justify-center items-center">
                    <div className="w-fit p-0">
                      <div className="w-full md:w-fit px-[0rem] h-fit flex justify-start items-center gap-x-[0.5rem] md:gap-x-[0.5rem]">
                        <Image
                          className="rounded-full px-[0.5rem]"
                          src={review.img}
                          alt={review.alt}
                          width={review.width}
                          height={review.height}
                        />
                        <div className="md:w-[80%] w-full relative left-[-0.75rem] flex flex-col justify-center items-center text-slate-900">
                          <div>
                            <p className="text-[1.1rem] font-semibold w-full text-start">
                              {review.reviewerName}
                            </p>
                          </div>
                          <div>
                            <p className="text-[0.85rem] font-[500] w-full text-start">
                              {review.location}
                            </p>
                          </div>
                        </div>
                        <div className="w-fit flex h-full justify-end ml-[0.95rem] md:ml-[0.5rem] items-center gap-x-[0.15rem]">
                          <div>
                            <p className="text-[1rem]">{review.rating}</p>
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
