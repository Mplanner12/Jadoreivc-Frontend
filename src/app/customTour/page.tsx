/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, CSSProperties, useContext } from "react";
import Filter from "../Components/Filter";
import { IoFilterOutline } from "react-icons/io5";
import PaginationButtons from "../Components/Pagination";
import Link from "next/link";
import { usePlannedTours } from "../context/tourPlanContext";
import FadeLoader from "react-spinners/FadeLoader";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { UserContext } from "../context/UserContex";
import { FaRegUserCircle } from "react-icons/fa";
import { Suspense } from "react";
import LoadingScreen from "../Components/Loader";

interface plannedTour {
  id: string;
  image: string;
  location: string;
  noOfDays: string;
  startDate: string;
  endDate: string;
  numberOfPeople: string;
  time: string;
  guidePreference: string;
  localGuide: string[];
  createdAt: Date;
  updatedAt: Date;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const pageSize = 3;

const Page = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [selectedLocals, setSelectedLocals] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [plannedToursData, setPlannedToursData] = useState<plannedTour[]>([]);

  const { user, loading } = useContext(UserContext);

  const { fetchTourPlans, tourPlans, plansLoading } = usePlannedTours();

  const handleDaysSelect = (selectedDays: number | null) => {
    setSelectedDays(selectedDays);
  };

  const handleLocalsSelect = (selectedLocals: string[]) => {
    setSelectedLocals(selectedLocals);
  };

  const handleLocationSelect = (selectedLocation: string | null) => {
    setSelectedLocation(selectedLocation);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(plannedToursData?.length / pageSize);

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Get the guides for the current page
  const currentTours = plannedToursData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const applyFilters = (tours: plannedTour[]) => {
    return tours.filter((tour) => {
      const startDate = new Date(tour.startDate);
      const endDate = new Date(tour.endDate);

      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Filter by days
      if (selectedDays !== null) {
        if (selectedDays !== diffDays) {
          return false;
        }
      }
      // Filter by location (case-insensitive)
      if (selectedLocation) {
        const locationMatch = tour.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase());
        if (!locationMatch) {
          return false;
        }
      }
      // If all filters pass, include the tour
      return true;
    });
  };

  useEffect(() => {
    fetchTourPlans();
  }, []);

  useEffect(() => {
    if (tourPlans && tourPlans.length > 0) {
      const filteredTours = applyFilters(tourPlans);
      setPlannedToursData(filteredTours);
    }
  }, [tourPlans, selectedDays, selectedLocals, selectedLocation]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="w-full m-0 p-0 flex flex-col justify-center items-center">
        <div className="h-full w-full">
          <img
            className="h-[20rem] md:h-[25rem] w-full"
            alt=""
            src="/tourGuides.png"
            width={100}
            height={100}
          />
        </div>
        <div className="w-full flex justify-between md:py-[2rem] items-center mb-1 md:mb-[2rem] mt-[2rem] md:mt-[0] md:pl-[6rem] px-[2.5rem]">
          <h1 className="w-full text-[1.75rem] md:text-[2.25rem] text-teal-950 md:text-start font-semibold">
            Find Custom Tours
          </h1>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="p-2 md:hidden"
          >
            <IoFilterOutline size={30} />
          </button>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start md:px-[4rem]">
          <div className="w-full p-2 md:w-[38.5%] px-[1.5rem] md:px-[0.5rem] md:pr-[5rem] lg:w-[47%] pt-[2rem]">
            <div className="hidden md:block md:w-[100%] lg:w-[100%]">
              <Filter
                daysOptions={[1, 2, 3, 4, 5, 6, 7]} // Pass your custom options here
                localsOptions={[]}
                onDaysSelect={handleDaysSelect}
                onLocalsSelect={handleLocalsSelect}
                onLocationSelect={handleLocationSelect}
                selectedDays={selectedDays}
                selectedLocals={selectedLocals}
                selectedLocation={selectedLocation}
              />
            </div>
            {showFilter && (
              <div className="md:hidden w-full h-full flex justify-center items-center">
                <Filter
                  daysOptions={[1, 2, 3, 4, 5, 6, 7]} // Pass your custom options here
                  localsOptions={[]}
                  onDaysSelect={handleDaysSelect}
                  onLocalsSelect={handleLocalsSelect}
                  onLocationSelect={handleLocationSelect}
                  selectedDays={selectedDays}
                  selectedLocals={selectedLocals}
                  selectedLocation={selectedLocation}
                />
              </div>
            )}
          </div>
          {plansLoading ? (
            <div className="w-full mt-[6.5rem] h-full flex justify-center items-center">
              <FadeLoader
                cssOverride={override}
                color="green" // Set your desired loader color
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : currentTours.length > 0 ? (
            <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-y-[1.5rem] md:gap-x-[1.75rem] py-[2rem] px-[1.85rem] md:px-[0.5rem] md:pr-[2rem] justify-center md:justify-start items-center">
              {currentTours.map((tour: any) => {
                const startDate = new Date(tour.startDate);
                const endDate = new Date(tour.endDate);

                const formattedStartDate = startDate.toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                );
                const formattedEndDate = endDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });

                const diffTime = Math.abs(
                  endDate.getTime() - startDate.getTime()
                );
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                  <Suspense fallback={<LoadingScreen />} key={tour.id}>
                    {loading ? (
                      <div className="w-full mt-[6.5rem] h-full flex justify-center items-center">
                        <FadeLoader
                          cssOverride={override}
                          color="green"
                          loading={loading}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </div>
                    ) : (
                      <Link
                        className="p-0 m-0 w-fit h-full flex justify-between gap-x-[1rem] md:gap-x-[2.5rem] items-start py-[1rem] md:py-[0.7rem] pl-[0.7rem] md:pr-[0.5rem] bg-slate-50 shadow-md rounded-xl"
                        href={
                          user.userType === "TOUR_GUIDE"
                            ? `/makeOffer/${tour.id}`
                            : "#"
                        }
                      >
                        <div className="w-fit md:relative md:top-[1.35rem] flex justify-center items-center">
                          {tour.image ? (
                            <img
                              src={tour.image}
                              alt=""
                              width={65}
                              className="md:w-[4rem]"
                            />
                          ) : (
                            <div className="w-fit h-fit md:mt-[-1rem] flex justify-center items-center">
                              <FaRegUserCircle
                                size={45}
                                className="text-teal-900"
                              />
                            </div>
                          )}
                        </div>
                        <div className="w-full flex flex-col justify-start items-center ">
                          <div className="relative w-full gap-x-[1.3rem] md:gap-x-[0.2rem] flex justify-start items-center py-[0.85rem] pr-[2.5rem] md:pr-[3rem]">
                            <div className="w-full flex justify-start items-center gap-[0.85rem] md:gap-x-[0.27rem]">
                              <div className="w-full flex justify-center items-center">
                                <p className="relative w-full text-start font-semibold text-[1.5rem] md:text-[1.4rem] text-teal-900">
                                  {tour.location}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-[-1rem] px-[0.25rem] md:pl-[0rem] w-full flex flex-col justify-start items-center gap-x-[2rem] py-[1rem] md:pt-0">
                            <div className="w-full flex justify-start items-center gap-x-[0.75rem] py-[0.5rem] text-[1rem] md:text-[0.9rem] text-gray-400">
                              <div className="w-[3rem] md:w-[3rem]">
                                {diffDays} days
                              </div>
                              <div className="w-[6rem] md:w-[7rem]">
                                {formattedStartDate} - {formattedEndDate}
                              </div>
                              <div className="flex justify-end items-center">
                                {tour.numberOfPeople.length < 2
                                  ? "just me"
                                  : tour.numberOfPeople}{" "}
                                <p className="text-center">persons</p>
                              </div>
                            </div>
                          </div>
                          <div className="w-full flex justify-start gap-[0.75rem] md:gap-x-[0.5rem] items-center px-[0rem] md:pl-[0rem] md:px-[1.25rem] text-[0.85rem] font-semibold mt-[-0.5rem]">
                            <div className="flex justify-center items-center gap-x-[0.5rem]">
                              {tour.guidePreference.length > 0 ? (
                                tour.guidePreference.map((local: any) => (
                                  <button
                                    key={local}
                                    className="p-[0.65rem] md:p-[0.5rem] py-[0.5rem] rounded-full text-[0.8rem] bg-slate-50 hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white border focus:bg-emerald-600 focus:text-white border-emerald-600 text-emerald-600"
                                  >
                                    {local}
                                  </button>
                                ))
                              ) : (
                                <button
                                  key={tour.guidePreference}
                                  className="p-[0.65rem] md:p-[0.5rem] py-[0.5rem] rounded-full text-[0.8rem] bg-slate-50 hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white border focus:bg-emerald-600 focus:text-white border-emerald-600 text-emerald-600"
                                >
                                  {tour.guidePreference}
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="w-full mx-auto flex justify-start py-[1rem] items-center gap-x-[2rem]">
                            <p className="w-full text-[0.85rem] justify-start md:pl-[0rem] flex text-center text-gray-400">
                              Posted {tour.time}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )}
                  </Suspense>
                );
              })}
            </div>
          ) : (
            <div className="w-full mt-[6.5rem] h-full flex justify-center items-center">
              <p>No tours available at the moment.</p>
            </div>
          )}
        </div>
        <div className="w-full py-[4rem] pb-[6rem] flex justify-center items-center">
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
