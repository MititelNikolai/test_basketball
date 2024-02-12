interface IButtonProps {
  text: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  variant: "primary" | "secondary";
  textWithPlus?: boolean;
}
export default IButtonProps;
