import { Dispatch, ReactNode, SetStateAction } from "react";

interface IPropsInput {
  inputType: string;
  label?: string;
  name?: string;
  inputErrorMessage?: string;
  children?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  handleClick?: () => void;
  background?: "white" | null;
  needMessage?: boolean;
  setValue?: Dispatch<SetStateAction<string>>;
  value?: string;
}

export default IPropsInput;
