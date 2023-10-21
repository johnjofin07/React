import { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";

export function Loginapi() {
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInput = (e, key) => {
    setData("");

    setInputValue({ ...inputValue, [key]: e.target.value });
  };
  // console.log(inputValue);

  const handleClick = () => {
    setData("");

    fetchData();
  };
  async function fetchData() {
    const res = await fetch("https://api.jungleroam.com/api/login/", {
      method: "POST",
      body: JSON.stringify(inputValue),
      headers: {
        "content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (response.errors) {
      setData(response.errors[0].message);
    } else if (response.user.username) {
      navigate("/rick-morty");
    }
  }

  return (
    <div className={styles.wrap__signup}>
      <div className={styles.input__wrap}>
        <input
          type="text"
          placeholder="Name or Email"
          onChange={(e) => {
            handleInput(e, "usernameOrEmail");
          }}
          value={inputValue.usernameOrEmail}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            handleInput(e, "password");
          }}
        />
      </div>
      <div className={styles.btn__wrap}>
        <button
          className={styles.btn__submit}
          onClick={() => {
            handleClick(inputValue);
          }}
        >
          Log in{" "}
        </button>
      </div>

      <div
        className={styles.error}
        style={data ? { border: "solid 3px #000" } : { border: "0" }}
      >
        {data}
      </div>
    </div>
  );
}
