import { Component } from "react";
import getData from "../Helpers/GetAPIFunc";

class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      stats: props.stats,
      skillData: {},
      profModifier: props.profMod,
      modifier: 0,
      abilityType: "",
      profOptions: props.profOptions,
      isSelected: false,
    };
  }

  async componentDidMount() {
    const json = await getData(this.props.url);
    this.setState({ isLoaded: true, skillData: json }, () => {
      let modifierTemp = 0;
      switch (this.state.skillData.ability_score.index) {
        case "str":
          modifierTemp = this.state.stats[0];
          this.setState({ abilityType: "Str" });
          break;
        case "dex":
          modifierTemp = this.state.stats[1];
          this.setState({ abilityType: "Dex" });
          break;
        case "con":
          modifierTemp = this.state.stats[2];
          this.setState({ abilityType: "Con" });
          break;
        case "int":
          modifierTemp = this.state.stats[3];
          this.setState({ abilityType: "Int" });
          break;
        case "wis":
          modifierTemp = this.state.stats[4];
          this.setState({ abilityType: "Wis" });
          break;
        case "cha":
          modifierTemp = this.state.stats[5];
          this.setState({ abilityType: "Cha" });
          break;
        default:
          break;
      }
      if (this.state.isSelected) {
        modifierTemp += this.props.profMod;
      }
      this.setState({ modifier: modifierTemp, isSelected: this.props.isProf });
    });
  }

  handleCheckboxChange = (e) => {
    const { checked } = e.target;
    this.setState({ isSelected: checked }, () => {
      this.props.onProfSelect(this.state.skillData.index, checked);
    });
    if (checked) {
      this.setState({ modifier: this.state.modifier + this.props.profMod });
    } else {
      this.setState({ modifier: this.state.modifier - this.props.profMod });
    }
    if (this.props.profNumb === 0) {
      console.log(this.props.profNumb);
      // this.setState({ isOption: false });
    }
  };

  render() {
    var { skillData, modifier, isSelected, abilityType } = this.state;
    let isOption =
      JSON.stringify(this.props.profOpitons).indexOf(skillData.index) > -1;

    return (
      <div className="skill">
        {skillData && (
          <p>
            <input
              onChange={this.handleCheckboxChange}
              type="checkbox"
              checked={isSelected}
              value={modifier}
              key={"skill_" + skillData.index}
              disabled={!isOption || this.props.disabled}
              id={"skill_" + skillData.index}
            ></input>
            <li>
              <strong>
                {modifier >= 0 && "+"}
                {modifier} {skillData.name}
              </strong>{" "}
              ({abilityType})
            </li>
          </p>
        )}
      </div>
    );
  }
}
export default Skill;
