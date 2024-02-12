import { ReactNode } from "react";

interface IPropsInput {
  inputType: string;
  label?: string;
  name?: string;
  inputErrorMessage?: string;
  children?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  background?: "white" | null;
  needMessage?: boolean;
}

export default IPropsInput;
