import feeds from "../data/feeds";

export const getAll = () => {
  return feeds;
};

export const getFeedById = (id) => {
  const index = feeds.findIndex((feed) => {
    return feed._id === id;
  });

  return index > -1 ? feeds[index] : null;
};

export const getSubscriptions = () => {
  return feeds.filter((feed) => feed.sub === true);
};
