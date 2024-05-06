import React, { Component } from "react";
import CharRaces from "./CharRaces";
import CharClasses from "./CharClasses";
import NewChar from "./NewChar";
import MakeSelect from "./MakeSelect";
import { playerClass, playerRace } from "../Helpers/GlobalVars";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raceSelect: false,
      classSelect: false,
      allSelect: false,
    };
  }

  handleClick = (objClicked) => {
    if (objClicked === "r") {
      // console.log("Race");
      this.setState({ raceSelect: true }, () => this.checkAllSelect());
    } else if (objClicked === "c") {
      // console.log("Class");
      this.setState({ classSelect: true }, () => this.checkAllSelect());
    }
  };

  checkAllSelect = () => {
    var { raceSelect, classSelect } = this.state;
    // console.log("Race: ", raceSelect);
    // console.log("Class: ", classSelect);
    if (raceSelect && classSelect) {
      this.setState({ allSelect: true }, () => {
        const newCharEl = document.getElementById("NewChar_container");
        if (!newCharEl) return;
        window.scroll({ top: newCharEl.offsetTop - 20, behavior: "smooth" });
      });
      // console.log("Yipee!");
    }
  };

  render() {
    var { allSelect } = this.state;
    return (
      <body className="App-body">
        <div className="char-race">
          <h2>Character Race</h2>
          <CharRaces />
          {this.state.allSelect === false && (
            <span onChange={() => this.handleClick("r")}>
              <MakeSelect
                url="/api/races"
                id="selectRace"
                placeholder="Select your Race"
              />
            </span>
          )}
        </div>
        <div className="char-class">
          <h2>Character Class</h2>
          <CharClasses />
          {this.state.allSelect === false && (
            <span onChange={() => this.handleClick("c")}>
              <MakeSelect
                url="/api/classes"
                id="selectClass"
                placeholder="Select your Class"
              />
            </span>
          )}
        </div>
        <div id="NewChar_container">
          {allSelect && <NewChar class={playerClass} race={playerRace} />}
        </div>
      </body>
    );
  }
}

export default Main;
