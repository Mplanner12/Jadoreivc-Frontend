/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

const RecentBookings = () => {
  const Bookings = [
    {
      title:
        "Information about the tour - (Bamba enjoyed a wildlife tour with Moussa in Côte d'Ivoire)",
      quote: "“A breathtaking adventure through the wild!”",
      rating: "4.7",
      noofratings: "(310)",
      image: "/tour7.jpeg",
      price: "price",
      height: "300px",
    },
    {
      title:
        "Information about the tour - (Aminata had a historic tour with Fanta in Côte d'Ivoire)",
      quote: "“Learned so much about the rich history!”",
      rating: "4.6",
      noofratings: "(270)",
      image: "/tour8.jpeg",
      price: "price",
    },
    {
      title:
        "Information about the tour - (Kouassi explored the city with Awa in Côte d'Ivoire)",
      quote: "“The city tour was vibrant and insightful.”",
      rating: "4.8",
      noofratings: "(220)",
      image: "/tour6.jpeg",
      price: "price",
    },
    {
      title:
        "Information about the tour - (Fatou took a beach tour with Fatoumata in Côte d'Ivoire)",
      quote: "“Relaxing and refreshing beach experience!”",
      rating: "4.9",
      noofratings: "(290)",
      image: "/tour3.jpg",
      price: "price",
    },
    {
      title:
        "Information about the tour - (Marie booked a cultural tour with Koffi in Côte d'Ivoire)",
      quote: "“Amazing experience, highly recommended!”",
      rating: "4.9",
      noofratings: "(185)",
      image: "tour2.jpg",
      price: "price",
    },
    {
      title:
        "Information about the tour - (Adama joined a night tour with Oulimata in Côte d'Ivoire)",
      quote: "“The nightlife is truly electrifying!”",
      rating: "4.7",
      noofratings: "(199)",
      image: "/tour4.jpeg",
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
              <div className="md:w-full mb-[1.5rem]">
                <div className="">
                  <img
                    className="w-full rounded-xl"
                    style={{ height: "300px", objectFit: "cover" }} // Set height and object-fit
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
                  <div className="flex justify-start items-center text-[0.85rem] md:w-[15rem] mb-[0.75rem] font-[500] md:pt-[0.75rem]">
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
