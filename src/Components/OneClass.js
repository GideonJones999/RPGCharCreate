import React, { Component } from "react";
import Loading from "./Loading";
import getData from "../Helpers/GetAPIFunc";

class OneClass extends Component {
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
        <div className={items.index}>
          <h5 className="aspect-title">Hit Dice: 1d{items["hit_die"]}</h5>
          <h4 className="aspect-title">Proficiencies</h4>
          <ul>
            {items &&
              items.proficiencies.map((proficiency) => (
                <li>{proficiency.name}</li>
              ))}
            <h5>
              And choose {items["proficiency_choices"][0].choose} of the
              following
            </h5>
            {items &&
              items["proficiency_choices"][0].from.options.map((option) => (
                <li>{option.item.name}</li>
              ))}
          </ul>
          <h4 className="aspect-title">Starting Equipment</h4>
          <ul>
            {items &&
              items["starting_equipment"].map((equip) => (
                <li>
                  {equip.equipment.name} x {equip.quantity}
                </li>
              ))}
            <h5>And Choose from the Following:</h5>
            {items &&
              items["starting_equipment_options"].map((option) => (
                <li>{option.desc}</li>
              ))}
          </ul>
        </div>
      );
    }
  }
}
export default OneClass;
