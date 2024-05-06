import React, { Component } from "react";
import Loading from "./Loading";
import getData from "../Helpers/GetAPIFunc";
import SingleTrait from "./SingleTrait";

class Subrace extends Component {
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
    // console.log(json);
  }

  render() {
    var { isLoaded, items } = this.state;
    // console.log(items);
    if (!isLoaded) {
      // console.log(`Subrace - No`);
      return <Loading />;
    } else {
      return (
        <div>
          <p>
            <span className="aspect-title">
              <strong>{items.name}:</strong>
            </span>{" "}
            {items.desc}
          </p>
          <h4 className="aspect-title">Traits</h4>
          <ul>
            {items &&
              items.racial_traits.map((trait) => (
                <li>
                  <SingleTrait url={trait.url} />
                </li>
              ))}
          </ul>
          {items.starting_proficiencies.length !== 0 && (
            <h4>Extra Proficiencies</h4>
          )}
          <ul>
            {items &&
              items.starting_proficiencies.map((prof) => <li>{prof.name}</li>)}
          </ul>
        </div>
      );
    }
  }
}

export default Subrace;
