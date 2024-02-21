import { FC } from "react";
import styles from "./EmptyCardMessage.module.css";
interface EmptyCardMessageProps {
  imageLink: string;
  title: string;
  subTitle?: string;
}
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
