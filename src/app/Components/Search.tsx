"use client";
import React, { useContext, useEffect } from "react";
import { ImLocation } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { FaCarSide } from "react-icons/fa6";
import { TourGuideContext } from "../context/tourGuideContext"; // Import the context
import { useRouter } from "next/navigation";

// Define the props type for the component
interface SearchProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  tourGuideName: string;
  // tourGuideName: string;
  setTourGuideName: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({
  location,
  setLocation,
  tourGuideName,
  setTourGuideName,
}) => {
  const { fetchTourGuides, tourGuides } = useContext(TourGuideContext); // Use useContext to access the context
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    fetchTourGuides();
  }, [fetchTourGuides]);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleTourGuideNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTourGuideName(event.target.value);
  };

  const handleSearch = () => {
    // Filter the tourGuides based on location and tourGuideName
    const filteredGuides = tourGuides?.filter((guide) => {
      const locationMatch =
        location.toLowerCase() === "" ||
        guide.location.toLowerCase().includes(location.toLowerCase());
      const nameMatch =
        tourGuideName.toLowerCase() === "" ||
        guide.user.fullName.toLowerCase().includes(tourGuideName.toLowerCase());
      return locationMatch && nameMatch;
    });

    // Navigate or display the results based on filteredGuides
    if (filteredGuides && filteredGuides.length > 0) {
      return filteredGuides;
      // Example: Navigate to a search results page
      // router.push({
      //   pathname: "/search-results",
      //   query: { guides: JSON.stringify(filteredGuides) },
      // });
    } else {
      // Example: Display a message indicating no results found
      alert("No tour guides found matching your criteria.");
    }
  };

  return (
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
            onChange={handleLocationChange}
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
            Tour Guide
          </p>
          <input
            type="text"
            placeholder="All tour guides"
            className="bg-transparent w-full text-[0.6rem] md:text-[0.55rem] font-light text-start flex items-center outline-none"
            value={tourGuideName}
            onChange={handleTourGuideNameChange}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          className="flex justify-center items-center bg-orange-400 rounded-full shadow-sm px-[0.8rem] py-[0.75rem] md:px-[0.9rem] md:py-[0.85rem]"
          onClick={handleSearch}
        >
          <IoMdSearch color="white" size={25} />
        </div>
      </div>
    </div>
  );
};

export default Search;
