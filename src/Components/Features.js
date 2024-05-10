import { Component } from "react";
import Trait from "./Trait";
import LevelInfo from "./LevelInfo";

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      background: "",
      classTraits: "",
      race: "",
    };
  }

  componentDidMount() {
    this.setState({
      background: this.props.backgroundTraits.feature,
      classTraits: this.props.classTraits,
      race: this.props.raceTraits.traits,
    });
  }

  render() {
    var { background, classTraits, race } = this.state;
    console.log(classTraits);
    return (
      <>
        <ul>
          {race && race.map((raceT) => <Trait url={raceT.url} />)}
          {background && (
            <>
              <h4>{background.name}</h4>
              {background.desc &&
                background.desc.map((descP) => <p>{descP}</p>)}
            </>
          )}
          {classTraits && this.props.level && (
            <LevelInfo
              url={classTraits.url + "/levels"}
              level={this.props.level}
            />
          )}
        </ul>
      </>
    );
  }
}
export default Features;
