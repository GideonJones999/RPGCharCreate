import React, { Component } from "react";
import CharRaces from "./CharRaces";
import CharClasses from "./CharClasses";
import NewChar from "./NewChar";
import MakeSelect from "./MakeSelect";
import { playerClass, playerRace } from "../Helpers/GlobalVars";
import "../Styles/Main.scss";

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
      this.setState({ raceSelect: true }, () => this.checkAllSelect());
    } else if (objClicked === "c") {
      this.setState({ classSelect: true }, () => this.checkAllSelect());
    }
  };

  checkAllSelect = () => {
    var { raceSelect, classSelect } = this.state;
    if (raceSelect && classSelect) {
      this.setState({ allSelect: true }, () => {
        const newCharEl = document.getElementById("abilitySelector");
        if (!newCharEl) return;
        window.scroll({ top: newCharEl.offsetTop - 500, behavior: "smooth" });
      });
    }
  };

  render() {
    var { allSelect } = this.state;
    return (
      <div className="App-body">
        {!allSelect && (
          <span className="info">
            <div className="char-race">
              <h2>Character Race</h2>
              {this.state.allSelect === false && (
                <span onChange={() => this.handleClick("r")}>
                  <MakeSelect
                    url="/api/races"
                    id="selectRace"
                    placeholder="Select your Race"
                  />
                </span>
              )}

              <CharRaces />
            </div>
            <div className="char-class">
              <h2>Character Class</h2>
              {this.state.allSelect === false && (
                <span onChange={() => this.handleClick("c")}>
                  <MakeSelect
                    url="/api/classes"
                    id="selectClass"
                    placeholder="Select your Class"
                  />
                </span>
              )}
              <CharClasses />
            </div>
          </span>
        )}
        <div id="NewChar_container">
          {allSelect && <NewChar class={playerClass} race={playerRace} background="acolyte"/>}
        </div>
      </div>
    );
  }
}

export default Main;
