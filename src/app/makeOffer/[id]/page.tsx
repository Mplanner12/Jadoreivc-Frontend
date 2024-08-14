"use client";

/* eslint-disable @next/next/no-img-element */
import React, { Suspense, useState, useEffect } from "react";
import { MdOutlineMail } from "react-icons/md";
import LoadingScreen from "../../Components/Loader";
import { usePathname } from "next/navigation";
import axiosInstance from "@/src/lib/utils";
import { FaRegUserCircle } from "react-icons/fa";

const Page = ({ params }: { params: { id: string } }) => {
  // const pathname = usePathname();
  // const tourId = pathname.split("/").pop();
  const tourId = params.id;
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/plans/tourPlanById/${tourId}`
        );
        setTour(response.data.tourPlan);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (tourId) {
      fetchTour();
    }
  }, [tourId]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="m-0 p-0 flex flex-col justify-center items-center">
        <p>Error fetching tour: {error.message}</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="m-0 p-0 flex flex-col justify-center items-center">
        <p>Tour not found.</p>
      </div>
    );
  }

  const {
    location,
    startDate,
    endDate,
    time,
    numberOfPeople,
    guidePreference,
    image,
  } = tour;

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  const formattedStartDate = startDateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedEndDate = endDateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Calculating the difference in days
  const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="m-0 p-0 flex flex-col justify-center items-center">
      {/* <Header /> */}
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="w-full flex py-[2.85rem] pb-[0rem] justify-center items-center px-[1rem]">
          <h1 className="text-[2.1rem] font-semibold text-teal-900">
            Make an Offer to this Tour
          </h1>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-start md:justify-center items-center md:-mt-[1.5rem] py-[4rem] px-[1.75rem]">
          {" "}
          <div className="p-0 m-0 w-fit h-full flex justify-between gap-x-[1rem] md:gap-x-[2.5rem] items-start py-[1rem] md:py-[0.7rem] pl-[0.7rem] md:pr-[0.5rem] bg-slate-50 shadow-md rounded-xl">
            <div className="w-fit md:relative md:top-[1.35rem] flex justify-center items-center">
              {image ? (
                <img src={image} alt="" width={65} className="md:w-[4rem]" />
              ) : (
                <div className="w-fit h-fit md:mt-[-1rem] flex justify-center items-center">
                  <FaRegUserCircle size={45} className="text-teal-900" />
                </div>
              )}
            </div>
            <div className="w-full flex flex-col justify-start items-center ">
              <div className="relative w-full gap-x-[1.3rem] md:gap-x-[0.2rem] flex justify-start items-center py-[0.85rem] pr-[2.5rem] md:pr-[3rem]">
                <div className="w-full flex justify-start items-center gap-[0.85rem] md:gap-x-[0.27rem]">
                  <div className="w-full flex justify-center items-center">
                    <p className="relative w-full text-start font-semibold text-[1.5rem] md:text-[1.4rem] text-teal-900">
                      {location}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-[-1rem] px-[0.25rem] md:pl-[0rem] w-full flex flex-col justify-start items-center gap-x-[2rem] py-[1rem] md:pt-0">
                <div className="w-full flex justify-start items-center gap-x-[0.75rem] py-[0.5rem] text-[1rem] md:text-[0.9rem] text-gray-400">
                  <div className="w-[3rem] md:w-[3rem]">{diffDays} days </div>
                  <div className="w-[6rem] md:w-[7rem]">
                    {formattedStartDate} - {formattedEndDate}
                  </div>
                  <div className="flex justify-end items-center">
                    {numberOfPeople.length < 2 ? "just me" : numberOfPeople}{" "}
                    <p className="text-center">persons</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-start gap-[0.75rem] md:gap-x-[0.5rem] items-center px-[0rem] md:pl-[0rem] md:px-[1.25rem] text-[0.85rem] font-semibold mt-[-0.5rem]">
                <div className="flex justify-center items-center gap-x-[0.5rem]">
                  {guidePreference.length > 0 ? (
                    guidePreference.map((local: any) => (
                      <button
                        key={local}
                        className="p-[0.65rem] md:p-[0.5rem] py-[0.5rem] rounded-full text-[0.8rem] bg-slate-50 hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white border focus:bg-emerald-600 focus:text-white border-emerald-600 text-emerald-600"
                      >
                        {local}
                      </button>
                    ))
                  ) : (
                    <button
                      key={guidePreference}
                      className="p-[0.65rem] md:p-[0.5rem] py-[0.5rem] rounded-full text-[0.8rem] bg-slate-50 hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white border focus:bg-emerald-600 focus:text-white border-emerald-600 text-emerald-600"
                    >
                      {guidePreference}
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full mx-auto flex justify-start py-[1rem] items-center gap-x-[2rem]">
                <p className="w-full text-[0.85rem] justify-start md:pl-[0rem] flex text-center text-gray-400">
                  Posted {time}
                </p>
              </div>
            </div>
            {/* <div className="relative left-[-3rem] mt-[0.5rem] md:left-[-1rem]">
                        {loading ? (
                          <HashLoader
                            cssOverride={override}
                            color="green" // Set your desired loader color
                            loading={loading}
                            size={25} // Adjust size as needed
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : currentTours &&
                          user &&
                          user.userType === "TOUR_GUIDE" ? (
                          <div className="flex justify-normal items-center">
                            <Link href={`mailto:${tour.tourist?.email}`}>
                              {" "}
                              Link to contact page with tour ID
                              <MdOutlineMail
                                size={28}
                                className="text-teal-900"
                              />
                            </Link>
                          </div>
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </div> */}
          </div>
          <div className="w-full md:w-[45%] flex flex-col justify-center items-center px-[1.75rem] mt-[3.5rem]">
            <div className="w-full md:w-[80%] flex flex-col justify-start items-center">
              <label
                className="w-full text-start py-[0.5rem] text-[1rem] text-slate-500"
                htmlFor="offer"
              >
                Hourly Rate
              </label>
              <input
                type="number"
                name="offer"
                id=""
                className="w-full p-[0.65rem] md:p-[0.8rem] shadow-sm rounded-lg border-2 hover:border-emerald-600 active:border-emerald-600 outline-emerald-600 text-[1.25rem]"
                placeholder="$100"
              />
            </div>
            <div className="w-full md:w-[80%] flex justify-center items-center mt-[1.4rem] py-[1.25rem] px-[0.2rem] mb-[4rem]">
              {" "}
              <input
                type="submit"
                value="MAKE OFFER"
                className="w-full h-full p-[0.85rem] font-[500] text-[1.5rem] text-center bg-orange-400 rounded-full text-slate-100"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
