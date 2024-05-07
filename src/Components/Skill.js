import { Component } from "react";
import getData from "../Helpers/GetAPIFunc";
import "../Styles/NewChar.scss"

class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      stats: props.stats,
      skillData: {},
      isProficient: props.isProf,
      profModifier: props.profMod,
      modifier: 0,
      abilityType: "",
    };
  }

  async componentDidMount() {
    const json = await getData(this.props.url);
    this.setState({ isLoaded: true, skillData: json }, () => {
      let modifierTemp = 0;
      switch (this.state.skillData.ability_score.index) {
        case "str":
          modifierTemp = this.state.stats[0];
          this.setState({ abilityType: "str" });
          break;
        case "dex":
          modifierTemp = this.state.stats[1];
          this.setState({ abilityType: "dex" });
          break;
        case "con":
          modifierTemp = this.state.stats[2];
          this.setState({ abilityType: "con" });
          break;
        case "int":
          modifierTemp = this.state.stats[3];
          this.setState({ abilityType: "int" });
          break;
        case "wis":
          modifierTemp = this.state.stats[4];
          this.setState({ abilityType: "wis" });
          break;
        case "cha":
          modifierTemp = this.state.stats[5];
          this.setState({ abilityType: "cha" });
          break;
        default:
          break;
      }
      if (this.props.isProf) {
        modifierTemp += this.props.profMod;
      }
      this.setState({ modifier: modifierTemp });
    });
  }

  render() {
    var { skillData, modifier } = this.state;
    return (
      <div className="skill">
        {skillData && (
          <h4>
            {skillData.name} ({modifier})
          </h4>
        )}
      </div>
    );
  }
}
export default Skill;
