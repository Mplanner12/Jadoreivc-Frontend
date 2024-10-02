/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */
import React, { Suspense, useEffect, useState } from "react";
import PaginationButtons from "../Components/Pagination";
import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import FeaturedGuides from "../Components/FeaturedGuides";
import axiosInstance from "@/src/lib/utils";
import LoadingScreen from "../Components/Loader";
import FeaturedGuidesTourPage from "../Components/FeaturedGuidesTourPage";

interface TourGuide {
  id: string;
  userId: string;
  location: string;
  offerRange: number;
  aboutMe: string;
  motto: string;
  thingsToDo: string[]; // Assuming this is an array of strings
  summary: string;
  tourHighlights: string[];
  rating: number | null;
  user: User;
  reviews: any[];
  name: string; // Add the 'name' property
  // tourGuidests: any; // Add the 'tourGuidests' property
}

interface User {
  id: string;
  fullName: string;
  address: string;
  email: string;
  password: string;
  userType: string;
  languages: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
}

const Buttons = [
  "City Tours",
  "Cultural Tours",
  "Day Cruises",
  "Bus Tours",
  "Beach Tours",
  "Food Tours",
];

const Page = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [guides, setGuides] = useState<TourGuide[]>([]);
  const [filteredGuidesData, setFilteredGuidesData] = useState<TourGuide[]>([]); // Initialize with guides
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Function to filter tour guides based on selected filter
  const filteredGuides = () => {
    const guidesArray = Array.isArray(guides) ? guides : [];
    if (selectedFilter === "") {
      return guidesArray;
    } else {
      return guidesArray.filter((guide) =>
        guide.thingsToDo.includes(selectedFilter)
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/tourGuides/tourGuides");
        const data: any = response.data;
        setGuides(data.tourGuides);
        setFilteredGuidesData(data.tourGuides); // Set filteredGuidesData on initial load
      } catch (error) {
        console.error("Error fetching tour guides:", error);
        setGuides([]); // Fallback to empty array on error
      }
    };

    fetchData();
  }, []); // No dependency array, so it runs only once on mount

  // Update filteredGuidesData when selectedFilter changes
  useEffect(() => {
    setFilteredGuidesData(filteredGuides());
  }, [selectedFilter]);

  // Calculating the total number of pages
  const totalPages = Math.ceil(filteredGuidesData.length / pageSize);

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Get the guides for the current page
  const currentGuides = filteredGuidesData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="w-full m-0 p-0 flex flex-col justify-center">
        {/* <Header /> */}
        <div className="h-full w-full">
          <img
            className="h-[20rem] md:h-[25rem] w-full"
            alt=""
            src="/tourGuides.png"
            width={100}
            height={100}
          />
        </div>
        <div className="h-full w-full py-[1.85rem] px-[0rem] md:px-[1.5rem] flex flex-col justify-center items-center">
          <h1 className="md:pl-[3.5rem] w-full tracking-tighter md:tracking-normal text-[1.75rem] text-center md:text-start md:text-[2.5rem] md:mt-[2.75rem] font-semibold text-teal-950 mb-[3rem]">
            Tour Guides in Côte d’Ivoire
          </h1>
          <div className="w-full pl-[1.25rem]">
            <div className="flex justify-center items-center">
              <button
                onClick={() => setSelectedFilter("")}
                className="w-fit md:w-fit h-fit md:h-[4rem] py-[1.3rem] shadow-lg p-[1.85rem] uppercase font-[500] text-emerald-600 bg-slate-50 rounded-full active:bg-emerald-600 outline-none active:text-white text-[0.85rem] border-[1px] border-emerald-600 hover:bg-emerald-600 hover:text-white mb-4"
              >
                Clear Filters
              </button>
            </div>
            <Carousel className="w-full h-full py-[0rem] md:px-[4rem]">
              <CarouselContent className="w-full h-fit gap-x-[3.5rem] md:gap-x-[1rem]">
                {Buttons.map((button) => (
                  <CarouselItem
                    key={button}
                    id="carouselBtn"
                    className="w-full  h-fit basis-[23%] md:basis-[15%]"
                  >
                    <div className="">
                      <Card className="w-full h-fit flex justify-center items-center">
                        <CardContent className="w-full h-[6rem] flex aspect-square items-center justify-center p-2 py-1">
                          <div className="w-fit md:w-full h-[5rem] mb-[0.25rem] flex flex-col justify-center items-center rounded-md gap-y-.25">
                            <button
                              onClick={() => setSelectedFilter(button)}
                              className="w-fit md:w-full h-fit md:h-[4rem] shadow-lg py-[0.65rem] p-[1.85rem] uppercase font-[500] text-emerald-600 bg-slate-50 rounded-full active:bg-emerald-600 outline-none active:text-white text-[0.85rem] border-[1px] border-emerald-600 hover:bg-emerald-600 hover:text-white"
                            >
                              {button}
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <FeaturedGuidesTourPage
            guideCount={12}
            hideViewMore={true}
            guides={currentGuides}
          />
        </div>
        <div className="flex justify-center items-center py-[2.5rem] mb-[5rem] md:px-[4rem]">
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
