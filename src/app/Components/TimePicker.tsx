import React, { useState } from "react";

interface TimePickerProps {
  onTimeChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange }) => {
  const times = [
    "1:00 AM",
    "1:30 AM",
    "2:00 AM",
    "2:30 AM",
    "3:00 AM",
    "3:30 AM",
    "4:00 AM",
    "4:30 AM",
    "5:00 AM",
    "5:30 AM",
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
    "12:00 AM",
  ];
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    // console.log("Time Selected:", time); // Log the selected time
    onTimeChange(time);
  };

  return (
    <div className="md:w-full md:h-fit p-1 md:p-0 pb-0 h-[27rem] max-w-md md:py-3 md:mx-auto -mt-[1rem] md:mt-0">
      {/* <h2 className="text-lg font-semibold mb-4">Select Time</h2> */}
      <div className="md:w-fit h-[25rem] md:h-[15.85rem] md:border-l-2 flex flex-col px-[1rem] space-y-1.5 overflow-y-auto">
        {times.map((time) => (
          <button
            key={time}
            className={`bg-slate-100 p-1.5 md:w-[8.5rem] rounded-xl px-[1.85rem] border ${
              selectedTime === time
                ? " text-teal-600 bg-slate-300 border-emerald-600"
                : ""
            }`}
            onClick={(e) => handleTimeChange(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
