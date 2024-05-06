import React, { Component } from "react";
import getData from "../Helpers/GetAPIFunc";
import Loading from "./Loading";
import OneRace from "./OneRace";
import Accordion from "../Helpers/Accordion";

class CharRaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  async componentDidMount() {
    const json = await getData("/api/races");
    this.setState({
      isLoaded: true,
      items: json.results,
    });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        <div className="CharRaces">
          <ul>
            {items &&
              items.map((item) => (
                <li key={"li_" + item.index}>
                  <Accordion
                    key={item.index}
                    title={item.name}
                    content={<OneRace url={item.url} />}
                  />
                </li>
              ))}
          </ul>
        </div>
      );
    }
  }
}

export default CharRaces;
