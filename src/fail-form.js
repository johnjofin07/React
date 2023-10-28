import styles from "./signup.module.css";

export function Fail() {
  return (
    <div className={styles.wrap__signup}>
      <div className="msg__response">Oops!! user already exists.</div>
    </div>
  );
}
