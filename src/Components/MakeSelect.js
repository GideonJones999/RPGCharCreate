import React, { Component } from "react";
import getData from "../Helpers/GetAPIFunc";
import Loading from "./Loading";
import Dropdown from "../Helpers/Dropdown";

class MakeSelect extends Component {
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
      items: json.results,
    });
  }

  getData() {
    return this.state;
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        <span onChange={getData}>
          <Dropdown
            id={this.props.id}
            placeholder={this.props.placeholder}
            options={items}
          />
        </span>
      );
    }
  }
}

export default MakeSelect;
