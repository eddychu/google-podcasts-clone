import { createSlice } from "@reduxjs/toolkit";
import { getAll } from "../api/feed-api";

const FeedsSlice = createSlice({
  name: "feeds",
  initialState: [],
  reducers: {
    getAllFeeds(state) {
      return getAll();
    },
    toggleSubscribe(state, action) {
      return state.map((feed) => {
        if (feed._id === action.payload) {
          return { ...feed, sub: !feed.sub };
        } else {
          return feed;
        }
      });
    },
    changeSort(state, action) {
      console.log(action.payload);
      return state.map((feed) => {
        if (feed._id === action.payload.id) {
          return { ...feed, sort: action.payload.sort };
        } else {
          return feed;
        }
      });
    },
  },
});

export const { getAllFeeds, toggleSubscribe, changeSort } = FeedsSlice.actions;

export default FeedsSlice.reducer;
