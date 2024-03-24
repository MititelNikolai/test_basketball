import { FC } from "react";
import Select from "react-select";
import { PlayerMultiSelectProps } from "./PlayerMultiSelect.interfaces";
import "./PlayerMultiSelect.css";

const PlayerMultiSelect: FC<PlayerMultiSelectProps> = ({
  options,
  selectedValues,
  handleChange,
}) => {
  return (
    <Select
      className='playerMultiSelectContainer'
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
