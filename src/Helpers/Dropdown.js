import React, { useState } from "react";
import { playerClass, playerRace } from "./GlobalVars";
import "../Styles/Dropdown.scss";

const Dropdown = ({ id, placeholder, options, action }) => {
  const [selected, setSelected] = useState();

  const handleRaceSel = (e) => {
    setSelected(e.target.value);
    if (id === "selectRace") {
      playerRace = e.target.value;
      // console.log("You chose ", playerRace);
    } else {
      playerClass = e.target.value;
      // console.log("You chose ", playerClass);
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
