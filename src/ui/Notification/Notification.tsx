import { FC, useEffect, useState } from "react";
import styles from "./Notification.module.css";
interface INotification {
  message?: string;
}

const Notification: FC<INotification> = ({ message }) => {
  const { notificationStyle, visible } = styles;
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
        isVisible ? `${notificationStyle} ${visible}` : notificationStyle
      }
    >
      {message}
    </div>
  );
};

export default Notification;
