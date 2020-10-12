import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Albums from "./Albums";
import { getAllFeeds } from "../reducers/feedsReducer";
export default function Explore() {
  const feeds = useSelector((state) => state.feeds);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFeeds());
  });
  return (
    <div className="flex flex-col w-full">
      <div className="mt-6">
        <p className="pl-6 mb-2">Top Podcasts</p>
        <Albums items={feeds} />
      </div>
    </div>
  );
}
