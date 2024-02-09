import { FC } from "react";
import ISvgIconProps from "./ISvgIconProps";
const IconCreate: FC<ISvgIconProps> = ({
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
      <g id='create'>
        <path
          id='create_2'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M13.806 3.75426C14.066 4.01426 14.066 4.43426 13.806 4.69426L12.586 5.91426L10.086 3.41426L11.306 2.19426C11.4305 2.06942 11.5996 1.99927 11.776 1.99927C11.9523 1.99927 12.1214 2.06942 12.246 2.19426L13.806 3.75426ZM1.99927 13.6676V11.6409C1.99927 11.5476 2.0326 11.4676 2.09927 11.4009L9.3726 4.12758L11.8726 6.62758L4.5926 13.9009C4.5326 13.9676 4.44593 14.0009 4.35927 14.0009H2.3326C2.14593 14.0009 1.99927 13.8543 1.99927 13.6676Z'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default IconCreate;
