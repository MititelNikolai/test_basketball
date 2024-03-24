import { FC, useEffect, useState } from "react";
import { NotificationProps } from "./NotificationProps";
import styles from "./Notification.module.css";

const Notification: FC<NotificationProps> = ({ message, positionCenter }) => {
  const { notificationStyle, visible, center } = styles;

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div
      className={
        isVisible
          ? `${notificationStyle} ${visible} ${positionCenter && center}`
          : notificationStyle
      }
    >
      {message}
    </div>
  );
};

export default Notification;
