import { configureStore } from "@reduxjs/toolkit";
import feedsReducer from "./reducers/feedsReducer";
import playerReducer from "./reducers/playerReducer";

const store = configureStore({
  reducer: {
    player: playerReducer,
    feeds: feedsReducer,
  },
});
export default store;
