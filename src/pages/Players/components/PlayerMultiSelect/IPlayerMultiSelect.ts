export interface SelectOptions {
  value: number | string | undefined;
  label: string | undefined;
}

export interface IPlayerMultiSelect {
  options?: Array<SelectOptions>;
  handleChange: (option: any) => void;
  selectedValues?: Array<SelectOptions>;
}
