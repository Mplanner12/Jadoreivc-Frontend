import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PaginationButtons: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex gap-2">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-yellow-500 hover:bg-gray-600 text-gray-800 rounded-full font-bold py-2 px-4 inline-flex items-center"
        style={{
          // Override styles here if needed
          backgroundColor: "your-desired-background-color",
          color: "your-desired-text-color",
        }}
      >
        <FaArrowLeft />
      </button>

      {/* Page Number Buttons */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`bg-yellow-500 hover:bg-gray-500 text-gray-800 rounded-full font-bold py-2 px-4 inline-flex items-center ${
              currentPage === page
                ? "bg-orange-600 hover:bg-orange-600 text-white"
                : ""
            }`}
            style={{
              // Override styles here if needed
              backgroundColor: "your-desired-background-color",
              color: "your-desired-text-color",
            }}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-yellow-400 hover:bg-gray-500 text-gray-800 rounded-full font-bold py-2 px-4 inline-flex items-center"
        style={{
          // Override styles here if needed
          backgroundColor: "your-desired-background-color",
          color: "your-desired-text-color",
        }}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default PaginationButtons;
