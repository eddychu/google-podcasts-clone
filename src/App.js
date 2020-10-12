import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "./components/Drawer";
import Head from "./components/Head";
import Subscriptions from "./components/Subscriptions";
import Podcast from "./components/Podcast";
import Explore from "./components/Explore";
import Player from "./components/Player";
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const player = useSelector((state) => state.player);
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  return (
    <Router>
      <div className="flex w-full items-center p-0 m-0 flex-col items-center font-sans text-gray-800">
        <Drawer open={isDrawerOpen} onClose={toggleDrawer} />
        <Head onMenuClicked={toggleDrawer} />

        <Switch>
          <div className="flex flex-wrap mt-2" style={{ width: "600px" }}>
            <Route exact path="/feed/:id">
              <Podcast player={player} />
            </Route>
            <Route exact path="/subscriptions">
              <Subscriptions subscriptions={subscriptions} />
            </Route>
            <Route exact path="/">
              <Explore />
            </Route>
          </div>
        </Switch>

        {player.episode && <Player {...player} />}
      </div>
    </Router>
  );
}

export default App;
