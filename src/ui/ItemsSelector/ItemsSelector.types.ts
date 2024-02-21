export interface SelectOptions {
  value: number | string | undefined;
  label: string | undefined;
}

export interface ItemsSelectorProps {
  options?: Array<SelectOptions>;
  handleChange: (option: any) => void;
  textPosition?: "center" | "left" | undefined;
  isClearable?: boolean;
  placeholder?: string;
  forForm?: boolean;
  label?: string;
  defaultValueIndex?: number;
  selectErrorMessage?: string;
}
