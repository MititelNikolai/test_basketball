import { FC, useEffect, useState } from "react";
import styles from "./Notification.module.css";
interface INotification {
  error: string;
}

const Notification: FC<INotification> = ({ error }) => {
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
      {error}
    </div>
  );
};

export default Notification;
