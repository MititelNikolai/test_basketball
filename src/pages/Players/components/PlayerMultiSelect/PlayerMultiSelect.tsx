import { FC } from "react";
import Select from "react-select";
import "./PlayerMultiSelect.css";
const PlayerMultiSelect: FC = () => {
  return (
    <Select
      classNamePrefix='playerMultiSelect'
      closeMenuOnSelect={false}
      defaultValue={["", ""]}
      isMulti
      /* options={colourOptions}
          styles={colourStyles} */
    />
  );
};

export default PlayerMultiSelect;
