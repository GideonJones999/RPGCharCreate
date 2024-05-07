import DropdownSimp from "./DropdownSimp";

const AbilityScore = ({
  attrAbr,
  attrName,
  attrScore,
  attrBonus,
  attrMod,
  options,
}) => {
  return (
    <h3 className="abilitySpan">
      <span className="abilityName">{attrAbr.toUpperCase()}</span>
      <span className="abilitySelector">
        {attrScore === 0 && (
          <DropdownSimp
            id={attrAbr + "_select"}
            placeholder={attrName + " Score"}
            options={options}
            value={attrScore}
          />
        )}
        {attrScore === 0 && attrBonus !== 0 && <p>+ {attrBonus}</p>}{" "}
      </span>
      {attrScore !== 0 && (
        <h4 className="abilityMod">
          {attrMod >= 0 && "+"}
          {attrMod}
        </h4>
      )}
      {attrScore !== 0 && <span className="abilityValue">{attrScore}</span>}
    </h3>
  );
};

export default AbilityScore;
