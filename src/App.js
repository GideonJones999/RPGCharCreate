import "./App.scss";
import React from "react";
import Main from "./Components/Main";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CharClasses from "./Components/CharClasses";
import Header from "./Components/Header";
import CharRaces from "./Components/CharRaces";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/classes" element={<CharClasses />} />
          <Route path="/races" element={<CharRaces />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
