import { FC } from "react";
import { SvgIconProps } from "./SvgIconProps";

const IconSearch: FC<SvgIconProps> = ({
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
      <g id='search'>
        <path
          id='search_2'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.1245 9.64771H10.6511L13.4778 12.4877C13.7511 12.761 13.7511 13.2077 13.4778 13.481C13.2045 13.7544 12.7578 13.7544 12.4845 13.481L9.65113 10.6477V10.121L9.47113 9.93438C8.5378 10.7344 7.26447 11.1477 5.91113 10.921C4.0578 10.6077 2.5778 9.06105 2.35113 7.19438C2.00447 4.37438 4.3778 2.00105 7.1978 2.34772C9.06447 2.57438 10.6111 4.05438 10.9245 5.90771C11.1511 7.26105 10.7378 8.53438 9.9378 9.46771L10.1245 9.64771ZM3.65114 6.64772C3.65114 8.30772 4.99114 9.64772 6.65114 9.64772C8.31114 9.64772 9.65114 8.30772 9.65114 6.64772C9.65114 4.98772 8.31114 3.64772 6.65114 3.64772C4.99114 3.64772 3.65114 4.98772 3.65114 6.64772Z'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default IconSearch;
