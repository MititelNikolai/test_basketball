import { FC } from "react";
import { Link } from "react-router-dom";
import CustomLinkProps from "./CustomLinkProps";
import styles from "./CustomLink.module.css";

const CustomLink: FC<CustomLinkProps> = ({ text, link, labelLink }) => {
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
