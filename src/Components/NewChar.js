import { Component } from "react";
import getData from "../Helpers/GetAPIFunc";
import Loading from "./Loading";
import "../Styles/NewChar.scss";
import DropdownSimp from "./DropdownSimp";

class NewChar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      level: 1,
      pointArr: [15, 14, 13, 12, 10, 8],
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
      strMod: +0,
      dexMod: +0,
      conMod: +0,
      intMod: +0,
      wisMod: +0,
      chaMod: +0,
      strB: 0,
      dexB: 0,
      conB: 0,
      intB: 0,
      wisB: 0,
      chaB: 0,
      modArr: [
        0, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 5, 5,
        6, 6, 7, 7, 8, 8, 9, 9, 10,
      ],
    };
  }

  // 1: -5
  // 2-3: -4
  // 4-5: -3
  // 6-7: -2
  // 8-9: -1
  // 10-11: +0
  // 12-13: +1
  // 14-15: +2
  // 16-17: +3
  // 18-19: +4
  // 20-21: +5
  // 22-23: +6
  // 24-25: +7
  // 26-27: +8
  // 28-29: +9
  // 30: +10

  async componentDidMount() {
    const jsonClass = await getData(`/api/classes/${this.props.class}`);
    const jsonRace = await getData(`/api/races/${this.props.race}`);
    this.setState(
      {
        isLoaded: true,
        itemsClass: jsonClass,
        itemsRace: jsonRace,
      },
      () => {
        console.log("in stats :)");
        let apiStats = this.state.itemsRace.ability_bonuses;
        for (var i = 0; i < apiStats.length; i++) {
          // console.log(apiStats[i])
          switch (apiStats[i].ability_score.index) {
            case "str":
              this.setState({ strB: apiStats[i].bonus });
              break;
            case "dex":
              this.setState({ dexB: apiStats[i].bonus });
              break;
            case "con":
              this.setState({ conB: apiStats[i].bonus });
              break;
            case "int":
              this.setState({ intB: apiStats[i].bonus });
              break;
            case "wis":
              this.setState({ wisB: apiStats[i].bonus });
              break;
            case "cha":
              this.setState({ chaB: apiStats[i].bonus });
              break;
            default:
              break;
          }
        }
      }
    );
  }

  handleLevelSelect = (e) => {
    var selectedLevel = e.target.value;
    console.log("You chose ", selectedLevel);
    this.setState({ level: selectedLevel }, () =>
      console.log(this.state.level)
    );
  };

  handleStatSelect = (stat) => {
    console.log(stat);
    const statEl = document.getElementById(stat + "_select");
    console.log("Selected ", statEl.value);
    var indexofSel = this.state.pointArr.indexOf(parseInt(statEl.value));
    console.log("Index: ", indexofSel);
    switch (stat) {
      case "str":
        this.setState({
          str: parseInt(statEl.value) + parseInt(this.state.strB),
          strMod:
            this.state.modArr[
              parseInt(statEl.value) + parseInt(this.state.strB)
            ],
        });
        break;
      case "dex":
        this.setState({
          dex: parseInt(statEl.value) + parseInt(this.state.dexB),
          dexMod:
            this.state.modArr[
              parseInt(statEl.value) + parseInt(this.state.dexB)
            ],
        });
        break;
      case "con":
        this.setState({
          con: parseInt(statEl.value) + parseInt(this.state.conB),
          conMod:
            this.state.modArr[
              parseInt(statEl.value) + parseInt(this.state.conB)
            ],
        });
        break;
      case "int":
        this.setState({
          int: parseInt(statEl.value) + parseInt(this.state.intB),
          intMod:
            this.state.modArr[
              parseInt(statEl.value) + parseInt(this.state.intB)
            ],
        });
        break;
      case "wis":
        this.setState({
          wis: parseInt(statEl.value) + parseInt(this.state.wisB),
          wisMod:
            this.state.modArr[
              parseInt(statEl.value) + parseInt(this.state.wisB)
            ],
        });
        break;
      case "cha":
        this.setState({
          cha: parseInt(statEl.value) + parseInt(this.state.chaB),
          chaMod:
            this.state.modArr[
              parseInt(statEl.value) + parseInt(this.state.chaB)
            ],
        });
        break;
      default:
        break;
    }

    if (indexofSel > -1) {
      var newPointArr = this.state.pointArr;
      newPointArr.splice(indexofSel, 1);
    }
    this.setState({ pointArr: newPointArr }, () => {
      console.log("State Arr: ", this.state.pointArr);
    });
  };

  render() {
    var {
      isLoaded,
      itemsClass,
      itemsRace,
      level,
      pointArr,
      str,
      dex,
      con,
      int,
      wis,
      cha,
      strMod,
      dexMod,
      conMod,
      intMod,
      wisMod,
      chaMod,
      strB,
      dexB,
      conB,
      intB,
      wisB,
      chaB,
    } = this.state;
    if (!isLoaded) {
      return <Loading />;
    } else {
      console.log(itemsRace);
      console.log(itemsClass);
      let lvlArr = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ];

      return (
        <div className="charContainer">
          <span>
            <h1 className="charText">
              <input className="charName" placeholder="Character Name"></input>{" "}
              is a Level{" "}
              <select
                className="charLevel"
                defaultValue={level}
                name={"CharLvl"}
                id={"CharLvl"}
                onChange={this.handleLevelSelect}
              >
                {lvlArr &&
                  lvlArr.map((lvl) => (
                    <option value={lvl} key={"lvl" + lvl}>
                      {lvl}
                    </option>
                  ))}
              </select>{" "}
              {itemsRace.name} {itemsClass.name}
            </h1>
          </span>
          <div className="abilityScores">
            <div className="abilityScore">
              <h3
                className="abilitySpan"
                onChange={() => this.handleStatSelect("str")}
              >
                <span className="abilityName">STR:</span>
                <span className="abilitySelector">
                  {str === 0 && (
                    <DropdownSimp
                      id="str_select"
                      placeholder={"Strength Score"}
                      options={pointArr}
                      value={str}
                    />
                  )}
                  {str === 0 && strB !== 0 && <p>+ {strB}</p>}{" "}
                </span>
                {str !== 0 && <h4 className="abilityMod">{strMod}</h4>}
                {str !== 0 && <span className="abilityValue">{str}</span>}
              </h3>
            </div>
            <div className="abilityScore">
              <h3
                className="abilitySpan"
                onChange={() => this.handleStatSelect("dex")}
              >
                <span className="abilityName">DEX:</span>
                <span className="abilitySelector">
                  {dex === 0 && (
                    <DropdownSimp
                      id="dex_select"
                      placeholder={"Dexterity Score"}
                      options={pointArr}
                      value={dex}
                    />
                  )}{" "}
                  {dex === 0 && dexB !== 0 && <p>+ {dexB}</p>}{" "}
                </span>
                {dex !== 0 && <h4 className="abilityMod">{dexMod}</h4>}
                {dex !== 0 && <span className="abilityValue">{dex}</span>}
              </h3>
            </div>
            <div className="abilityScore">
              <h3
                className="abilitySpan"
                onChange={() => this.handleStatSelect("con")}
              >
                <span className="abilityName">CON:</span>
                <span className="abilitySelector">
                  {con === 0 && (
                    <DropdownSimp
                      id="con_select"
                      placeholder={"Constitution Score"}
                      options={pointArr}
                      value={con}
                    />
                  )}{" "}
                  {con === 0 && conB !== 0 && <p>+ {conB}</p>}{" "}
                </span>
                {con !== 0 && <h4 className="abilityMod">{conMod}</h4>}
                {con !== 0 && <span className="abilityValue">{con}</span>}
              </h3>
            </div>
            <div className="abilityScore">
              <h3
                className="abilitySpan"
                onChange={() => this.handleStatSelect("int")}
              >
                <span className="abilityName">INT:</span>
                <span className="abilitySelector">
                  {int === 0 && (
                    <DropdownSimp
                      id="int_select"
                      placeholder={"Intelligence Score"}
                      options={pointArr}
                      value={int}
                    />
                  )}
                  {int === 0 && intB !== 0 && <p>+ {intB}</p>}{" "}
                </span>
                {int !== 0 && <h4 className="abilityMod">{intMod}</h4>}
                {int !== 0 && <span className="abilityValue">{int}</span>}
              </h3>
            </div>
            <div className="abilityScore">
              <h3
                className="abilitySpan"
                onChange={() => this.handleStatSelect("wis")}
              >
                <span className="abilityName">WIS:</span>
                <span className="abilitySelector">
                  {wis === 0 && (
                    <DropdownSimp
                      id="wis_select"
                      placeholder={"Wisdom Score"}
                      options={pointArr}
                      value={wis}
                    />
                  )}
                  {wis === 0 && wisB !== 0 && <p>+ {wisB}</p>}{" "}
                </span>
                {wis !== 0 && <h4 className="abilityMod">{wisMod}</h4>}
                {wis !== 0 && <span className="abilityValue">{wis}</span>}
              </h3>
            </div>
            <div className="abilityScore">
              <h3
                className="abilitySpan"
                onChange={() => this.handleStatSelect("cha")}
              >
                <span className="abilityName">CHA:</span>
                <span className="abilitySelector">
                  {cha === 0 && (
                    <DropdownSimp
                      id="cha_select"
                      placeholder={"Charisma Score"}
                      options={pointArr}
                      value={cha}
                    />
                  )}
                  {cha === 0 && chaB !== 0 && <p>+ {chaB}</p>}{" "}
                </span>
                {cha !== 0 && <h4 className="abilityMod">{chaMod}</h4>}
                {cha !== 0 && <span className="abilityValue">{cha}</span>}
              </h3>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default NewChar;
