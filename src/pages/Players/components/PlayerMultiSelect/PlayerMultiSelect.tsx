import { FC } from "react";
import Select from "react-select";
import "./PlayerMultiSelect.css";
import { IPlayerMultiSelect } from "./IPlayerMultiSelect";

const PlayerMultiSelect: FC<IPlayerMultiSelect> = ({
  options,
  selectedValues,
  handleChange,
}) => {
  return (
    <Select
      isClearable={false}
      classNamePrefix='playerMultiSelect'
      closeMenuOnSelect={false}
      value={selectedValues}
      onChange={(selectedOptions) => handleChange(selectedOptions)}
      isMulti
      menuPosition='fixed'
      unstyled
      options={options}
    />
  );
};

export default PlayerMultiSelect;
