import { Component } from "react";
import getData from "../Helpers/GetAPIFunc";
import Loading from "./Loading";
import "../Styles/NewChar.scss";
import DropdownSimp from "../Helpers/DropdownSimp";
import Proficiencies from "./Proficiencies";

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
      profBonus: [
        0, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
      ],
    };
  }

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
        let apiStats = this.state.itemsRace.ability_bonuses;
        for (var i = 0; i < apiStats.length; i++) {
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
    this.setState({ level: selectedLevel }, () =>
      console.log(this.state.level)
    );
  };

  handleStatSelect = (stat) => {
    const statEl = document.getElementById(stat + "_select");
    var indexofSel = this.state.pointArr.indexOf(parseInt(statEl.value));
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
      profBonus,
    } = this.state;
    if (!isLoaded) {
      return <Loading />;
    } else {
      let lvlArr = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ];

      console.log(itemsClass);
      console.log(itemsRace);
      // AC
      // Max HP
      // Initiative
      // Vision
      // Features and Traits
      // Attacks
      // Spellcasting
      // Inventory
      return (
        <div className="charContainer">
          <span>
            <h1 className="charText">
              <input className="charName" placeholder="Character Name"></input>{" "}
              is a Level{" "}
              {(str === 0 ||
                dex === 0 ||
                con === 0 ||
                int === 0 ||
                wis === 0 ||
                cha === 0) && (
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
                </select>
              )}
              {str !== 0 &&
                dex !== 0 &&
                con !== 0 &&
                int !== 0 &&
                wis !== 0 &&
                cha !== 0 && <span>{level}</span>}{" "}
              {itemsRace.name} {itemsClass.name}
            </h1>
          </span>
          <div className="stats">
            <div className="abilityScores">
              <div
                className="abilityScore"
                onChange={() => this.handleStatSelect("str")}
              >
                <h3 className="abilitySpan">
                  <span className="abilityName">STR</span>
                  <span className="abilitySelector">
                    {str === 0 && (
                      <DropdownSimp
                        id="str_select"
                        placeholder={"Strength Score"}
                        options={pointArr}
                        value={str}
                      />
                    )}
                    {str === 0 && strB !== 0 && (
                      <p className="attrBonus">+ {strB}</p>
                    )}{" "}
                  </span>
                  {str !== 0 && (
                    <h4 className="abilityMod">
                      {strMod >= 0 && "+"}
                      {strMod}
                    </h4>
                  )}
                  {str !== 0 && <span className="abilityValue">{str}</span>}
                </h3>
              </div>
              <div className="abilityScore">
                <h3
                  className="abilitySpan"
                  onChange={() => this.handleStatSelect("dex")}
                >
                  <span className="abilityName">DEX</span>
                  <span className="abilitySelector">
                    {dex === 0 && (
                      <DropdownSimp
                        id="dex_select"
                        placeholder={"Dexterity Score"}
                        options={pointArr}
                        value={dex}
                      />
                    )}{" "}
                    {dex === 0 && dexB !== 0 && (
                      <p className="attrBonus">+ {dexB}</p>
                    )}{" "}
                  </span>
                  {dex !== 0 && (
                    <h4 className="abilityMod">
                      {dexMod >= 0 && "+"}
                      {dexMod}
                    </h4>
                  )}
                  {dex !== 0 && <span className="abilityValue">{dex}</span>}
                </h3>
              </div>
              <div className="abilityScore">
                <h3
                  className="abilitySpan"
                  onChange={() => this.handleStatSelect("con")}
                >
                  <span className="abilityName">CON</span>
                  <span className="abilitySelector">
                    {con === 0 && (
                      <DropdownSimp
                        id="con_select"
                        placeholder={"Constitution Score"}
                        options={pointArr}
                        value={con}
                      />
                    )}{" "}
                    {con === 0 && conB !== 0 && (
                      <p className="attrBonus">+ {conB}</p>
                    )}{" "}
                  </span>
                  {con !== 0 && (
                    <h4 className="abilityMod">
                      {conMod >= 0 && "+"}
                      {conMod}
                    </h4>
                  )}
                  {con !== 0 && <span className="abilityValue">{con}</span>}
                </h3>
              </div>
              <div className="abilityScore">
                <h3
                  className="abilitySpan"
                  onChange={() => this.handleStatSelect("int")}
                >
                  <span className="abilityName">INT</span>
                  <span className="abilitySelector">
                    {int === 0 && (
                      <DropdownSimp
                        id="int_select"
                        placeholder={"Intelligence Score"}
                        options={pointArr}
                        value={int}
                      />
                    )}
                    {int === 0 && intB !== 0 && (
                      <p className="attrBonus">+ {intB}</p>
                    )}{" "}
                  </span>
                  {int !== 0 && (
                    <h4 className="abilityMod">
                      {intMod >= 0 && "+"}
                      {intMod}
                    </h4>
                  )}
                  {int !== 0 && <span className="abilityValue">{int}</span>}
                </h3>
              </div>
              <div className="abilityScore">
                <h3
                  className="abilitySpan"
                  onChange={() => this.handleStatSelect("wis")}
                >
                  <span className="abilityName">WIS</span>
                  <span className="abilitySelector">
                    {wis === 0 && (
                      <DropdownSimp
                        id="wis_select"
                        placeholder={"Wisdom Score"}
                        options={pointArr}
                        value={wis}
                      />
                    )}
                    {wis === 0 && wisB !== 0 && (
                      <p className="attrBonus">+ {wisB}</p>
                    )}{" "}
                  </span>
                  {wis !== 0 && (
                    <h4 className="abilityMod">
                      {wisMod >= 0 && "+"}
                      {wisMod}
                    </h4>
                  )}
                  {wis !== 0 && <span className="abilityValue">{wis}</span>}
                </h3>
              </div>
              <div className="abilityScore">
                <h3
                  className="abilitySpan"
                  onChange={() => this.handleStatSelect("cha")}
                >
                  <span className="abilityName">CHA</span>
                  <span className="abilitySelector">
                    {cha === 0 && (
                      <DropdownSimp
                        id="cha_select"
                        placeholder={"Charisma Score"}
                        options={pointArr}
                        value={cha}
                      />
                    )}
                    {cha === 0 && chaB !== 0 && (
                      <p className="attrBonus">+{chaB}</p>
                    )}{" "}
                  </span>
                  {cha !== 0 && (
                    <h4 className="abilityMod">
                      {chaMod >= 0 && "+"}
                      {chaMod}
                    </h4>
                  )}
                  {cha !== 0 && <span className="abilityValue">{cha}</span>}
                </h3>
              </div>
            </div>
            {str !== 0 &&
              dex !== 0 &&
              con !== 0 &&
              int !== 0 &&
              wis !== 0 &&
              cha !== 0 && (
                <Proficiencies
                  backgroundUrl="/api/backgrounds/acolyte"
                  race_profs={itemsRace.starting_proficiencies}
                  class_profs={itemsClass.proficiencies}
                  prof_choices={itemsClass.proficiency_choices}
                  stats={[
                    this.state.modArr[str],
                    this.state.modArr[dex],
                    this.state.modArr[con],
                    this.state.modArr[int],
                    this.state.modArr[wis],
                    this.state.modArr[cha],
                  ]}
                  profBonus={profBonus[level]}
                />
              )}
          </div>
          <div className="feats_traits">
            <div className="abilitySpan">
              <span className="abilityName">Speed</span>
              <h4 className="abilityMod">{itemsRace.speed}</h4>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default NewChar;
