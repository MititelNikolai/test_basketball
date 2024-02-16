import { FC } from "react";
import ISvgIconProps from "./ISvgIconProps";

const IconChevronRight: FC<ISvgIconProps> = ({
  width = "6",
  height = "10",
  viewBox = "0 0 6 10",
  color = "#9C9C9C",
}) => {
  return (
    <svg
      style={{ transform: "scale(-1,1)" }}
      width={width}
      height={height}
      viewBox={viewBox}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.4 0.768457C5.712 1.08046 5.712 1.58446 5.4 1.89646L2.296 5.00046L5.4 8.10446C5.712 8.41646 5.712 8.92046 5.4 9.23246C5.088 9.54446 4.584 9.54446 4.272 9.23246L0.600002 5.56046C0.288002 5.24846 0.288002 4.74446 0.600002 4.43246L4.272 0.760457C4.576 0.456457 5.088 0.456457 5.4 0.768457Z'
        fill={color}
      />
    </svg>
  );
};

export default IconChevronRight;
