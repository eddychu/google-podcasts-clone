import React, { useState } from "react";

import { FaBackward, FaForward } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Albums({ items }) {
  const pages = Math.ceil(items.length / 5);
  const [currentPage, setCurrentPage] = useState(0);
  const [translate, setTranslate] = useState(0);
  const moveLeft = () => {
    if (currentPage >= 1) {
      setTranslate((prev) => prev + 500);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const moveRight = () => {
    if (currentPage < pages - 1) {
      setTranslate((prev) => prev - 500);
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex items-center justify-center w-full relative">
      {currentPage > 0 && (
        <div className="cursor-pointer absolute left-0 z-10 p-2 bg-gray-200 rounded-full opacity-75">
          <FaBackward onClick={moveLeft} />
        </div>
      )}
      <div className="flex flex-no-wrap overflow-x-hidden justify-start w-full">
        {items.map((item) => (
          <div
            key={item._id}
            className="w-1/5 flex-none flex justify-center"
            style={{
              transitionProperty: "all",
              transitionDuration: "1s",
              transitionTimingFunction: "ease-in-out",
              transform: `translateX(${translate}%)`,
            }}
          >
            <Link to={{ pathname: "/feed/" + item._id }}>
              <img
                alt={item.meta.title}
                src={item.meta.image.url}
                className="rounded-md w-24 h-24 "
              />
            </Link>
          </div>
        ))}
      </div>

      {currentPage < pages - 1 && (
        <div className="cursor-pointer absolute right-0 z-10 p-2 bg-gray-200 rounded-full opacity-75">
          <FaForward onClick={moveRight} />
        </div>
      )}
    </div>
  );
}
