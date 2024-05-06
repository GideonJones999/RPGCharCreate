import React, { Component } from "react";
import Loading from "./Loading";
import getData from "../Helpers/GetAPIFunc";
import "../Styles/OneRace.scss";

class SingleTrait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  async componentDidMount() {
    const json = await getData(this.props.url);
    this.setState({
      isLoaded: true,
      items: json,
    });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        <p>
          <span className="aspect-title">
            {" "}
            <strong>{items.name}:</strong>
          </span>{" "}
          {items.desc}
        </p>
      );
    }
  }
}
export default SingleTrait;
