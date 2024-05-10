import React, { Component } from "react";
import DropdownEquip from "../Helpers/DropdownEquip";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  render() {
    let items = this.props.equipment;
    let options = this.props.equipOptions;
    // console.log(this.props.equipment);
    console.log(options);
    return (
      <div>
        {items &&
          items.map((item) => (
            <h5>
              {item.equipment.name} ({item.quantity})
            </h5>
          ))}
        {options &&
          options.map((option) => (
            <DropdownEquip
              placeholder={option.desc}
              options={option.from.options}
              id={"equipment_" + option.desc}
            />
          ))}
      </div>
    );
  }
}
export default Inventory;
