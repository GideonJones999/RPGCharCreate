import React, { useState } from "react";
import "../Styles/Dropdown.scss";

const DropdownSimp = ({ id, placeholder, options, action }) => {
  const [selected, setSelected] = useState();

  const handleRaceSel = (e) => {
    // console.log("You chose ", e.target.value);
    setSelected(e.target.value);
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
            <option value={item} key={"op_" + item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
};

export default DropdownSimp;
