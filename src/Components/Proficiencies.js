import { Component } from "react";

class Proficiencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proficiencies: [],
      languages: [],
    };
  }

  componentDidMount() {
    let profs = [];
    let availableProfs = [].concat(
      this.props.background_profs,
      this.props.race_profs,
      this.props.class_profs
    );
    // console.log(this.props.languages);

    for (var i = 0; i < availableProfs.length; i++) {
      if (
        JSON.stringify(availableProfs[i].index).indexOf("skill") === -1 &&
        JSON.stringify(availableProfs[i].index).indexOf("saving") === -1
      ) {
        profs.push(availableProfs[i]);
      }
    }
    this.setState({
      proficiencies: profs,
      languages: this.props.languages,
    });
    // console.log(profs);
  }

  render() {
    var { proficiencies, languages } = this.state;
    return (
      <div>
        <h3>Proficiencies and Languages</h3>
        <ul>
          {proficiencies && proficiencies.map((prof) => <li>{prof.name}</li>)}
          {languages && languages.map((language) => <li>{language.name}</li>)}
        </ul>
      </div>
    );
  }
}
export default Proficiencies;
