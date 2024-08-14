import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment, { utc } from "moment";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import "../DateRangePicker.css";

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

  return (
    <div className="flex flex-col items-center md:flex-row md:gap-x-4 md:pr-[0.5rem] mb-4 md:mb-0">
      <div className="flex justify-center items-center">
        <DatePicker
          className="rounded-xl"
          selected={selectedStart}
          onChange={(date) => {
            if (date) {
              const adjustedDate = moment(date).add(1, "day").toDate();
              // .toDate();
              onStartDateChange(adjustedDate);
              setSelectedStart(adjustedDate);
              // console.log("Adjusted Start Date:", adjustedDate);
            } else {
              onStartDateChange(null);
            }
          }}
          selectsStart
          startDate={selectedStart}
          endDate={selectedEnd}
          inline
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
      <div className="md:border-l-[1px] border-gray-400 md:pl-[0.7rem] flex justify-center items-center">
        <DatePicker
          className="end-date"
          selected={selectedEnd}
          onChange={(date) => {
            if (date) {
              const adjustedDate = moment(date)
                .add(moment(date).utcOffset(), "minutes")
                .toDate();
              onEndDateChange(adjustedDate);
              setSelectedEnd(adjustedDate);
              // console.log("Adjusted End Date:", adjustedDate);
            } else {
              onEndDateChange(null);
            }
          }}
          selectsEnd
          startDate={selectedStart}
          endDate={selectedEnd}
          minDate={selectedStart}
          inline
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
