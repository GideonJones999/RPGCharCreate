import React, { useState } from "react";
import { playerClass, playerRace } from "../Helpers/GlobalVars";
import "../Styles/Dropdown.scss";

const Dropdown = ({ id, placeholder, options, action }) => {
  const [selected, setSelected] = useState();

  const handleRaceSel = (e) => {
    console.log("You chose ", e.target.value);
    setSelected(e.target.value);
    if (id === "selectRace") {
      playerRace = e.target.value;
    } else {
      playerClass = e.target.value;
    }
  };

  return (
    <div action={action} className="dropdownCont">
      <select
        defaultValue={placeholder}
        value={selected}
        name={id}
        id={id}
        onChange={handleRaceSel}
        className="dropdown"
      >
        <option value={placeholder} disabled selected hidden>
          {placeholder}
        </option>
        {options &&
          options.map((item) => (
            <option value={item.index} key={"op_" + item.index}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Dropdown;
