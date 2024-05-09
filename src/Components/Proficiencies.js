import { Component } from "react";
import Loading from "./Loading";
import getData from "../Helpers/GetAPIFunc";
import Skill from "./Skill";
import "../Styles/Proficiencies.scss";

class Proficiencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      backgroundInfo: "",
      skills: [],
      prof_list: [],
      selectedProfs: {},
      prof_choices: {},
      stats: props.stats,
      profBonus: props.profBonus,
      toDisable: false,
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
      profOpitons: this.props.prof_choices[0].from.options,
      profNumb: this.props.prof_choices[0].choose,
    });
  }

  handleProfSelection = (prof, isSelected) => {
    this.setState((prevState) => ({
      selectedProfs: { ...prevState.selectedProfs, [prof]: isSelected },
    }));
  };

  onProfSelect = (index, checked) => {
    console.log(index, checked);
    if (checked === true) {
      this.setState({ profNumb: this.state.profNumb - 1 }, () => {
        if (this.state.profNumb === 0) {
          this.setState({ toDisable: true });
        }
      });
    } else {
      this.setState({ profNumb: this.state.profNumb + 1 });
    }
  };

  render() {
    var {
      isLoaded,
      prof_list,
      skills,
      selectedProfs,
      profOpitons,
      profNumb,
      toDisable,
    } = this.state;
    if (!isLoaded) {
      return <Loading />;
    } else {
      console.log(this.props.prof_choices);
      console.log("choose ", profNumb, " from ", profOpitons);

      return (
        <div className="proficiences">
          <h3>Proficiency Bonus: {this.state.profBonus}</h3>
          <h3>Saving Throws:</h3>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <strong>STR: </strong>
              {this.state.stats[0] +
                (JSON.stringify(prof_list).indexOf("str") > -1 &&
                  this.state.profBonus) >=
                0 && "+"}
              {this.state.stats[0] +
                (JSON.stringify(prof_list).indexOf("str") > -1 &&
                  this.state.profBonus)}
            </li>
            <li>
              {" "}
              <strong>DEX: </strong>
              {this.state.stats[1] +
                (JSON.stringify(prof_list).indexOf("dex") > -1 &&
                  this.state.profBonus) >=
                0 && "+"}
              {this.state.stats[1] +
                (JSON.stringify(prof_list).indexOf("dex") > -1 &&
                  this.state.profBonus)}
            </li>
            <li>
              {" "}
              <strong>CON: </strong>
              {this.state.stats[2] +
                (JSON.stringify(prof_list).indexOf("con") > -1 &&
                  this.state.profBonus) >=
                0 && "+"}
              {this.state.stats[2] +
                (JSON.stringify(prof_list).indexOf("con") > -1 &&
                  this.state.profBonus)}
            </li>
            <li>
              {" "}
              <strong>INT: </strong>
              {this.state.stats[3] +
                (JSON.stringify(prof_list).indexOf("int") > -1 &&
                  this.state.profBonus) >=
                0 && "+"}
              {this.state.stats[3] +
                (JSON.stringify(prof_list).indexOf("int") > -1 &&
                  this.state.profBonus)}
            </li>
            <li>
              {" "}
              <strong>WIS: </strong>
              {this.state.stats[4] +
                (JSON.stringify(prof_list).indexOf("wis") > -1 &&
                  this.state.profBonus) >=
                0 && "+"}
              {this.state.stats[4] +
                (JSON.stringify(prof_list).indexOf("wis") > -1 &&
                  this.state.profBonus)}
            </li>
            <li>
              {" "}
              <strong>CHA: </strong>
              {this.state.stats[5] +
                (JSON.stringify(prof_list).indexOf("cha") > -1 &&
                  this.state.profBonus) >=
                0 && "+"}
              {this.state.stats[5] +
                (JSON.stringify(prof_list).indexOf("cha") > -1 &&
                  this.state.profBonus)}
            </li>
          </ul>

          <h3>Skills</h3>
          {profNumb > 0 && <h4>Select {profNumb} of the Following</h4>}
          <ul style={{ listStyleType: "none" }}>
            {skills &&
              prof_list &&
              JSON.stringify(prof_list) !== null &&
              skills.map((skill) => (
                <Skill
                  url={skill.url}
                  stats={this.state.stats}
                  isProf={JSON.stringify(prof_list).indexOf(skill.index) > -1}
                  profMod={this.state.profBonus}
                  key={skill.index + "_key"}
                  profOpitons={this.state.prof_choices}
                  isSelected={selectedProfs[skill.index]}
                  onProfSelect={this.onProfSelect}
                  profNumb={profNumb}
                  disabled={toDisable}
                />
              ))}
          </ul>
        </div>
      );
    }
  }
}
export default Proficiencies;
