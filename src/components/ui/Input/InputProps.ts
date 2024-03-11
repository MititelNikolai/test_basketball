import { Dispatch, ReactNode, SetStateAction } from "react";

interface InputProps {
  inputFieldType: string;
  label?: string;
  name?: string;
  errorMessage?: string;
  children?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  handleClick?: () => void;
  background?: "white" | null;
  haveMessage?: boolean;
  setValue?: Dispatch<SetStateAction<string>>;
  value?: string;
}

export default InputProps;
