import { createSlice } from "@reduxjs/toolkit";
import { getAll, getFeedById } from "../api/feed-api";

const FeedsSlice = createSlice({
  name: "feeds",
  initialState: [],
  reducers: {
    getAllFeeds(state) {
      return getAll();
    },
    toggleSubscribe(state, action) {
      console.log("test");
      console.log([...state]);
      return state.map((feed) => {
        if (feed._id == action.payload) {
          return { ...feed, sub: !feed.sub };
        } else {
          return feed;
        }
      });
    },

    toggleSort(state, action) {},
  },
});

export const { getAllFeeds, toggleSubscribe } = FeedsSlice.actions;

export default FeedsSlice.reducer;
