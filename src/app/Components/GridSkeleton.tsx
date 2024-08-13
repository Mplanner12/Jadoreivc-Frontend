import React, { CSSProperties } from "react";

const GridSkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-4 p-4">
      {/* Loader Items */}
      {Array(count)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 animate-pulse rounded-3xl h-48"
          />
        ))}
    </div>
  );
};

export default GridSkeletonLoader;
