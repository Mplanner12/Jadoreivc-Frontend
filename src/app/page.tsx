"use client";
import Hero from "./Components/Hero";
import FeaturedGuides from "./Components/FeaturedGuides";
import RecentBookings from "./Components/RecentBookings";
import { LogoCarousel } from "./Components/LogoCarouselSm";
import NewsAndUpdate from "./Components/NewsAndUpdateSm";
import { ImLocation } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { FaCarSide } from "react-icons/fa6";
import ClientOnly from "./Components/ClientOnly";
import { useState, useContext, useEffect, Suspense } from "react";
import LoadingScreen from "./Components/Loader";
import { TourGuideContext } from "./context/tourGuideContext";
import Dive from "./Components/Dive";
import { BsSearch } from "react-icons/bs";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [combinedSearch, setCombinedSearch] = useState("");
  const [filteredGuides, setFilteredGuides] = useState<any[]>([]); // Initialize as an empty array
  const { tourGuides } = useContext(TourGuideContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // Updated search function to handle combined search
  const filterTourGuides = () => {
    const lowerCaseSearch = combinedSearch.toLowerCase();
    return tourGuides?.filter((guide: any) => {
      const locationMatch = guide.location
        .toLowerCase()
        .includes(lowerCaseSearch);
      const nameMatch = guide.user.fullName
        .toLowerCase()
        .includes(lowerCaseSearch);
      return locationMatch || nameMatch;
    });
  };

  // Initial rendering of all tour guides
  useEffect(() => {
    setFilteredGuides(tourGuides); // Set initial filteredGuides to all tourGuides
  }, [tourGuides]);

  // Update filteredGuides on search button click
  const handleSearch = () => {
    const filtered = filterTourGuides();
    setFilteredGuides(filtered);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ClientOnly>
          <div className="m-0 p-0 flex flex-col justify-center">
            <Hero />
            <div
              id="search"
              className="border-[1px] px-[0.35rem] md:px-[0.65rem] border-green-600 bg-white z-20 relative -top-[2rem] rounded-full mx-auto shadow-md w-[94%] md:w-[54%] h-full py-[0.15rem] md:py-[0.4rem] flex justify-center items-center gap-x-[0.2rem] md:gap-x-[1.25rem]"
            >
              <div className="flex items-center w-full h-[2.5rem] rounded-full bg-gray-100 px-3">
                <BsSearch className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search destinations or tour guides"
                  className="bg-transparent w-full text-[0.8rem] md:text-[1rem] font-light text-start flex items-center outline-none px-2"
                  value={combinedSearch}
                  onChange={(e) => setCombinedSearch(e.target.value)}
                />
              </div>
              <button
                className="flex justify-center items-center bg-orange-400 hover:bg-emerald-600 hover:text-white after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:transform after:translate-x-[-50%] after:translate-y-[-50%] after:w-0 after:h-0 after:border-b-2 after:border-l-2 after:border-orange-400 after:transition-all after:duration-300 hover:after:w-4 hover:after:h-4 rounded-full shadow-sm px-[0.8rem] py-[0.75rem] md:px-[0.9rem] md:py-[0.85rem]"
                onClick={handleSearch}
              >
                <IoMdSearch color="white" size={25} />
              </button>
            </div>
            <Dive />
            <RecentBookings />
            <FeaturedGuides
              guideCount={5}
              tourGuides={filteredGuides} // Pass filtered guides to FeaturedGuides
            />
            <LogoCarousel />
            <NewsAndUpdate />
          </div>
        </ClientOnly>
      )}
    </>
  );
}

// flex justify-center items-center bg-orange-400
