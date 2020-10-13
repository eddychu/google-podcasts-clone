import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import {
  FaUndo,
  FaPause,
  FaPlay,
  FaRedo,
  FaVolumeDown,
  FaVolumeOff,
  FaVolumeUp,
} from "react-icons/fa";
import {
  pause,
  unpause,
  changeVolume,
  toggleMute,
  changeProgress,
  setDuration,
} from "../reducers/playerReducer";
import { trimString, formatDuration } from "../utils/helpers";

export default function Player({
  episode,
  playing,
  volume,
  duration,
  progress,
  mute,
}) {
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const handleProgressInput = (e) => {
    dispatch(changeProgress(e.target.value));
  };

  const handleDuration = (duration) => {
    dispatch(setDuration(duration));
  };

  const handlePause = () => {
    dispatch(pause(playerRef.current.getCurrentTime()));
  };

  const handlePlay = () => {
    dispatch(unpause());
  };

  const handleVolumeChange = (e) => {
    dispatch(changeVolume(parseFloat(e.target.value)));
  };

  const handleBackward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    dispatch(changeProgress(currentTime - 10 || 0));
  };

  const handleForward = () => {
    let newTime = playerRef.current.getCurrentTime() + 10;
    if (newTime > duration) {
      newTime = duration;
    }
    dispatch(changeProgress(newTime));
  };

  const handleToggleMute = () => {
    dispatch(toggleMute());
  };

  useEffect(() => {
    if (playerRef.current && duration) {
      playerRef.current.seekTo(progress);
    }
  }, [progress, duration]);

  return (
    <div className="w-full flex flex-col fixed flex inset-x-0 bottom-0 bg-gray-300  h-16">
      <input
        type="range"
        className="h-1 bg-pink-200 w-full"
        value={progress}
        // onChange={handleProgressInput}
        step={1}
        onInput={handleProgressInput}
        max={duration - 5 || 0}
      ></input>
      <div className="flex">
        <div className="flex w-64 h-16 items-center pl-2 gap-1 rounded">
          <img
            src={episode.image?.url}
            className="w-8 h-8"
            alt={episode.title}
          />
          <p className="text-xs">{trimString(episode.title, 20)}</p>
        </div>
        <div className="w-full flex justify-center gap-8 items-center">
          <FaUndo onClick={handleBackward} />

          {playing ? (
            <FaPause onClick={handlePause} />
          ) : (
            <FaPlay onClick={handlePlay} />
          )}

          <FaRedo onClick={handleForward} />
        </div>
        <div className="items-center mr-4 flex">
          <div className="w-8">
            {volume < 0.01 || mute ? (
              <FaVolumeOff onClick={handleToggleMute} />
            ) : volume < 0.3 ? (
              <FaVolumeDown onClick={handleToggleMute} />
            ) : (
              <FaVolumeUp onClick={handleToggleMute} />
            )}
          </div>
          <input
            type="range"
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.01}
          />
          <span className="ml-2">
            {formatDuration(Math.floor(progress))}/
            {formatDuration(Math.floor(duration))}
          </span>
        </div>

        <ReactPlayer
          ref={playerRef}
          className="hidden"
          url={episode.enclosure.url}
          playing={playing}
          muted={volume === 0 || mute}
          volume={volume}
          onPlay={handlePlay}
          onPause={handlePause}
          onDuration={handleDuration}
        />
      </div>
    </div>
  );
}
