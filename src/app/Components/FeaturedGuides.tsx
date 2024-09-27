/* eslint-disable @next/next/no-img-element */
"use client";
import React, { CSSProperties } from "react";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";
import {
  HiOutlineExclamationCircle,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { TourGuideContext } from "../context/tourGuideContext";
import { useContext } from "react";
import GridSkeletonLoader from "./GridSkeleton";
import ClipLoader from "react-spinners/ClipLoader";
import PacmanLoader from "react-spinners/PacmanLoader";
import { UserContext } from "../context/UserContex";

interface TourGuide {
  id: string;
  userId: string;
  location: string;
  offerRange: number;
  aboutMe: string;
  motto: string;
  thingsToDo: string[];
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

interface FeaturedGuidesProps {
  guideCount: number;
  hideViewMore?: boolean;
  guides?: any;
  location?: string; // Add location prop
  tourGuideName?: string; // Add tourGuideName prop
  tourGuides?: TourGuide[]; // Add tourGuides prop
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const FeaturedGuides = ({
  guideCount,
  hideViewMore = false,
  tourGuides = [],
}: FeaturedGuidesProps) => {
  const { user } = useContext(UserContext);
  const { loading } = useContext(TourGuideContext);

  if (loading) return <GridSkeletonLoader />;

  return (
    <div className="px-[1rem] py-[2rem] md:px-[4rem] pt-[1rem] md:pt-[2rem] pb-[1rem] w-full flex flex-col justify-center mb-[2rem] md:mb-[3rem]">
      <div className="w-full flex justify-between items-center mb-[2.5rem] md:mb[1.5rem]">
        <div className="py-[1.25rem]">
          <h1
            id="mini-header"
            className="font-semibold text-[1.7rem] md:text-[1.8rem] tracking-wide md:text-lg text-teal-950"
          >
            Featured Guides
          </h1>
        </div>
        {!hideViewMore && (
          <Link href={loading ? "" : user ? "/tourguides" : "/logIn"}>
            <button
              id="viewMore"
              className="md:relative h-fit text-white text-[1rem] md:text-sm tracking-wider font-extralight bg-orange-400 uppercase rounded-[2rem] gap-y-1 px-[1rem] md:px-[1.75rem] py-[0.9rem] md:py-[1rem]"
            >
              {loading ? (
                <ClipLoader
                  className="w-full h-full flex justify-center items-center"
                  cssOverride={override}
                  color="white"
                  loading={loading}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                " View More"
              )}
            </button>
          </Link>
        )}
      </div>

      {/* Display Filtered Guides */}
      {loading ? (
        <GridSkeletonLoader count={6} />
      ) : tourGuides?.length > 0 ? (
        <div className="block">
          <div className="md:gap-x-6 md:h-fit w-full h-fit flex flex-col justify-center md:grid md:grid-cols-4 items-center ">
            {tourGuides?.slice(0, guideCount).map((guide) => (
              <Link
                className="w-full h-full shadow-lg rounded-xl px-[1.25rem] mb-[1.85rem]"
                key={guide.user.id}
                // key={index}
                href={
                  loading
                    ? ""
                    : user
                    ? `/tourguides/tourOverview/${guide.id}`
                    : "/logIn"
                }
              >
                <div
                  style={{
                    backgroundImage: `url(/uploads/userImages/${guide.user.image})`,
                  }}
                  id="offerRange"
                  className="w-full bg-cover h-[15rem] p-[0.65rem] px-[1.15rem] bg-white rounded-2xl text-emerald-600 flex justify-end pr-[1.2rem] pt-[0.75rem]"
                >
                  <p className="h-fit py-[0.6rem] px-[0.75rem] rounded-full bg-white mt-1">
                    ${guide.offerRange}/hr
                  </p>
                </div>
                <div className="w-full mt-[0.35rem] mb-[0.25rem] flex flex-col justify-center h-full">
                  <div className="w-full h-full flex flex-col md:justify-start md:gap-y-[0.85rem] justify-between items-start">
                    <div className="w-full flex justify-between items-center h-fit pb-[0.5rem] gap-y-[0.25rem] text-teal-950 tracking-wide">
                      <div className="flex flex-col justify-start items-center">
                        <div className="w-full pl-[0.25rem] text-[1rem] text-start text-blue-950 font-semibold">
                          {guide.user.fullName.split(" ")[0]}
                        </div>
                        <div className="w-fit gap-x-[0.3rem] text-base font-normal flex justify-between items-center">
                          <HiOutlineLocationMarker
                            className="text-emerald-900"
                            size={17}
                          />{" "}
                          <p className="text-[0.85rem] text-emerald-900 tracking-tighter font-[500]">
                            {guide.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-start mt-[0.25rem] items-start gap-y-[0.5rem] py-[0.3rem]">
                        <div className="w-fit gap-x-[0.25rem] flex justify-center items-center">
                          <div className="text-[0.85rem] font-semibold text-blue-950">
                            {guide.rating}
                          </div>
                          <div className="flex justify-center w-fit gap-x-[0.10rem] md:gap-x-1">
                            <FaStar color="orange" size={15} />
                            {/* <CiStar size={13} /> */}
                          </div>
                          <p className="text-sm tracking-tighter">(243)</p>
                          {/* ({guide.user.reviews.length}) */}
                        </div>
                        <div className="flex h-fit py-0.5 text-[0.7rem] justify-center items-center gap-x-[0.25rem]">
                          <div className="text-teal-800">
                            {guide?.user?.languages != null &&
                              guide?.user?.languages[0]}
                          </div>
                          {guide?.user?.languages != null &&
                            guide?.user?.languages.length > 1 && (
                              <div className="text-teal-800 border-l-[1.5px] border-teal-700 pl-[0.25rem]">
                                {guide.user?.languages[1]}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mt-[-0.5rem] items-center">
                      <div className="text-[0.8rem] pl-[0.5rem] font-[500] text-blue-950">
                        4 Reviews
                        {/* {guide.noofreviews} */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="w-fit flex justify-start text-[0.75rem] italic font-[500] text-slate-900">
                    {guide.aboutMe}
                  </div> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex col justify-center items-center">
          <div className="flex justify-center items-center">
            <PacmanLoader
              cssOverride={override}
              color="green" // Set your desired loader color
              loading={loading}
              size={25} // Adjust size as needed
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          <div className="md:mt-[6.5rem] flex justify-center items-center w-full h-full">
            <div className="flex flex-col justify-center items-center gap-y-4">
              <HiOutlineExclamationCircle className="text-gray-500 text-5xl" />
              <p className="text-gray-500 text-lg font-medium">
                No toursGuides found or no tours matching your criteria
              </p>
              <p className="text-gray-500 text-sm">
                Try adjusting your filters or Refreshing the page.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FeaturedGuides;
