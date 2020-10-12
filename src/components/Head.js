import React from "react";
import { FaBars } from "react-icons/fa";

import { useHistory } from "react-router-dom";

export default function Head({ onMenuClicked }) {
  const history = useHistory();

  const redirect = () => {
    history.push("/");
  };

  return (
    <div className="flex w-full items-center py-2 mt-2">
      <span className="w-1/4 justify-self-start flex items-center">
        <span className="ml-4 hover:bg-gray-100 p-2 rounded-full cursor-pointer">
          <FaBars onClick={onMenuClicked} />
        </span>
        <span
          className="pl-2 font-extrabold hidden sm:flex cursor-pointer"
          onClick={redirect}
        >
          Echo Podcast
        </span>
      </span>
    </div>
  );
}
