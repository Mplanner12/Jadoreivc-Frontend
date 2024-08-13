import React, { useState } from "react";
import { MdCheckBox } from "react-icons/md";
import { ImCheckboxUnchecked } from "react-icons/im";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

interface FilterProps {
  daysOptions: number[];
  onDaysSelect: (selectedDays: number | null) => void; // Now accepts a single number or null
  onLocalsSelect: (selectedLocals: string[]) => void;
  onLocationSelect: (selectedLocation: string | null) => void;
  selectedDays: number | null | undefined; // Now a single number or null
  selectedLocals: string[];
  selectedLocation: string | null;
  localsOptions: string[];
}

const Filter: React.FC<FilterProps> = ({
  daysOptions,
  onDaysSelect,
  onLocalsSelect,
  onLocationSelect,
  selectedDays,
  selectedLocals,
  selectedLocation,
}) => {
  const [daysOpen, setDaysOpen] = useState(false);
  const [localsOpen, setLocalsOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [onSelectedLocals, setSelectedLocals] = useState<string[]>([]);
  const [onSelectedDays, setSelectedDays] = useState<number | null>(null);
  const [onSelectedLocation, setSelectedLocation] = useState<string | null>(
    null
  ); // State for selected location

  const toggleDropdown = (dropdown: string) => {
    if (dropdown === "days") setDaysOpen(!daysOpen);
    if (dropdown === "locals") setLocalsOpen(!localsOpen);
    if (dropdown === "location") setLocationOpen(!locationOpen);
  };

  const localsOptions = [
    "MAN",
    "WOMAN",
    "COUPLE",
    "COUPLE OF FRIENDS",
    "FAMILY",
  ];

  const handleLocalsSelect = (local: string) => {
    if (selectedLocals?.includes(local)) {
      setSelectedLocals(selectedLocals.filter((l) => l !== local));
      onLocalsSelect(selectedLocals.filter((l) => l !== local)); // Pass the filtered array
    } else {
      setSelectedLocals([...selectedLocals, local]);
      onLocalsSelect([...selectedLocals, local]); // Pass the updated array
    }
    // setLocalsOpen(false);
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      setSelectedDays(null); // Set to null if the input is not a number
      onDaysSelect(null); // Pass null to the parent component
    } else {
      setSelectedDays(value); // Update selectedDays state
      onDaysSelect(value); // Pass the selected day as a single number to the parent component
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(event.target.value); // Update selectedLocation state
    onLocationSelect(event.target.value); // Pass the selected location to the parent component
  };

  return (
    <div className="w-full px-[1.25rem]">
      <div className="flex justify-center items-center p-[1.85rem] rounded-t-xl bg-emerald-600 text-white">
        <h1 className="text-[2rem] font-normal uppercase">Filter</h1>
      </div>
      <div className="px-[1.5rem] rounded-2xl border-x-[0.5px] border-b-[0.5px] mt-[-0.6rem] border-emerald-500 shadow-lg flex flex-col space-y-4 py-[1.5rem]">
        <div className="relative">
          <button
            className={`w-full flex justify-between items-center p-2 rounded ${
              !daysOpen && "border-b border-gray-300"
            }`}
            onClick={() => toggleDropdown("days")}
          >
            No. of Days
            <MdKeyboardArrowDown size={27} />
          </button>
          {daysOpen && (
            <div className="pb-[0.85rem] border-b-[0.5px]  border-emerald-500">
              <input
                type="number"
                className="w-full text-base p-2 border-2 my-[0.7rem] border-gray-300 rounded"
                value={selectedDays !== null ? selectedDays?.toString() : ""} // Set input value from state
                onChange={handleDaysChange} // Handle input change
              />
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className={`w-full flex justify-between items-center p-2 border-b border-gray-300 rounded ${
              localsOpen && "border-b-0"
            }`}
            onClick={() => toggleDropdown("locals")}
          >
            Type of Local
            <MdKeyboardArrowDown size={27} />
          </button>
          {localsOpen && (
            <div className="pb-[1rem] border-b-[0.5px] border-emerald-500">
              <ul className="realtive w-full bg-white border-0 mt-[-0.2rem] rounded">
                {localsOptions.map((local) => (
                  <li
                    key={local}
                    className="p-2 hover:bg-gray-200 cursor-pointer flex justify-start gap-x-[0.45rem] items-center"
                    onClick={() => handleLocalsSelect(local)}
                  >
                    {selectedLocals.includes(local) ? ( // Check if local is selected
                      <MdCheckBox className="text-blue-500 mr-2" /> // Show blue tick if selected
                    ) : (
                      <ImCheckboxUnchecked color="grey" />
                    )}
                    {local}
                  </li>
                ))}
              </ul>
              <Link
                href={""}
                aria-disabled
                className="text-semibold text-orange-500 mt-[5rem] py-[0.2rem] px-[.5rem]"
              >
                SEE MORE
              </Link>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="w-full flex justify-between items-center p-2 rounded"
            onClick={() => toggleDropdown("location")}
          >
            Location
            <MdKeyboardArrowDown size={27} />
          </button>
          {locationOpen && (
            <input
              type="text"
              className="w-full text-base p-2 border-2 my-[0.7rem] border-gray-300 rounded"
              value={selectedLocation || ""} // Correct value binding
              onChange={handleLocationChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
