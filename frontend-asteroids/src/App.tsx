import React from "react";
import HeaderAsteroids from "./components/Header";
import Asteroids from "./components/Asteroids";

function App() {
  return (
    <div className="ui container mt-40">
      <HeaderAsteroids />
      <Asteroids />
    </div>
  );
}

export default App;
