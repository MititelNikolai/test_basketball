import { FC } from "react";
import ICustomLinkProps from "./ICustomLink";
import { Link } from "react-router-dom";
import styles from "./CustomLink.module.css";
const CustomLink: FC<ICustomLinkProps> = ({ text, link, labelLink }) => {
  const { labelTextStyle, labelLinkStyle } = styles;
  return (
    <span className={labelTextStyle}>
      {text}{" "}
      <Link to={link} className={labelLinkStyle}>
        {labelLink}
      </Link>
    </span>
  );
};

export default CustomLink;
