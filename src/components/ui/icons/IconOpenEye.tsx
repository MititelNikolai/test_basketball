import { FC } from "react";
import { SvgIconProps } from "./SvgIconProps";

const IconOpenEye: FC<SvgIconProps> = ({
  width = "16",
  height = "16",
  viewBox = "0 0 16 16",
  color = "#9C9C9C",
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
      <g id='eye'>
        <path
          id='eye_2'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8.00008 2.66675C4.66675 2.66675 1.82008 4.74008 0.666748 7.66675C1.82008 10.5934 4.66675 12.6667 8.00008 12.6667C11.3334 12.6667 14.1801 10.5934 15.3334 7.66675C14.1801 4.74008 11.3334 2.66675 8.00008 2.66675ZM8.00008 11.0001C6.16008 11.0001 4.66675 9.50675 4.66675 7.66675C4.66675 5.82675 6.16008 4.33341 8.00008 4.33341C9.84008 4.33341 11.3334 5.82675 11.3334 7.66675C11.3334 9.50675 9.84008 11.0001 8.00008 11.0001ZM6.00008 7.66675C6.00008 6.56008 6.89341 5.66675 8.00008 5.66675C9.10675 5.66675 10.0001 6.56008 10.0001 7.66675C10.0001 8.77341 9.10675 9.66675 8.00008 9.66675C6.89341 9.66675 6.00008 8.77341 6.00008 7.66675Z'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default IconOpenEye;
