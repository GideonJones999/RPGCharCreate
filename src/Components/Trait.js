import { Component } from "react";
import getData from "../Helpers/GetAPIFunc";
import Loading from "./Loading";

class Trait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      traitInfo: "",
      isLoaded: false,
    };
  }
  async componentDidMount() {
    // console.log("Did Mount");
    const json = await getData(this.props.url);
    this.setState({ isLoaded: true, traitInfo: json });
    // console.log(json);
  }
  render() {
    var { isLoaded, traitInfo } = this.state;
    if (!isLoaded) {
      return <Loading />;
    }
    return (
      <>
        <h4>{traitInfo.name}</h4>
        {traitInfo.desc && traitInfo.desc.map((descP) => <p>{descP}</p>)}
      </>
    );
  }
}

export default Trait;
