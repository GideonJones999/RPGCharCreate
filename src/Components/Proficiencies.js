import { Component } from "react";
import Loading from "./Loading";
import getData from "../Helpers/GetAPIFunc";
import Skill from "./Skill";

class Proficiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      backgroundInfo: "",
      skills: [],
      prof_list: [],
      prof_choices: {},
      stats: props.stats,
      profBonus: props.profBonus,
    };
  }

  async componentDidMount() {
    const json = await getData(this.props.backgroundUrl);
    const jsonSkills = await getData("/api/skills");
    this.setState({
      isLoaded: true,
      backgroundInfo: json,
      skills: jsonSkills.results,
    });
    let all_profs = Array.prototype.concat(
      this.state.backgroundInfo.starting_proficiencies,
      this.props.race_profs,
      this.props.class_profs
    );
    this.setState({
      prof_list: all_profs,
      prof_choices: this.props.prof_choices,
    });
  }

  render() {
    var { isLoaded, prof_list, skills } = this.state;
    if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        <div className="proficiences">
          <h3>Proficiences</h3>
          {skills &&
            skills.map((skill) => (
              <Skill
                url={skill.url}
                stats={this.state.stats}
                isProf={JSON.stringify(prof_list).indexOf(skill.index) > -1}
                profMod={this.state.profBonus}
                key={skill.index + "_key"}
              />
            ))}
        </div>
      );
    }
  }
}
export default Proficiences;
