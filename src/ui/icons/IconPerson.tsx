import { FC } from "react";
import ISvgIconProps from "./ISvgIconProps";
const IconPerson: FC<ISvgIconProps> = ({
  width = "16",
  height = "16",
  viewBox = "0 0 16 16",
  color = "#9C9C9C",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='person'>
        <path
          id='person_2'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.6667 5.33341C10.6667 6.80675 9.47342 8.00008 8.00008 8.00008C6.52675 8.00008 5.33341 6.80675 5.33341 5.33341C5.33341 3.86008 6.52675 2.66675 8.00008 2.66675C9.47342 2.66675 10.6667 3.86008 10.6667 5.33341ZM2.66675 12.0001C2.66675 10.2267 6.22008 9.33341 8.00008 9.33341C9.78008 9.33341 13.3334 10.2267 13.3334 12.0001V12.6667C13.3334 13.0334 13.0334 13.3334 12.6667 13.3334H3.33341C2.96675 13.3334 2.66675 13.0334 2.66675 12.6667V12.0001Z'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default IconPerson;
