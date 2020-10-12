import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Drawer({ open, onClose }) {
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (open && !ref.current.contains(e.target)) {
      onClose();
    }
  };
  const getClassName = () => {
    return open ? "translate-x-0" : "-translate-x-full";
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutside, false);
      return () => {
        document.removeEventListener("click", handleClickOutside, false);
      };
    }
  }, [open]);

  return (
    <div
      ref={ref}
      className={
        "transform top-0 left-0 pl-2 w-48 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-100 z-30 " +
        getClassName()
      }
    >
      <div className="flex justify-between">
        <h1 className="text-xl pl-4 pb-6 mt-4 font-extrabold">EchoPod</h1>
        <span className="text-base mr-4 pb-6 mt-4 font-extrabold cursor-pointer">
          <FaTimes onClick={onClose} />
        </span>
      </div>

      <hr />
      <ul className="list-reset">
        <li className="border-solid border-b-2">
          <Link to="/">
            <div className="block p-4 text-grey-darker font-bold hover:bg-gray-300 text-xs sm:text-xs md:text-sm lg:text-base">
              Explore
            </div>
          </Link>
        </li>
        <li className="border-solid border-b-2">
          <Link to="/subscriptions">
            <div className="block p-4 text-grey-darker font-bold hover:bg-gray-300 text-xs sm:text-xs md:text-sm lg:text-base">
              Subscriptions
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
