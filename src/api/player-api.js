import feeds from "../data/feeds";

const getRandomFeed = () => {
  return feeds[Math.floor(Math.random() * feeds.length)];
};

export const getRandomEpisode = () => {
  let randomFeed = getRandomFeed();
  return randomFeed.episodes[
    Math.floor(Math.random() * randomFeed.episodes.length)
  ];
};
