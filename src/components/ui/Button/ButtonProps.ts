export interface ButtonProps {
  text: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  variant: "primary" | "secondary";
  textWithPlus?: boolean;
}
