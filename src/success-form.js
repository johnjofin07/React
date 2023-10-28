import { useLocation } from "react-router-dom";
import styles from "./signup.module.css";

export function Success() {
  const location = useLocation();
  // console.log(location);
  return (
    <div className={styles.wrap__signup}>
      {location.pathname === "/success" ? (
        <div className="msg__response">Hurray!! user Created.</div>
      ) : (
        <div className="msg__response">Oops!! user already exists.</div>
      )}
    </div>
  );
}
