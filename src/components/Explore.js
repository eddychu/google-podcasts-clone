import React from "react";

import Albums from "./Albums";

export default function Explore({ feeds, subscriptions }) {
  return (
    <div className="flex flex-col w-full">
      <div className="mt-6">
        <p className="pl-6 mb-2">Your Subscriptions</p>
        <Albums items={subscriptions} />
      </div>

      <div className="mt-6">
        <p className="pl-6 mb-2">Top Podcasts</p>
        <Albums items={feeds} />
      </div>
    </div>
  );
}
