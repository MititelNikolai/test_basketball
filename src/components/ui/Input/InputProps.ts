import { Dispatch, ReactNode, SetStateAction } from "react";

export interface InputProps {
  type: string;
  label?: string;
  name?: string;
  errorMessage?: string;
  children?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  handleClick?: () => void;
  background?: "white";
  haveMessage?: boolean;
  setValue?: Dispatch<SetStateAction<string>>;
  value?: string;
}
