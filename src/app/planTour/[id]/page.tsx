"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, Suspense } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { MdCheckBox } from "react-icons/md";
import { RiCheckboxBlankLine } from "react-icons/ri";
import DateRangePicker from "../../Components/DateRangePicker";
import TimePicker from "../../Components/TimePicker";
import { usePlannedTours } from "../../context/tourPlanContext";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/utils";
import LoadingScreen from "../../Components/Loader";

const Page = ({ params }: { params: { id: string } }) => {
  const touristID = params.id; // Access params.id correctly
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [selectedPersons, setSelectedPersons] = useState<number>(1);
  const [selectedLocals, setSelectedLocals] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [tourPlans, setTourPlans] = useState<any[]>([]);

  const peopleDropdownRef = useRef<HTMLUListElement>(null);
  const localsDropdownRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

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
  const localsOptions = ["MAN", "WOMAN", "COUPLE", "FAMILY", "FRIENDS"];

  const handlePersonsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const Person = parseInt(event.target.value);
    setSelectedPersons((selectedPerson: number) => Person);
    console.log("Selected Persons:", Person);
    setPeopleOpen(false);
  };

  const handleLocalsSelect = (local: string) => {
    setSelectedLocals((prevLocals) => {
      const updatedLocals = prevLocals.includes(local)
        ? prevLocals.filter((l) => l !== local)
        : [...prevLocals, local];

      // Log the updated selected locals
      console.log("Selected Locals:", updatedLocals);

      return updatedLocals;
    });
  };

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

  const handlePlanTour = async () => {
    // console.log("selectedLocation:", selectedLocation);
    // console.log("startDate:", startDate);
    // console.log("endDate:", endDate);
    // console.log("selectedTime:", selectedTime);
    // console.log("selectedPersons:", selectedPersons);
    if (
      !selectedLocation ||
      !startDate ||
      !endDate ||
      !selectedTime ||
      !selectedPersons
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const tourPlanData = {
      touristId: touristID, // Use touristID here
      location: selectedLocation,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      time: selectedTime,
      numberOfPeople: selectedPersons,
      guidePreference: selectedLocals,
    };

    try {
      const { data } = await axiosInstance.post(
        "/api/plans/tourPlans",
        tourPlanData
      );
      setTourPlans([...tourPlans, data.tourPlan]);
      router.push("/customTour");
    } catch (error) {
      console.error("Error creating tour plan:", error);
    }
    try {
      await createTourPlan(tourPlanData);
      router.push("/customTour");
    } catch (error) {
      console.error("Error planning tour:", error);
      alert("An error occurred while planning your tour.");
    }
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
        <div className="w-full flex flex-col justify-center md:py-[2rem] items-center mb-1 md:mb-[2rem] mt-[2rem] px-[1rem] md:px-[2.5rem]">
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
                className="w-[95%] md:w-[100%] text-[1.25rem] p-2 px-[0.9rem] shadow-sm my-[0.7rem] bg-gray-100 border-gray-300 rounded outline-emerald-600 text-black"
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
            className="w-fit h-full flex flex-col justify-start items-center px-[1rem] pr-[0.5rem] md:pr-[1rem] mb-[2rem] md:mb-[0.25rem] md:pt-[0]"
          >
            <div className="w-full pb-[1rem] flex text-start md:text-center px-[0.16rem] text-teal-900 text-[1.1rem] font-[500] justify-start md:justify-center md:ml-[-15.5rem] items-center">
              <h1>Date</h1>
            </div>
            <div className="w-full md:fit h-full flex flex-col md:flex-row justify-center items-center md:py-[0.5rem] shadow-sm rounded-[0.5rem] border-[0.5px] pt-[0.3rem] md:pt-[0.1rem] md:pb-0 pr-[0.5rem] md:pr-[0.5rem] border-emerald-700 pb-[0.1rem] px-[.5rem] md:px-[0.5rem]">
              <DateRangePicker
                onStartDateChange={(date) => setStartDate((startDate) => date)} // Passing the current state is unnecessary
                onEndDateChange={(date) => setEndDate((endDate) => date)}
              />
              <div className="w-full flex md:px-[0.25rem] justify-start items-center">
                <TimePicker
                  onTimeChange={(time) => setSelectedTime((newTime) => time)}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-fit h-full flex flex-col justify-start items-center -mt-[1rem] md:mt-0 py-[0.5rem] pb-[1.25rem]">
            {/* <div className="w-full px-[2.7rem] md:w-fit flex flex-col justify-start items-center relative">
            <label
              htmlFor=""
              className="py-[0rem] w-full text-start text-[1.2rem] font-[500] text-teal-900"
            >
              Number of People
            </label>
            <button
              className="flex w-full text-[1.225rem] font-[500] text-teal-900 bg-slate-100 border-none justify-between gap-x-[4rem] items-center p-2.5 mt-[0.85rem] px-[1.25rem] rounded md:w-fit"
              onClick={toggleDropdown}
            >
              {selectedPersons ? selectedPersons : "Just me"}
              <HiOutlineChevronDown size={30} className="text-teal-800" />
            </button>
            {peopleOpen && (
              <ul
                ref={peopleDropdownRef} // Attach the reference to the dropdown
                className="relative bg-slate-100 w-full md:w-full flex flex-col justify-center items-center mt-[0rem] z-20  border-gray-300 rounded shadow-md"
              >
                {peopleOptions.map((person) => (
                  <li
                    key={person}
                    onClick={() => {
                      console.log(`Clicked on: ${person}`);
                      handlePersonsChange(person);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {person}
                  </li>
                ))}
              </ul>
            )}
          </div> */}
            <div>
              <select
                value={selectedPersons}
                onChange={handlePersonsChange}
                className="flex w-full text-[1.225rem] font-[500] text-teal-900 bg-slate-100 border-none justify-between items-center p-2.5 mt-[0.85rem] px-[1.25rem] rounded md:w-[19rem]"
              >
                {peopleOptions.map((person, index) => (
                  <option key={index} value={person.value}>
                    {person.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full px-[1.9rem] md:w-fit h-full flex flex-col justify-center md:justify-start items-center font-[400] py-[0rem] pb-[1.85rem] mb-[2.5rem] md:mb-0">
            <div className="w-fit md:w-full px-[1.2rem] md:px-[3.75rem] flex flex-col justify-center items-center relative">
              <label
                htmlFor=""
                className="w-full py-[0.35rem] pl-[0.3rem] font-[500] text-[1.25rem] text-start text-teal-900"
              >
                Looking for a local
              </label>
              <ul
                ref={localsDropdownRef} // Attach the reference to the dropdown
                className="w-full mt-1 flex flex-col justify-start items-start"
              >
                {localsOptions.map((local) => (
                  <li
                    key={local}
                    className="p-1 hover:bg-gray-200 text-teal-900 text-[1rem] cursor-pointer flex justify-start gap-x-[0.7rem] items-center"
                    onClick={() => handleLocalsSelect(local)}
                  >
                    {selectedLocals.includes(local) ? (
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
                    <p className="text-[1.1rem] capitalize text-teal-900 font-[500]">
                      {local}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-fit h-full mt-[2rem] pb-[4rem] flex justify-center items-center">
              <button
                onClick={handlePlanTour}
                className="uppercase w-full h-full flex justify-center items-center p-[0.75rem] px-[2.85rem] md:px-[5.85rem] font-[500] text-[1.3rem] text-center bg-orange-400 rounded-full text-white"
              >
                plan new Journey
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
