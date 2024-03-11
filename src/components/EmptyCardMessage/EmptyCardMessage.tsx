import { FC } from "react";
import EmptyCardMessageProps from "./EmptyCardMessageProps";
import styles from "./EmptyCardMessage.module.css";

const EmptyCardMessage: FC<EmptyCardMessageProps> = ({
  imageLink,
  title,
  subTitle,
}) => {
  const { cardsEmpty, cardsEmptyTitle, cardsEmptySubTitle } = styles;
  return (
    <section className={cardsEmpty}>
      <img src={imageLink} alt='Empty Card' />
      <p className={cardsEmptyTitle}>{title}</p>
      {subTitle && <p className={cardsEmptySubTitle}>{subTitle}</p>}
    </section>
  );
};

export default EmptyCardMessage;
