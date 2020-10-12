import React from "react";
import Subscription from "./Subscription";
export default function Subscriptions({ subscriptions }) {
  return (
    <div className="flex w-full mt-4 flex-wrap overflow-y-auto">
      {subscriptions.length === 0 ? (
        <p className="text-center w-full">You have no subscriptions</p>
      ) : (
        subscriptions.map((subscription) => {
          return (
            <Subscription key={subscription._id} subscription={subscription} />
          );
        })
      )}
    </div>
  );
}
