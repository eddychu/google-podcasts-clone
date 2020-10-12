import React, { useRef } from "react";
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
  play,
  pause,
  unpause,
  changeVolume,
  toggleMute,
  changeProgress,
} from "../reducers/playerReducer";
import { trimString } from "../utils/helpers";

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
  const handleProgress = (state) => {
    dispatch(
      changeProgress(
        (state.playedSeconds / playerRef.current.getDuration()) * 100
      )
    );
    console.log(progress);
  };

  const handleProgressInput = (e) => {
    playerRef.current.seekTo(
      (e.target.value / 100) * playerRef.current.getDuration()
    );
  };

  const handleDuration = (duration) => {
    console.log(duration);
  };

  const handlePause = () => {
    dispatch(pause());
  };

  const handlePlay = () => {
    dispatch(unpause());
  };

  const togglePlay = () => {
    if (playing) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleVolumeChange = (e) => {
    dispatch(changeVolume(parseFloat(e.target.value)));
  };
  const handleBackward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10 || 0);
  };

  const handleForward = () => {
    let newPos = playerRef.current.getCurrentTime() + 10;
    if (newPos > playerRef.current.getDuration()) {
      newPos = playerRef.current.getDuration();
    }
    playerRef.current.seekTo(newPos);
  };

  const handleToggleMute = () => {
    dispatch(toggleMute());
  };

  return (
    <div className="w-full flex flex-col fixed flex inset-x-0 bottom-0 bg-gray-300  h-16">
      <input
        type="range"
        className="h-1 bg-pink-200 w-full"
        value={progress}
        onChange={handleProgressInput}
        max={100}
      ></input>
      <div className="flex">
        <div className="flex w-64 h-16 items-center pl-2 gap-1 rounded">
          <img src={episode.image?.url} className="w-8 h-8" />
          <p className="text-xs">{trimString(episode.title, 20)}</p>
        </div>
        <div className="w-full flex justify-center gap-8 items-center">
          <FaUndo onClick={handleBackward} />

          {playing ? (
            <FaPause onClick={togglePlay} />
          ) : (
            <FaPlay onClick={togglePlay} />
          )}

          <FaRedo onClick={handleForward} />
        </div>
        <div className="items-center mr-4 flex items-center">
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
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
      </div>
    </div>
  );
}
