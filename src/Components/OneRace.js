import React, { Component } from "react";
import Loading from "./Loading";
import getData from "../Helpers/GetAPIFunc";
import SingleTrait from "./SingleTrait";
import Subrace from "./Subrace";
import "../Styles/OneRace.scss";

class OneRace extends Component {
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
      // console.log(`Race - No`);
      return <Loading />;
    } else {
      // console.log("Race - Yes");
      return (
        <div className={items.index}>
          <p className="aspect-title">
            {items &&
              items["ability_bonuses"].map((abBon) => (
                <strong>
                  {abBon.ability_score.name} +{abBon.bonus}
                  {"  "}
                </strong>
              ))}
          </p>
          <h5>
            <span className="aspect-title">Size: </span>
            {items.size}
          </h5>
          <h5>
            <span className="aspect-title">Speed: </span>
            {items.speed}ft
          </h5>
          <p>{items.age}</p>
          <p>{items.alignment}</p>
          <p>{items.language_desc}</p>
          <h4 className="aspect-title">Traits</h4>
          <ul>
            {items &&
              items.traits.map((trait) => (
                <li>
                  <SingleTrait url={trait.url} />
                </li>
              ))}
          </ul>
          {items.subraces.length !== 0 && (
            <h4 className="aspect-title">Subraces</h4>
          )}
          <ul>
            {items.subraces.length !== 0 &&
              items.subraces.map((subrace) => <Subrace url={subrace.url} />)}
          </ul>
        </div>
      );
    }
  }
}

export default OneRace;
