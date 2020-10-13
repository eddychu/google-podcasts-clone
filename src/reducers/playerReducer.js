import { createSlice } from "@reduxjs/toolkit";
import { getRandomEpisode } from "../api/player-api";

const defaultEpisode = getRandomEpisode();

const PlayerSlice = createSlice({
  name: "player",
  initialState: {
    episode: defaultEpisode,
    playing: false,
    volumn: 1.0,
    progress: 0,
    playback: 1.0,
    duration: 0.0,
    mute: false,
  },
  reducers: {
    play(state, action) {
      return { ...state, episode: action.payload };
    },
    pause(state, action) {
      return { ...state, playing: false, progress: action.payload };
    },
    unpause(state, action) {
      return { ...state, playing: true };
    },
    togglePlay(state, action) {
      return { ...state, playing: !state.playing };
    },
    changeVolume(state, action) {
      return { ...state, volume: action.payload };
    },

    toggleMute(state, action) {
      return { ...state, mute: !state.mute };
    },
    changeProgress(state, action) {
      return { ...state, progress: action.payload };
    },

    setDuration(state, action) {
      return { ...state, duration: action.payload };
    },
  },
});

export const {
  play,
  pause,
  togglePlay,
  unpause,
  changeVolume,
  toggleMute,
  changeProgress,
  setDuration,
} = PlayerSlice.actions;

export default PlayerSlice.reducer;
