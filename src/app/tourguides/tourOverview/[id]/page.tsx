/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @next/next/no-async-client-component
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, CSSProperties, Suspense } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import ReviewsCarousel from "../../../Components/ReviewsCarousel";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
import { TourGuideContext } from "@/src/app/context/tourGuideContext";
import { useContext } from "react";
import ClientOnly from "@/src/app/Components/ClientOnly";
import PacmanLoader from "react-spinners/PacmanLoader";
import LoadingScreen from "@/src/app/Components/Loader";
import { UserContext } from "@/src/app/context/UserContex";
import { AiFillSchedule } from "react-icons/ai";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const Page = ({ params }: { params: { id: string } }) => {
  const { user, setUser, role } = useContext(UserContext);
  const tourGuideId = params.id; // Access the ID from the URL
  const { fetchTourGuideById, tourGuide, loading, setTourGuide } =
    useContext(TourGuideContext);
  const [showNotFound, setShowNotFound] = useState(false);

  // Memoize the fetchTourGuideById function
  useEffect(() => {
    // Reset tourGuide to null when tourGuideId changes to trigger loading state
    setTourGuide(null);

    // Fetch the new tour guide data
    fetchTourGuideById(tourGuideId);

    // Set a timeout to show "Tour guide not found" after 5 seconds if tourGuide is still null
    const timeout = setTimeout(() => {
      setShowNotFound(true);
    }, 3000);

    // Clear the timeout if tourGuide is fetched successfully
    return () => clearTimeout(timeout);
  }, [tourGuideId]); // Only re-run the effect when tourGuideId changes

  if (tourGuide) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <ClientOnly>
          <div className="w-full h-full flex flex-col justify-center">
            {/* <Header /> */}
            <div className="w-full h-full flex flex-col justify-center box-border pt-[2rem] px-[1.35rem] md:px-[3rem]">
              <div className="hidden md:flex font-[500] justify-start items-center mb-[1.5rem] gap-x-[0.5rem]">
                <div className="flex text-[0.85rem] text-teal-950 justify-center items-center">
                  <Link href={"/"}>Home</Link>
                </div>
                <div className="flex text-[0.85rem] text-teal-950 justify-center items-center">
                  <div className="flex justify-center items-center">
                    <MdChevronRight />
                  </div>
                  <div
                    className={`flex justify-center items-center text-yellow-500
              `}
                  >
                    News
                  </div>
                </div>
              </div>
              <div className="w-full h-full border-none flex justify-center items-center md:gap-x-[0.5rem] md:mb-[1.5rem]">
                <div
                  id="big"
                  className="hidden md:flex w-full h-fit py-[0.25rem] rounded-2xl md:w-[230%] items-center" // Add flex items-center
                >
                  <img
                    src="/tourGuideOverviewImg1.png"
                    alt="image"
                    className="object-cover w-fit h-fit"
                    width={500}
                  />{" "}
                </div>
                <div className="flex flex-col h-[10rem] pt-[0.25rem] justify-start md:gap-y-[0.4rem] items-center w-full md:h-fit rounded-lg">
                  <div className="w-full h-full mt-[0.7rem] md:mt-0 rounded-2xl flex justify-center items-center object-cover">
                    <img src="/tourGuideOverviewImg2.png" alt="image" />
                  </div>
                  <div className="hidden md:flex justify-center items-center md:w-full rounded-2xl">
                    <img src="/tourGuideOverviewImg3.png" alt="image" />
                  </div>
                </div>
              </div>
              {loading || !tourGuide ? (
                <div>Loading...</div>
              ) : (
                <div className="box-border m-0 w-full h-full flex flex-col-reverse md:flex md:flex-row justify-center md:justify-between md:items-start">
                  <div className="box-border w-full flex flex-col justify-center items-center md:-mt-[1.85rem] md:w-[250%]">
                    <div className="box-border w-full md:pr-[1.5rem]">
                      <div className="box-border w-full text-teal-800 border-b-[2px] py-[2rem] font-[500]">
                        <h1 className="box-border w-full text-[1.85rem] tracking-wide md:pb-[4.25rem] text-teal-950 font-semibold py-[1rem]">
                          Discover Abijan with{" "}
                          {tourGuide.user.fullName.split(" ")[0]}
                        </h1>
                        <p className="box-border w-full text-[1rem] text-teal-900 leading-[2rem]">
                          Explore the vibrant culture, rich history, and
                          stunning landscapes of Côte d&apos;Ivoire with our
                          immersive day tour. Led by an expert local guide, this
                          tour will take you on a journey through bustling
                          markets, historical landmarks, and picturesque
                          villages, offering a unique glimpse into the life and
                          traditions of the Ivorian people.
                        </p>
                        {tourGuide.tourHighlights.length > 0 && (
                          <div className="w-full">
                            <h1 className="box-border w-full text-[1.25rem] py-[1.5rem] tracking-wider text-teal-900 font-semibold">
                              Tour Highlights
                            </h1>
                            {tourGuide.tourHighlights.map((highlight) => (
                              <div
                                key={highlight}
                                className="box-border w-full text-[1rem] leading-[2rem] gap-x-[0.75rem] flex justify-start items-center"
                              >
                                &bull;
                                <p className="box-border w-full text-teal-900">
                                  {highlight}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="box-border w-full">
                      <div className="box-border w-full border-b-[2px] py-[2rem]">
                        <h1 className="box-border w-full text-start text-[1.85rem] pb-[1.5rem] text-teal-950 font-semibold">
                          About Me
                        </h1>
                        <p className="box-border w-full text-[1rem] text-teal-900 tracking-wider leading-[2rem] font-[500]">
                          {tourGuide.aboutMe}
                        </p>
                      </div>
                    </div>
                    <div className="box-border w-full">
                      <div className="w-full border-b-[2px] py-[2rem] font-[500] text-teal-800 flex flex-col justify-start items-center">
                        <h1 className="w-full text-[2rem] pb-[1.5rem] font-semibold text-start text-teal-950">
                          Languages
                        </h1>
                        {tourGuide.user.languages.map((language) => (
                          <p
                            key={language}
                            className=" text-teal-900 w-full text-start"
                          >
                            {language}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="box-border w-full">
                      <div className="box-border w-full py-[2rem] text-teal-900 font-[500]">
                        <h1 className="box-border w-full text-start text-[2rem] pb-[1.35rem] font-semibold text-teal-950">
                          Things to Do
                        </h1>
                        {tourGuide.thingsToDo.map((activity) => (
                          <div key={activity}>
                            <div className="box-border text-[1rem] w-full leading-[2rem] gap-x-[0.75rem] flex justify-start items-center">
                              &bull;
                              <p className="box-border text-sm w-full">
                                {activity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    id="gray"
                    className="box-border w-full md:w-fit h-full flex flex-col justify-center items-center pb-[0rem] md:pb-[3rem] py-[3.5rem] md:pr-[3rem] md:pl-[1rem]"
                  >
                    <div className="box-border px-[1.5rem] w-full mb-[1.5rem] md:mb-0 flex justify-between items-center md:px-[0rem] text-teal-900 text-[1.5rem] font-semibold">
                      <div className="box-border w-fit md:w-full flex justify-start items-center gap-x-[0.75rem] md:px-[0.25rem]">
                        <div className="box-border font-bold">
                          ${tourGuide.offerRange}
                        </div>
                        <div className="box-border w-[8rem] md:w-full font-[500]">
                          Per Hour
                        </div>
                      </div>
                    </div>
                    <div className="border-[1px] bg-slate-100 border-emerald-600 rounded-3xl box-border w-full md:w-fit flex flex-col justify-center items-center md:mt-[1.75rem] pb-[5.5rem] md:px-[2rem]">
                      <div className="w-full flex justify-center items-center p-[2rem] md:px-[0.5rem]">
                        <div className="w-full flex justify-center items-center border-b-[2px] pb-[2rem]">
                          <div className="box-border w-full flex justify-start items-center text-[1.15rem] font-semibold">
                            12 Reviews
                          </div>
                          <div className="flex h-full justify-end items-center gap-x-[0.35rem]">
                            <div>
                              <p className="text-[1.3rem]">
                                {tourGuide.rating}
                              </p>
                            </div>
                            <div className="flex justify-center items-start">
                              <FaStar size={25} color="orange" fill="orange" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-[2rem] md:pt-[0.5rem] w-full flex justify-center items-center text-teal-900 text-[1.15rem]">
                        <p className="font-[500] text-center">
                          Book{" "}
                          <span className="font-bold">
                            {tourGuide.user.fullName.split(" ")[0]}{" "}
                          </span>
                          for a Tour
                        </p>
                      </div>
                      <div className="w-[90%] pb-[1.35rem] flex justify-center items-center">
                        {loading ? (
                          <SyncLoader
                            loading={loading}
                            color="green"
                            size={15}
                            margin={5}
                            speedMultiplier={1}
                          />
                        ) : (
                          <div className="w-full h-full flex justify-center items-center">
                            {user ? (
                              <Link
                                href={`/planTour/${user.id}`}
                                className="w-full flex justify-center items-center rounded-xl border border-emerald-600 shadow-sm"
                              >
                                <p className="w-[8rem]">Book now</p>
                                <AiFillSchedule
                                  size={40}
                                  className="text-emerald-600"
                                />
                              </Link>
                            ) : (
                              <span>&nbsp;</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center items-center p-[2rem] px-[0.85rem]">
                      <p className="text-start font-[500] text-teal-950 leading-[1.75rem] text-[1rem] tracking-tighter">
                        &quot;Thanks to this platform, I planned my trip
                        effortlessly and discovered amazing local experiences I
                        would have never found on my own!&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <ReviewsCarousel reviews={tourGuide.reviews} />
            </div>
            {/* <Footer /> */}
          </div>
        </ClientOnly>
      </Suspense>
    );
  } else if (showNotFound) {
    return (
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
        <div className="text-gray-500 text-center">
          Something went wrong, please try again...
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader
          loading={loading}
          color="green"
          size={15}
          margin={5}
          speedMultiplier={1}
        />
        <div />
      </div>
    );
  }
};

export default Page;
