"use client";
/* eslint-disable @next/next/no-img-element */
import React, {
  useState,
  useRef,
  useEffect,
  Suspense,
  useContext,
  CSSProperties,
} from "react";
import DateRangePicker from "../../Components/DateRangePicker";
import { usePlannedTours } from "../../context/tourPlanContext";
import { useRouter } from "next/navigation";
import axiosInstance, { getUserRole } from "@/src/lib/utils";
import LoadingScreen from "../../Components/Loader";
import { UserContext } from "../../context/UserContex";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};
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
  name: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const touristID = params.id; // Access params.id correctly
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [selectedPersons, setSelectedPersons] = useState<number>(1);
  // const [selectedLocals, setSelectedLocals] = useState<string[]>([]);
  const [selectedLocal, setSelectedLocal] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // const [tourPlans, setTourPlans] = useState<any[]>([]);
  const [guides, setGuides] = useState<TourGuide[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const peopleDropdownRef = useRef<HTMLUListElement>(null);
  const localsDropdownRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const role = getUserRole();
  const { user, loading } = useContext(UserContext);
  const { createTourPlan } = usePlannedTours();

  const toggleDropdown = () => {
    setPeopleOpen((isDropdownOpen) => !isDropdownOpen);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    setSelectedLocation((locationSelected) => location);
  };

  const peopleOptions = [
    { text: "Just me", value: 1 },
    { text: "2 persons", value: 2 },
    { text: "3 persons", value: 3 },
    { text: "4 persons", value: 4 },
    { text: "5 persons", value: 5 },
    { text: "more", value: 8 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/tourGuides/tourGuides");
        const data: any = response.data;
        setGuides(data.tourGuides);
      } catch (error) {
        console.error("Error fetching tour guides:", error);
        setGuides([]);
      }
    };

    fetchData();
  }, []);
  const localsOptions = ["MAN", "WOMAN", "COUPLE", "FAMILY", "FRIENDS"];

  const handlePersonsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const Person = parseInt(event.target.value);
    setSelectedPersons((selectedPerson: number) => Person);
    console.log("Selected Persons:", Person);
    setPeopleOpen(false);
  };

  // const handleLocalsSelect = (guideId?: any) => {
  //   setSelectedLocals((prevLocals) => {
  //     const updatedLocals = prevLocals.includes(guideId)
  //       ? prevLocals.filter((l) => l !== guideId)
  //       : [...prevLocals, guideId];

  //     console.log("Selected Locals:", updatedLocals);

  //     return updatedLocals;
  //   });
  // };

  const handleLocalsSelect = (guideId: string) => {
    setSelectedLocal((prevLocal) => {
      const updatedLocal = prevLocal === guideId ? null : guideId;
      // You need to return the updatedLocal from the state updater function
      return updatedLocal;
    });
    // console.log("Selected Locals:", selectedLocal);
  };

  useEffect(() => {
    console.log("Selected Locals:", selectedLocal);
  }, [selectedLocal]); // Run this effect whenever selectedLocal change

  const handleClickOutside = (event: MouseEvent) => {
    if (
      peopleDropdownRef.current &&
      !peopleDropdownRef.current.contains(event.target as Node) &&
      !((event.target as HTMLElement)?.closest("button") || false)
    ) {
      setPeopleOpen(false);
    }
    if (
      localsDropdownRef.current &&
      !localsDropdownRef.current.contains(event.target as Node) &&
      !((event.target as HTMLElement)?.closest("button") || false)
    ) {
      setPeopleOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const updateCount = (category: string, change: number) => {
    setGuests((prev) => ({
      ...prev,
      [category as keyof typeof guests]: Math.max(
        0,
        prev[category as keyof typeof guests] + change
      ),
    }));
  };

  // const handlePlanTour = async () => {
  //   // console.log("selectedLocation:", selectedLocation);
  //   // console.log("startDate:", startDate);
  //   // console.log("endDate:", endDate);
  //   // console.log("selectedTime:", selectedTime);
  //   // console.log("selectedPersons:", selectedPersons);
  //   if (
  //     !selectedLocation ||
  //     !startDate ||
  //     !endDate ||
  //     !selectedTime ||
  //     !selectedPersons
  //   ) {
  //     alert("Please fill in all the required fields.");
  //     return;
  //   }

  //   const tourPlanData = {
  //     touristId: touristID, // Use touristID here
  //     location: selectedLocation,
  //     startDate: startDate.toISOString(),
  //     endDate: endDate.toISOString(),
  //     time: selectedTime,
  //     numberOfPeople: selectedPersons,
  //     guidePreference: selectedLocals,
  //   };

  //   try {
  //     await createTourPlan(tourPlanData);
  //     router.push("/customTour");
  //   } catch (error) {
  //     console.error("Error planning tour:", error);
  //     alert("An error occurred while planning your tour.");
  //   }
  // };

  const handlePlanTour = async () => {
    console.log("selectedLocation:", selectedLocation);
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);
    // console.log("selectedTime:", selectedTime);
    console.log("selectedPersons:", selectedPersons);
    console.log("selected Guide IDs:", selectedLocal);
    if (
      !selectedLocation ||
      !startDate ||
      !endDate ||
      !selectedLocal ||
      // !selectedTime ||
      !guests
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const tourPlanData = {
      touristId: touristID, // Use touristID here
      location: selectedLocation,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      // time: selectedTime,
      adults: guests.adults,
      children: guests.children,
      infants: guests.infants,
      pets: guests.pets,
      guidePreference: selectedLocal,
    };

    try {
      setSubmitting(true);
      if (user && role === "TOURIST") {
        const response = await createTourPlan(tourPlanData);
        console.log("Tour plan created:", response);
        const tourPlanId = response;
        // await axiosInstance.post("/api/notifications", {
        //   userId: user.id,
        //   tourPlanId: tourPlanId,
        //   message: `Your tour plan payment is pending.`,
        //   type: "tour plan status",
        // });

        router.push(`/checkout/${tourPlanId}`);
      } else {
        router.push("/logIn");
      }
    } catch (error) {
      console.error("Error planning tour:", error);
      alert("An error occurred while planning your tour.");
    }
    setSubmitting(false);
  };

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="m-0 p-0 flex flex-col justify-center items-center">
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
        <div className="w-full flex flex-col justify-center md:py-[2rem] items-center mb-1 md:mb-[2rem] mt-[2rem] px-[1rem] md:px-[1.25rem]">
          <div className="w-full h-full flex flex-col justify-center items-center py-[1rem] pb-[3.85rem]">
            <div className="flex justify-start md:justify-center items-center py-[0.75rem]">
              <h1 className="text-[2.5rem] text-teal-950 font-semibold">
                Plan your Journey
              </h1>
            </div>
            <div className="px-[2rem]">
              <p className="text-[1.3rem] font-normal text-teal-950 text-center">
                Save time by planning your journey and receiving offers from
                locals
              </p>
            </div>
          </div>
          <div className="w-full h-full md:w-full flex px-[1.75rem] md:px-0 flex-col justify-center items-center py-[0.5rem] pb-[1rem]">
            <div className="w-full md:w-fit relative flex flex-col justify-center md:justify-start items-center -mt-[0.45rem]">
              <label
                htmlFor="destination"
                className="w-full flex justify-start items-center text-teal-950 text-[1.25rem] p-1.5 rounded"
              >
                Where are you going?
              </label>
              <input
                type="text"
                className="w-[95%] md:w-[100%] text-[1.25rem] p-2 px-[0.9rem] shadow-md my-[0.7rem] bg-gray-100 border-gray-300 rounded outline-emerald-600 text-black"
                value={
                  selectedLocation !== null ? selectedLocation.toString() : ""
                } // Set input value from state
                onChange={handleLocationChange} // Handle input change
                placeholder="Ivory Co"
              />
            </div>
          </div>
          <div
            id="datetimecont"
            className="w-full lg:w-fit h-full flex flex-col justify-start items-center px-[2rem] lg:px-[1rem] md:pr-[1rem] mb-[2rem] md:mb-[0.25rem] md:pt-[0]"
          >
            {/* <div className="w-full pb-[1rem] flex text-start md:text-center px-[0.16rem] text-teal-900 text-[1.1rem] font-[500] justify-start md:justify-center md:ml-[-15.5rem] items-center"></div> */}
            <div className="w-full md:fit h-full flex flex-col md:flex-row justify-center items-center md:py-[0.5rem] rounded-[0.5rem] pt-[0.3rem] md:pt-[0.1rem] md:pb-0 pr-[0.5rem] mt-[1rem] md:pr-[0.5rem] pb-[0.1rem] px-[.5rem] md:px-[0.5rem]">
              <DateRangePicker
                onStartDateChange={(date) => setStartDate((startDate) => date)} // Passing the current state is unnecessary
                onEndDateChange={(date) => setEndDate((endDate) => date)}
              />
              {/* <div className="w-full flex md:px-[0.25rem] justify-start items-center">
                <TimePicker
                  onTimeChange={(time) => setSelectedTime((newTime) => time)}
                />
              </div> */}
            </div>
          </div>
          {/* <div className="w-full md:w-fit h-full flex flex-col justify-start items-center -mt-[1rem] md:mt-0 py-[0.5rem] pb-[1.25rem]">
            <div>
              <select
                value={selectedPersons}
                onChange={handlePersonsChange}
                className="flex w-[15rem] text-[1.225rem] font-[500] text-teal-900 bg-slate-100 border-none justify-between items-center p-2.5 mt-[0.85rem] px-[1.25rem] rounded md:w-[19rem]"
              >
                {peopleOptions.map((person, index) => (
                  <option key={index} value={person.value}>
                    {person.text}
                  </option>
                ))}
              </select>
            </div>
          </div> */}
          <div className="w-fit h-full flex flex-col justify-center items-center my-[0.75rem]">
            <h1 className="w-full text-start text-[1.25rem] text-teal-950 my-[0.75rem]">
              Guests
            </h1>
            <div className="w-full h-full flex flex-col justify-start items-center p-[1.15rem] shadow-md rounded-2xl border border-neutral-300  gap-y-[0.75rem]">
              <div className="w-full guest-category flex justify-start items-center gap-x-[2.35rem]">
                <div className="w-full h-full flex flex-col justify-start items-start">
                  <label>Adults</label>
                  <p className="text-xs">Ages 13 and above</p>
                </div>
                <div className="w-full h-full flex justify-end items-center gap-x-[1.25rem]">
                  <button
                    onClick={() => updateCount("adults", -1)}
                    className="shadow-md p-[1rem] py-[0.5rem] rounded-full border border-neutral-400"
                  >
                    -
                  </button>
                  <span>{guests.adults}</span>
                  <button
                    onClick={() => updateCount("adults", 1)}
                    className="shadow-md p-[1rem] py-[0.5rem] rounded-full border border-neutral-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-full guest-category flex justify-start items-center gap-x-[2.35rem]">
                <div className="w-full h-full flex flex-col justify-start items-start">
                  <label>Children</label>
                  <p className="text-xs">Ages 2-12</p>
                </div>
                <div className="w-full h-full flex justify-end items-center gap-x-[1.25rem]">
                  <button
                    onClick={() => updateCount("children", -1)}
                    className="shadow-md p-[1rem] py-[0.5rem] rounded-full border border-neutral-400"
                  >
                    -
                  </button>
                  <span>{guests.children}</span>
                  <button
                    onClick={() => updateCount("children", 1)}
                    className="shadow-md p-[1rem] py-[0.5rem] rounded-full border border-neutral-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-full guest-category flex justify-start items-center gap-x-[2.35rem]">
                <div className="w-full h-full flex flex-col justify-start items-start">
                  <label>Infants</label>
                  <p className="text-xs">Under 2</p>
                </div>
                <div className="w-full h-full flex justify-end items-center gap-x-[1.25rem]">
                  <button
                    onClick={() => updateCount("infants", -1)}
                    className="shadow-md p-[1rem] py-[0.5rem] rounded-full border border-neutral-400"
                  >
                    -
                  </button>
                  <span>{guests.infants}</span>
                  <button
                    onClick={() => updateCount("infants", 1)}
                    className="shadow-md p-[1rem] py-[0.5rem] rounded-full border border-neutral-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-full guest-category flex justify-start items-center gap-x-[2.35rem]">
                <div className="w-full h-full flex flex-col justify-start items-start">
                  <label>Pets</label>
                  <p className="text-xs">Are you bringing pets?</p>
                </div>
                <div className="w-full h-full flex justify-end items-center gap-x-[1.25rem]">
                  <button
                    onClick={() => updateCount("pets", -1)}
                    className="shadow-md p-[1rem] py-[0.5rem] rounded-full border border-neutral-400"
                  >
                    -
                  </button>
                  <span>{guests.pets}</span>
                  <button
                    onClick={() => updateCount("pets", 1)}
                    className="shadow-md p-[1rem] py-[0.5rem] rounded-full border border-neutral-500"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-[1.9rem] md:w-fit h-full flex flex-col justify-center md:justify-start items-center font-[400] py-[0rem] pb-[1.85rem] mb-[2.5rem] md:mb-0">
            <div className="w-fit md:w-full px-[1.2rem] md:px-[2rem] flex flex-col justify-center items-center relative">
              <label
                htmlFor=""
                className="w-full py-[0.35rem] pl-[0.3rem] font-[500] text-[1.25rem] text-start text-teal-900"
              >
                choose a local Guide
              </label>
              {/* <ul
                ref={localsDropdownRef} // Attach the reference to the dropdown
                className="w-full mt-1 flex flex-col justify-start items-start"
              >
                {guides.length !== 0 &&
                  guides.slice(0, 7).map((guide) => (
                    <li
                      key={guide.id}
                      className="p-1 hover:bg-gray-200 text-teal-900 text-[1rem] cursor-pointer flex justify-start gap-x-[0.7rem] items-center"
                      onClick={() =>
                        handleLocalsSelect(guide.user.fullName.split(" ")[0])
                      }
                    >
                      {selectedLocals.includes(
                        guide.user.fullName.split(" ")[0]
                      ) ? (
                        <MdCheckBox
                          size={31}
                          className="text-teal-900 mr-2 border-none"
                        />
                      ) : (
                        <RiCheckboxBlankLine
                          className="text-teal-950 font-extralight rounded-[3rem] border-[0px]"
                          size={27}
                        />
                      )}
                      <p className="text-[1.1rem] text-teal-900 font-[500]">
                        {guide.user.fullName} ${guide.offerRange}/hr
                      </p>
                    </li>
                  ))}
              </ul> */}
              <select
                className="w-full mt-1 text-teal-900 py-[0.75rem] outline-none text-[1rem] cursor-pointer border-[0.25px] border-neutral-200 bg-neutral-100 rounded px-2"
                value={selectedLocal || ""} // Use selectedLocal directly
                onChange={(e) => handleLocalsSelect(e.target.value)}
              >
                <option value="">Select a guide</option>
                {guides.length !== 0 &&
                  guides.slice(0, 7).map((guide) => (
                    <option key={guide.id} value={guide.offerRange}>
                      {guide.user.fullName} ${guide.offerRange}/hr
                    </option>
                  ))}
              </select>
            </div>
            {/* {} */}
            <div className="w-full px md:w-fit h-full mt-[2rem] pb-[4rem] flex justify-center items-center">
              <button
                disabled={loading || submitting}
                onClick={handlePlanTour}
                className="uppercase w-full md:w-[24.5rem] h-[3rem] flex justify-center items-center p-[0.75rem] px-[2.85rem] md:px-[3rem] font-[500] text-[1.3rem] text-center bg-orange-400 rounded-full text-white"
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
                ) : user && role === "TOURIST" ? (
                  <>
                    GO TO PAYMENT
                    <ClipLoader
                      className={`w-full h-full ${
                        submitting ? "flex" : "hidden"
                      } flex justify-center items-center`}
                      cssOverride={override}
                      color="green"
                      loading={submitting}
                      size={25}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </>
                ) : (
                  <>plan new Journey</>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </Suspense>
  );
};

export default Page;
