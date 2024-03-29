import { FC } from "react";
import { SvgIconProps } from "./SvgIconProps";

const IconCheck: FC<SvgIconProps> = ({
  width = "6",
  height = "6",
  viewBox = "0 0 6 6",
  color = "#fff",
  className,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.64624 5.39625C2.45124 5.59125 2.13624 5.59125 1.94124 5.39625L0.146243 3.60125C0.0526164 3.50783 0 3.38101 0 3.24875C0 3.11649 0.0526164 2.98967 0.146243 2.89625C0.341243 2.70125 0.656243 2.70125 0.851243 2.89625L2.29124 4.33625L5.73124 0.89625C5.92624 0.70125 6.24124 0.70125 6.43624 0.89625C6.63124 1.09125 6.63124 1.40625 6.43624 1.60125L2.64624 5.39625Z'
        fill={color}
      />
    </svg>
  );
};

export default IconCheck;
