import React, { useState } from "react";
import "../Styles/Dropdown.scss";

const Dropdown = ({ id, placeholder, options, action }) => {
  const [selected, setSelected] = useState();

  const handleRaceSel = (e) => {
    setSelected(e.target.value);
  };

  console.log(options);
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
            // <p>{JSON.stringify(item)}</p>
            <option></option>
            // <option
            //   value={item["of"]["index"]}
            //   key={"op_" + item["of"]["index"]}
            // >
            //   {item["of"]["name"]}
            // </option>
          ))}
      </select>
      {options &&
        options.map((item) => (
          <p>{JSON.stringify(item)}</p>
          // <option value={item.of.index} key={"op_" + item.index}>
          //   {item.name}
          // </option>
        ))}
    </div>
  );
};

export default Dropdown;
