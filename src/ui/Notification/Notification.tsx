import { FC, useEffect, useState } from "react";
import styles from "./Notification.module.css";
interface INotification {
  message?: string;
  positionCenter?: boolean;
}

const Notification: FC<INotification> = ({ message, positionCenter }) => {
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
