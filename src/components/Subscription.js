import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSubscribe } from "../reducers/feedsReducer";
export default function Subscription({ subscription }) {
  const [showButton, setShowButton] = useState(false);
  const dispatch = useDispatch();
  return (
    <div
      className="w-full flex justify-between border-b py-4 px-6"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <Link to={{ pathname: "/feed/" + subscription._id }}>
        <img
          src={subscription.meta.image.url}
          alt={subscription.meta.title}
          className="w-12 rounded-md"
        />
      </Link>

      <div className="pl-4 flex flex-1 flex-col justify-center subscriptions-between gap-1">
        <Link to={{ pathname: "/feed/" + subscription.id, subscription }}>
          <p className="text-sm">{subscription.meta.title}</p>
        </Link>
        <span className="text-xs">{subscription.meta.author}</span>
      </div>
      <div
        className={"subscriptions-center flex " + (showButton ? "" : "hidden")}
      >
        <button
          onClick={() => dispatch(toggleSubscribe(subscription._id))}
          className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-500 text-sm"
        >
          unsubscribe
        </button>
      </div>
    </div>
  );
}
