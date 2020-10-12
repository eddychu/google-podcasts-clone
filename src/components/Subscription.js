import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function Subscription({ item }) {
  const [showButton, setShowButton] = useState(false);

  return (
    <div
      className="w-full flex justify-between border-b py-4 px-6"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <Link to={{ pathname: "/feed/" + item._id }}>
        <img
          src={item.meta.image.url}
          alt={item.meta.title}
          className="w-12 rounded-md"
        />
      </Link>

      <div className="pl-4 flex flex-1 flex-col justify-center items-between gap-1">
        <Link to={{ pathname: "/feed/" + item.id, item }}>
          <p className="text-sm">{item.meta.title}</p>
        </Link>
        <span className="text-xs">{item.meta.author}</span>
      </div>
      <div className={"items-center flex " + (showButton ? "" : "hidden")}>
        <button className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-500 text-sm">
          unsubscribe
        </button>
      </div>
    </div>
  );
}
