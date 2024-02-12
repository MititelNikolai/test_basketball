import { FC } from "react";
import notFound from "../../assets/img/notFound.png";
import styles from "./NotFound.module.css";
const NotFound: FC = () => {
  const {
    notFoundContainer,
    notFoundImg,
    notFoundMessageContainer,
    notFoundTitle,
    notFoundSubtitle,
  } = styles;
  return (
    <div className={notFoundContainer}>
      <img className={notFoundImg} src={notFound} alt='Not Found' />
      <div className={notFoundMessageContainer}>
        <p className={notFoundTitle}>Page not found</p>
        <p className={notFoundSubtitle}>
          Sorry, we can’t find what you’re looking for
        </p>
      </div>
    </div>
  );
};

export default NotFound;
