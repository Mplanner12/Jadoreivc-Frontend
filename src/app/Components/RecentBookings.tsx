/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

const RecentBookings = () => {
  const Bookings = [
    {
      title:
        "Information about the tour - (Jasmine booked a city tour with Joshua in Ivory Coast)",
      quote: "“Quote review from Jasmine”",
      rating: "4.8",
      noofratings: "(243)",
      image: "/bookings.png",
      price: "price",
    },
    {
      title:
        "Information about the tour - (Jasmine booked a city tour with Joshua in Ivory Coast)",
      quote: "“Quote review from Jasmine”",
      rating: "4.8",
      noofratings: "(243)",
      image: "/bookings.png",
      price: "price",
    },
    {
      title:
        "Information about the tour - (Jasmine booked a city tour with Joshua in Ivory Coast)",
      quote: "“Quote review from Jasmine”",
      rating: "4.8",
      noofratings: "(243)",
      image: "/bookings.png",
      price: "price",
    },
    {
      title:
        "Information about the tour - (Jasmine booked a city tour with Joshua in Ivory Coast)",
      quote: "“Quote review from Jasmine”",
      rating: "4.8",
      noofratings: "(243)",
      image: "/bookings.png",
      price: "price",
    },
    {
      title:
        "Information about the tour - (Jasmine booked a city tour with Joshua in Ivory Coast)",
      quote: "“Quote review from Jasmine”",
      rating: "4.8",
      noofratings: "(243)",
      image: "/bookings.png",
      price: "price",
    },
    {
      title:
        "Information about the tour - (Jasmine booked a city tour with Joshua in Ivory Coast)",
      quote: "“Quote review from Jasmine”",
      rating: "4.8",
      noofratings: "(243)",
      image: "/bookings.png",
      price: "price",
    },
  ];
  return (
    <div className="mb-[4rem] p-[2rem] md:px-[3.5rem] pt-[1rem] md:pt-[2rem] pb-[1rem] w-full flex flex-col justify-center">
      <div className="w-full flex justify-between items-center">
        <div className="py-[1.25rem]">
          <h1
            id="mini-header"
            className="font-semibold text-[1.5rem] md:text-[1.75rem] tracking-wide md:text-lg text-teal-950"
          >
            Recent Bookings
          </h1>
        </div>
        <button
          id="viewMore"
          className="md:relative h-fit text-white text-[1rem] md:text-sm tracking-wider font-extralight bg-orange-400 uppercase rounded-[2rem] gap-y-1 px-[1rem] md:px-[1.75rem] py-[0.9rem] md:py-[1rem]"
        >
          View More
        </button>
      </div>
      <div className="block">
        <div className="md:gap-x-4 w-full flex flex-col justify-center md:grid md:grid-cols-3 items-center">
          {Bookings.map((booking, index) => (
            <div
              key={index}
              className="mt-[1.75rem] md:mb-[2.75rem] flex flex-col justify-center"
            >
              {/* <div className="absolute -mt-[23.5rem] md:-mt-[23.25rem] ml-[1.25rem] z-20 w-fit p-[0.65rem] px-[1.15rem] bg-white rounded-full text-emerald-600">
                {booking.price}
              </div> */}
              <div className="md:w-full mb-[1.5rem]">
                <div className="">
                  <img
                    className="w-full rounded-xl"
                    src={booking.image}
                    alt="image"
                  />
                </div>
                <div className="w-full pb-[0.5rem] relative top-[1rem] md:left-[1rem] text-green-600 tracking-wide md:tracking-tighter md:flex justify-center items-start">
                  <p className="w-full text-[1.25rem] font-[500]">
                    {booking.title}
                  </p>
                </div>
              </div>
              <div className="text-teal-950 md:gap-x-[12rem] md:w-full flex justify-between md:left-[1rem] relative md:top-[0.5rem] items-center">
                <div className="w-full flex flex-col md:flex-row justify-between md:items-center md:-mt-[1rem]">
                  <div className="flex justify-start items-center text-[0.85rem] mb-[0.75rem] font-[500] md:pt-[0.75rem]">
                    {booking.quote}
                  </div>
                  <div className="flex justify-start items-center gap-x-[1.25rem]">
                    <div className="flex justify-center w-fit gap-x-[0.095rem]">
                      <FaStar color="green" size={12} />
                      <FaStar color="green" size={12} />
                      <FaStar color="green" size={12} />
                      <FaStar color="green" size={12} />
                      <CiStar size={13} />
                    </div>
                    <div className="relative flex justify-between md:gap-x-[0.25rem] items-center md:-left-[0.25rem]">
                      <p className="text-[0.75rem] font-semibold">
                        {booking.rating}
                      </p>
                      <p className="text-[0.75rem] font-semibold">
                        {booking.noofratings}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentBookings;
