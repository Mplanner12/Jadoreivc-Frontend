"use client";
import Hero from "./Components/Hero";
import FeaturedGuides from "./Components/FeaturedGuides";
import RecentBookings from "./Components/RecentBookings";
import { LogoCarousel } from "./Components/LogoCarouselSm";
import LogoCarouselMd from "./Components/LogoCarouselMd";
import NewsAndUpdate from "./Components/NewsAndUpdateSm";
import NewsAndUpdateMd from "./Components/NewsAndUpdateMd";
import { ImLocation } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { FaCarSide } from "react-icons/fa6";
import ClientOnly from "./Components/ClientOnly";
import { useState, useContext, useEffect, Suspense } from "react";
import LoadingScreen from "./Components/Loader";
import { TourGuideContext } from "./context/tourGuideContext";
import Dive from "./Components/Dive";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [tourGuideName, setTourGuideName] = useState("");
  const { tourGuides } = useContext(TourGuideContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // Function to filter tour guides based on location and tour guide name
  const filterTourGuides = () => {
    const filteredGuides = tourGuides?.filter((guide: any) => {
      // Check if location matches (case-insensitive)
      const locationMatch =
        location.trim() === "" ||
        guide.location.toLowerCase().includes(location.toLowerCase());

      // Check if tour guide name matches (case-insensitive)
      const nameMatch =
        tourGuideName.trim() === "" ||
        guide.user.fullName.toLowerCase().includes(tourGuideName.toLowerCase());

      return locationMatch && nameMatch;
    });

    return filteredGuides;
  };

  return (
    // <Suspense fallback={<LoadingScreen />}>
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ClientOnly>
          <div className="m-0 p-0 flex flex-col justify-center">
            <Hero />
            <div
              id="search"
              className="border-[1px] px-[0.35rem] md:px-[0.65rem] border-green-600 bg-white z-20 relative -top-[2rem] rounded-full mx-auto shadow-md w-[94%] md:w-[54%] h-full py-[0.15rem] md:py-[0.4rem] flex justify-center gap-x-[0.2rem] md:gap-x-[1.25rem]"
            >
              <div className="flex items-center gap-x-[0.15rem] md:gap-x-2 w-full">
                <div className="rounded-full w-fit md:w-[2rem] flex justify-center items-center">
                  <ImLocation
                    className="p-[0.5rem] border-[1px] rounded-full"
                    size={33}
                  />
                </div>
                <div className="flex flex-col justify-between w-fit py-[0.5rem] relative left-1 md:mt-[-0.3rem]">
                  <p className="text-emerald-600 text-[0.8rem] md:tracking-normal md:text-[0.8rem]">
                    Where
                  </p>
                  <input
                    type="text"
                    placeholder="Search destinations"
                    className="bg-transparent w-full text-[0.6rem] md:text-[0.55rem] font-light text-start flex items-center outline-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} // Update location state
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-[0.25rem] md:gap-x-2 w-full">
                <div className="rounded-full w-fit md:w-[2rem] flex justify-center items-center">
                  <IoMdTime
                    className="p-[0.5rem] border-[1px] rounded-full"
                    size={33}
                  />
                </div>
                <div className="flex flex-col justify-between w-fit py-[0.5rem] relative left-1 md:mt-[-0.2rem]">
                  <p className="text-emerald-600 text-[0.8rem] md:tracking-normal md:text-[0.8rem]">
                    When
                  </p>
                  <input
                    type="text"
                    placeholder="Feb 5~March 14"
                    className="bg-transparent w-full text-[0.6rem] md:text-[0.55rem] font-light text-start flex items-center outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-[0.25rem] md:gap-x-2 w-full">
                <div className="rounded-full w-fit md:w-[2rem] flex justify-center items-center">
                  <FaCarSide
                    className="p-[0.5rem] border-[1px] rounded-full"
                    size={33}
                  />
                </div>
                <div className="flex flex-col justify-between w-fit py-[0.5rem] relative left-1 md:mt-[-0.2rem]">
                  <p className="text-emerald-600 text-[0.8rem] md:tracking-normal md:text-[0.8rem]">
                    Tour Guides
                  </p>
                  <input
                    type="text"
                    placeholder="Search Name"
                    className="bg-transparent w-full text-[0.6rem] md:text-[0.55rem] font-light text-start flex items-center outline-none"
                    value={tourGuideName}
                    onChange={(e) => setTourGuideName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className="flex justify-center items-center bg-orange-400 rounded-full shadow-sm px-[0.8rem] py-[0.75rem] md:px-[0.9rem] md:py-[0.85rem]"
                  // onClick={handleSearch}
                >
                  <IoMdSearch color="white" size={25} />
                </div>
              </div>
            </div>
            <Dive />
            <FeaturedGuides
              guideCount={5}
              location={location}
              tourGuideName={tourGuideName}
              tourGuides={filterTourGuides()} // Pass filtered guides to FeaturedGuides
            />
            <RecentBookings />
            <LogoCarousel />
            <LogoCarouselMd />
            <NewsAndUpdate />
            <NewsAndUpdateMd />
          </div>
        </ClientOnly>
      )}
    </>
    // </Suspense>
  );
}
