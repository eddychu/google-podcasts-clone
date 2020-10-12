import React from "react";

import DateTime from "luxon/src/datetime.js";
import { useDispatch } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { play, pause, unpause, togglePlay } from "../reducers/playerReducer";

import { FaPlay } from "react-icons/fa";

export default function Episodes({ episodes, player }) {
  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(pause());
  };

  const handlePlay = () => {
    dispatch(unpause());
  };

  const handleTogglePlay = () => {
    if (player.playing) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleStart = (episode) => {
    dispatch(play(episode));
  };

  return episodes.map((episode) => (
    <div
      className="py-4 border-b cursor-pointer"
      key={episode.pubDate}
      onClick={() => handleStart(episode)}
    >
      <span className="text-xs text-gray-500 mt-1">
        {DateTime.fromISO(episode.pubDate).toLocaleString(
          DateTime.DATETIME_MED
        )}
      </span>
      <h3 className="text-sm font-bold mt-1 text-gray-700">{episode.title}</h3>
      <p
        className="text-sm mt-1"
        dangerouslySetInnerHTML={{ __html: episode.summary }}
      ></p>

      <div className="mt-2">
        <div className="w-24 justify-center items-center flex text-sm font-bold text-gray-700 p-1  border-2 border-solid border-gray-500 rounded-full ">
          <div onClick={handleTogglePlay}>
            {player.playing && player.episode == episode ? (
              <div className="w-6 h-6">
                <CircularProgressbar
                  value={player.progress}
                  onClick={handlePause}
                />
              </div>
            ) : (
              <FaPlay className="ml-2" size={16} />
            )}
          </div>

          <div className="ml-1">{parseInt(episode.duration / 60) + " min"}</div>
        </div>
      </div>
    </div>
  ));
}
