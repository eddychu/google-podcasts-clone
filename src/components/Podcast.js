import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaCheck, FaGlobe, FaPlus, FaSort } from "react-icons/fa";
import { getFeedById } from "../api/feed-api";
import { toggleSubscribe } from "../reducers/feedsReducer";
import Episodes from "./Episodes";
export default function Podcast({ player }) {
  const feeds = useSelector((state) => state.feeds);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [feed, setFeed] = useState(null);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    let index = feeds.findIndex((feed) => feed._id === id);
    if (index > -1) {
      setFeed(feeds[index]);
    }
  }, [feeds]);

  const handleToggleSubscribe = () => {
    dispatch(toggleSubscribe(id));
  };
  console.log(feeds);
  console.log(feed);
  return (
    feed && (
      <div className="flex flex-col">
        <div className="flex w-full flex-col">
          <div className="flex-row flex justify-between">
            <div className="my-2 flex flex-col">
              <div>
                <h1 className="text-xl font-bold">
                  {feed && feed.meta?.title}
                </h1>
                <span className="text-xs">{feed && feed.meta?.author}</span>
                <div className="my-2 flex justify-start gap-1">
                  <div
                    onClick={handleToggleSubscribe}
                    className="flex cursor-pointer items-center justify-start font-bold px-2 gap-1 bg-blue-200 rounded-full text-sm text-blue-500"
                  >
                    {feed && feed.sub ? (
                      <div className="p-1 bg-blue-500 rounded-full border-black flex justify-start items-center">
                        <FaCheck className="text-blue-700" />
                      </div>
                    ) : (
                      <div className="p-1 rounded-full border-black flex justify-start items-center">
                        <FaPlus className="text-blue-700" />
                      </div>
                    )}

                    {feed && feed.sub === true ? "Subscribed" : "Subscribe"}
                  </div>

                  <div className="flex  cursor-pointer  items-center px-1 font-bold  rounded-full text-sm text-gray-500 border-2 border-solid border-gray-200">
                    <div className="p-1 rounded-full border-black flex justify-start items-center">
                      <FaGlobe className="text-blue-700" />
                    </div>
                    Visit website
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: feed && feed.meta?.summary,
                  }}
                ></div>
              </div>
            </div>

            <img
              src={feed && feed.meta?.image?.url}
              className=" my-2 w-24 h-24 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between relative">
            <h1>Availabe Episodes</h1>

            <FaSort onClick={() => setShowSortMenu((prev) => !prev)} />
            <div
              className={
                "text-sm mt-6 right-0 z-10 bg-gray-100 shadow-lg py-2 w-32 flex flex-col gap-2 " +
                (showSortMenu ? "absolute" : "hidden")
              }
            >
              <div
                className="flex items-center pl-2 gap-2 hover:bg-gray-300 py-2"
                onClick={() => {}}
              >
                <FaCheck
                  className={
                    feed && feed.sortByNewest ? "visible" : "invisible"
                  }
                />

                <p>Newest first</p>
              </div>
              <div
                className="flex items-center gap-2 pl-2 hover:bg-gray-300 py-2"
                onClick={() => {}}
              >
                <FaCheck
                  className={
                    feed && feed.sortByNewest ? "invisible" : "visible"
                  }
                />

                <p>Oldest first</p>
              </div>
            </div>
          </div>
          {feed && <Episodes player={player} episodes={feed.episodes || []} />}
        </div>
      </div>
    )
  );
}
