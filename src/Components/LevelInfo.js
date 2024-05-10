import { Component } from "react";
import getData from "../Helpers/GetAPIFunc";
import Loading from "./Loading";
import Trait from "./Trait";

class LevelInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      traitInfo: "",
      isLoaded: false,
    };
  }

  async componentDidMount() {
    // console.log(this.props.url);
    // console.log("Did Mount");
    const json = await getData(this.props.url);
    this.setState({ isLoaded: true, traitInfo: json });
  }

  render() {
    var { isLoaded, traitInfo } = this.state;
    var level = this.props.level;
    let levelAr = [];
    for (var i = 0; i < level; i++) {
      levelAr.push(i);
    }
    if (!isLoaded) {
      return <Loading />;
    } else if (isLoaded && traitInfo !== null) {
      return (
        <>
          <h3>Level Info</h3>
          {traitInfo &&
            levelAr.map((thisLvl) => (
              traitInfo[thisLvl].features.map((feature)=>(<Trait url={feature.url}/>))
              // <Trait url={traitInfo[thisLvl].features}/>
              // <p>{JSON.stringify(traitInfo[thisLvl].features)}</p>
            ))}
        </>
      );
    }
  }
}
export default LevelInfo;
