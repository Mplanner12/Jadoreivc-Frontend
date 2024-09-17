import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import "../DateRangePicker.css";
import { FaCalendarAlt } from "react-icons/fa";

interface DateRangePickerProps {
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onStartDateChange,
  onEndDateChange,
}) => {
  const [selectedStart, setSelectedStart] = useState<any>(null);
  const [selectedEnd, setSelectedEnd] = useState<any>(null);
  const [showStartDatePlaceholder, setShowStartDatePlaceholder] =
    useState(true);
  const [showEndDatePlaceholder, setShowEndDatePlaceholder] = useState(true);

  return (
    <div className="w-full flex flex-col justify-start md:flex-row items-center gap-x-[1.5rem] md:gap-x-[2rem] mb-4 md:mb-0">
      <div className="w-full md:w-[8.25rem] flex flex-col justify-center items-start shadow-md">
        <h1 className="w-full mt-[-1.5rem] mb-[0.5rem] pl-[0.25rem]">
          Start Date
        </h1>
        {/* {showStartDatePlaceholder && (
          <p className="w-full flex justify-start text-xs items-center gap-x-[2.5rem] pl-[0.85rem] py-0 relative z-20 top-[2rem]">
            12/02/24
            <FaCalendarAlt />
          </p>
        )} */}
        <DatePicker
          className="w-[8.25rem] rounded-lg border-[0.5px] py-[0.5rem] border-neutral-100 bg-neutral-100"
          selected={selectedStart}
          onChange={(date) => {
            if (date) {
              const adjustedDate = moment(date)
                .add(moment(date).utcOffset(), "minutes")
                .toDate();
              onStartDateChange(adjustedDate);
              setSelectedStart(adjustedDate);
            } else {
              onStartDateChange(null);
            }
          }}
          onFocus={() => setShowStartDatePlaceholder(false)}
          onBlur={() => {
            if (!selectedStart) {
              setShowStartDatePlaceholder(true);
            }
          }}
          selectsStart
          startDate={selectedStart}
          endDate={selectedEnd}
          renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
            <div className="custom-header">
              <HiOutlineArrowLeft
                size={30}
                className="custom-arrow p-1 border-[0.5px] shadow-sm border-gray-700 rounded text-teal-950"
                onClick={decreaseMonth}
              />
              <span>
                {monthDate.toLocaleString("default", { month: "long" })}{" "}
                {monthDate.getFullYear()}
              </span>
              <HiOutlineArrowRight
                size={30}
                className="custom-arrow p-1 border-[0.5px] shadow-sm border-gray-700 rounded text-teal-950"
                onClick={increaseMonth}
              />
            </div>
          )}
        />
      </div>
      <div className="w-full md:w-[8.25rem] flex flex-col justify-center items-start shadow-md">
        <h1 className="mt-[-1.5rem] mb-[0.5rem] pl-[0.25rem]">End Date</h1>
        {/* {showEndDatePlaceholder && (
          <p className="w-full flex justify-start text-xs items-center gap-x-[2.5rem] pl-[0.85rem] py-0 relative z-20 top-[2rem]">
            12/02/24
            <FaCalendarAlt />
          </p>
        )} */}
        <DatePicker
          className="w-[8.25rem] rounded-lg border-[0.5px] py-[0.5rem] border-neutral-100 bg-neutral-100"
          selected={selectedEnd}
          onChange={(date) => {
            if (date) {
              const adjustedDate = moment(date)
                .add(moment(date).utcOffset(), "minutes")
                .toDate();
              onEndDateChange(adjustedDate);
              setSelectedEnd(adjustedDate);
            } else {
              onEndDateChange(null);
            }
          }}
          onFocus={() => setShowEndDatePlaceholder(false)}
          onBlur={() => {
            if (!selectedEnd) {
              setShowEndDatePlaceholder(true);
            }
          }}
          selectsEnd
          startDate={selectedStart}
          endDate={selectedEnd}
          minDate={selectedStart}
          renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
            <div className="custom-header">
              <HiOutlineArrowLeft
                size={30}
                className="custom-arrow p-1 border-[0.5px] shadow-sm border-gray-700 rounded text-teal-950"
                onClick={decreaseMonth}
              />
              <span>
                {monthDate.toLocaleString("default", { month: "long" })}{" "}
                {monthDate.getFullYear()}
              </span>
              <HiOutlineArrowRight
                size={30}
                className="custom-arrow p-1 border-[0.5px] shadow-sm border-gray-700 rounded text-teal-950"
                onClick={increaseMonth}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
