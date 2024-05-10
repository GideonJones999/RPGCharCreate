import "./App.scss";
import React from "react";
import Main from "./Components/Main";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CharClasses from "./Components/CharClasses";
import Header from "./Components/Header";
import CharRaces from "./Components/CharRaces";
import NewChar from "./Components/NewChar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/classes" element={<CharClasses />} />
          <Route path="/races" element={<CharRaces />} />
          <Route
            path="peredon"
            element={
              <NewChar class={"bard"} race={"half-elf"} background="acolyte" />
            }
          />
          <Route
            path="mysterio"
            element={
              <NewChar
                class={"sorcerer"}
                race={"tiefling"}
                background="acolyte"
              />
            }
          />
          <Route
            path="xymyd"
            element={
              <NewChar
                class={"paladin"}
                race={"dragonborn"}
                background="acolyte"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
