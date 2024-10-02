/* eslint-disable @next/next/no-img-element */
"use client";
import React, { Suspense, useContext, CSSProperties } from "react";
import { UserContext } from "../../context/UserContex";
import LoadingScreen from "../../Components/Loader";
import HashLoader from "react-spinners/HashLoader";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/ui/carousel";
import Image from "next/image";

import {
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { FaPencilAlt, FaStar } from "react-icons/fa";
import { PiPencilSimpleLineDuotone } from "react-icons/pi";
import Link from "next/link";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

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
    img: "/rvw12.jpeg",
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
  {
    reviewerName: "Gibreil Ahmad",
    location: "Berlin, Germany",
    rating: 4,
    text: "We had a fantastic experience on this tour. Our guide was passionate, knowledgeable, and made it fun.",
    alt: "Image",
    img: "/rvw11.jpeg",
    width: 100,
    height: 100,
  },
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
  // {
  //   reviewerName: "Mubarak Ahmed",
  //   location: "Paris, France",
  //   rating: 5,
  //   text: "The tour was well-paced and covered a lot of ground. Our guide's commentary was insightful and engaging.",
  //   alt: "Image",
  //   img: "/rvw12.jpeg",
  //   width: 100,
  //   height: 100,
  // },
];

const randomReviews = Reviews.sort(() => 0.5 - Math.random()).slice(0, 3);

// Assign the random reviews to the user
let reviews = randomReviews;

const Page = ({ params }: { params: { id: string } }) => {
  const { user, loading } = useContext(UserContext);
  const plugin = React.useRef<AutoplayType>(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="h-full w-full">
          <img
            className="h-[20rem] md:h-[25rem] w-full"
            alt=""
            src="/tourGuides.png"
            width={100}
            height={100}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start md:mt-[3rem] md:mb-[5rem]">
          {loading ? (
            <div className="md:w-full w-full mt-[1rem] md:px-[5rem] mb-[2rem] px-[1.5rem] flex flex-col justify-center h-full">
              <div className="mb-[0.85rem] w-full h-full">
                <HashLoader
                  cssOverride={override}
                  color="green"
                  loading={loading}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            </div>
          ) : user ? (
            <div className="w-full mt-[-8rem] lg:mt-[-10.5rem] z-10 px-[1rem] md:px-[6.5rem] mb-[0.5rem] justify-center flex lg:justify-between h-full">
              <div className="w-full h-full flex flex-col justify-start items-start gap-y-[1rem]">
                <div className="mb-[0.5rem] md:mb-[1.25rem] p-1 border border-neutral-300 shadow-xl bg-white rounded-full w-[12rem] h-[14.5rem] flex justify-center items-center">
                  <img
                    className="rounded-full h-full w-full"
                    src={
                      `/uploads/userImages/${user?.image}` ||
                      "/placeholder-image.png"
                    }
                    alt="image"
                  />
                </div>
                <div className="w-full h-fit flex flex-col justify-center items-start pb-[0.5rem] gap-y-[0.25rem] text-teal-950 tracking-wide">
                  <div className="text-[2.5rem] font-semibold flex justify-start items-center gap-x-[2.25rem]">
                    <h1>{user?.fullName || "Guest"} </h1>
                    <button className="p-2 focus:outline-none flex justify-center items-center rounded-full">
                      <Link
                        className="relative left-[-1rem] p-2"
                        href={`/updateProfile/${user.id}`}
                      >
                        &#9998;
                        {/* Edit Profile */}
                      </Link>
                    </button>
                  </div>
                  <p className="text-lg font-normal">
                    {user?.tourGuide?.aboutMe || ""}
                  </p>
                </div>
                <div className="w-full h-full m-0 p-0 flex flex-col md:flex-row justify-between items-start gap-x-[1.35rem]">
                  <div className="w-full h-full md:w-[67%] m-0 p-0 flex flex-col justify-start items-start">
                    <div className="w-full h-full flex flex-col md:flex-row justify-start items-center gap-x-[1rem] gap-y-[2.25rem] mb-[1.85rem]">
                      <div className="w-full h-full flex object-cover justify-start items-center gap-x-[1rem]">
                        <div className="w-full h-full flex justify-start items-center object-cover">
                          <img
                            className="rounded-2xl w-full h-full"
                            src="/profile1.png"
                            alt=""
                          />
                        </div>
                        <div className="w-full h-full flex justify-start items-center object-cover">
                          <img
                            className="rounded-2xl w-full h-full"
                            src="/profile2.png"
                            alt=""
                          />
                        </div>
                        <div className="w-full h-full hidden md:flex justify-start items-center object-cover">
                          <img
                            className="rounded-2xl w-full h-full"
                            src="/profile3.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="w-full h-[14rem] flex md:hidden justify-start object-cover items-center">
                        <img
                          className="rounded-2xl w-full h-full"
                          src="/profile3.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-y-[0.5rem] py-[0.3rem]">
                      <div className="w-full flex flex-col gap-y-[0.5rem] h-fit py-0.5 text-[0.7rem] font-semibold justify-start items-center gap-x-[0.25rem]">
                        <h1 className="text-black font-semibold text-lg w-full text-start">
                          Languages
                        </h1>
                        <div className="w-full flex h-fit py-0.5 text-[0.7rem] font-semibold justify-start items-center gap-x-[1.15rem]">
                          {user?.languages.map((language: any, index: any) => {
                            return (
                              <div
                                key={index}
                                className="w-full text-[1rem] text-black rounded-full shadow-sm py-2 px-4 border-[0.5px] border-neutral-300 flex justify-center items-center text-center"
                              >
                                {language}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-fit flex flex-col justify-start text-[0.75rem] font-[500] text-slate-900">
                      <div className="w-full h-full flex flex-col justify-start items-start gap-y-[0.25rem] my-[2rem]">
                        <h1 className="text-black font-semibold text-lg">
                          About me
                        </h1>
                        <p className="text-black w-full text-base font-normal text-start lg:w-[85%]">
                          {user.tourGuide !== null
                            ? user.tourGuide.summary
                            : ""}
                        </p>
                      </div>
                      <div className="w-full h-full flex flex-col justify-start items-start gap-y-[0.25rem]">
                        <h1 className="text-teal-950 font-semibold text-lg">
                          Contact
                        </h1>
                        <p className="text-black text-base font-normal text-start">
                          {user.email !== null ? user.email : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-[30%] w-full text-teal-950 md:gap-x-[4rem] mt-[2rem] lg:mt-[-2.75rem] flex flex-col justify-start md:justify-center items-center gap-y-[1rem] pt-[0.5rem] md:pt-[0.5rem]">
                    <h1 className="w-full text-slate-900 text-2xl md:text-xl font-bold mb-[-2.2rem] md:mb-0">
                      3 Reviews
                      {/* {user?.tourGuide?.reviews} */}
                    </h1>
                    <div className="w-full hidden h-full md:flex flex-col justify-start items-center gap-y-[1.35rem]">
                      {reviews.map((review, index) => {
                        return (
                          <div
                            key={index}
                            className="w-full p-[1rem] flex flex-col justify-center items-center rounded-2xl border-emerald-600 border-[1px] shadow-sm"
                          >
                            <div className="w-full md:w-fit p-0 flex flex-col justify-center items-center"></div>
                            <div className="w-fit p-0">
                              <div className="w-full md:w-fit px-[0rem] h-fit flex justify-start items-center gap-x-[0.5rem] md:gap-x-[0.5rem]">
                                <img
                                  className="rounded-full px-[0.5rem]"
                                  src={review.img}
                                  alt={review.alt}
                                  width={review.width}
                                  height={review.height}
                                />
                                <div className="md:w-[80%] w-full relative left-[-0.75rem] flex flex-col justify-center items-center text-slate-900">
                                  <div>
                                    <p className="text-[1.1rem] font-semibold">
                                      {review.reviewerName}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[0.85rem] font-[500]">
                                      {review.location}
                                    </p>
                                  </div>
                                </div>
                                <div className="w-fit flex h-full justify-end ml-[0.95rem] md:ml-[0.5rem] items-center gap-x-[0.25rem]">
                                  <div>
                                    <p className="text-[1rem]">
                                      {review.rating}
                                    </p>
                                  </div>
                                  <div className="flex justify-center items-start">
                                    <FaStar
                                      size={20}
                                      color="orange"
                                      fill="orange"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="w-full px-[0.5rem] mt-[1.25rem]">
                                <p className="w-full text-slate-900 text-[1rem] md:text-[0.9rem] font-[550] leading-[2rem]  md:tracking-tight text-start">
                                  {review.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-full md:hidden">
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
                              className="w-full h-full basis-[97%]"
                            >
                              <Card className="w-full px-[0rem] flex flex-col justify-center items-center p-[1rem] rounded-2xl border-emerald-600 border-[1px] shadow-sm">
                                <CardContent className="w-full md:w-fit p-0 flex flex-col justify-center items-center">
                                  <div className="w-full p-0">
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
                                          <p className="text-[1.1rem] font-semibold">
                                            {review.reviewerName}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-[0.85rem] font-[500]">
                                            {review.location}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="w-fit flex h-full justify-end ml-[0.95rem] md:ml-[0.5rem] items-center gap-x-[0.25rem]">
                                        <div>
                                          <p className="text-[1rem]">
                                            {review.rating}
                                          </p>
                                        </div>
                                        <div className="flex justify-center items-start">
                                          <FaStar
                                            size={20}
                                            color="orange"
                                            fill="orange"
                                          />
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
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen w-full">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-semibold text-red-500 mb-4">
                  Profile Not Found
                </h1>
                <p className="text-lg text-gray-600">
                  Please check your internet connection and try again.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
