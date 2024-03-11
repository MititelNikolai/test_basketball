import { SingleValue } from "react-select";

export interface SelectOptions {
  value: number | string;
  label: string;
}

interface ItemsSelectorProps {
  options?: Array<SelectOptions>;
  handleChange: (option: SingleValue<SelectOptions>) => void;
  textPosition?: "center" | "left";
  isClearable?: boolean;
  placeholder?: string;
  forForm?: boolean;
  label?: string;
  defaultValueIndex?: number;
  selectErrorMessage?: string;
  isDisabled?: boolean;
}

export default ItemsSelectorProps;
