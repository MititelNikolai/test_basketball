import { MultiValue } from "react-select";

export interface SelectOptions {
  value?: number | string;
  label?: string;
}

export interface IPlayerMultiSelect {
  options?: Array<SelectOptions>;
  handleChange: (option: MultiValue<SelectOptions>) => void;
  selectedValues?: Array<SelectOptions>;
}
