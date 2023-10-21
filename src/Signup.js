import { useState } from "react";
import styles from "./signup.module.css";
export function Login() {
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState({
    passError: false,
    nameError: false,
    emailError: false,
  });

  const handleInput = (e, key) => {
    setData("");

    setInputValue({ ...inputValue, [key]: e.target.value });
  };
  console.log(inputValue);

  const handleClick = () => {
    setData("");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const userPattern = /^[a-zA-Z0-9_-]{3,16}$/;

    const emailValidation = emailPattern.test(inputValue.email);
    const passwordValidation = passPattern.test(inputValue.password);
    const nameValidation = userPattern.test(inputValue.name);

    setError({
      nameError: !nameValidation,
      emailError: !emailValidation,
      passError: !passwordValidation,
    });

    if (emailValidation && nameValidation && passwordValidation) {
      fetchData().catch((e) => {
        console.log(e);
      });
    }

    if (error.passError === true) {
      const errorMessage = "Invalid Password check input filed!";
      setData(errorMessage);
    }

    if (error.nameError === true) {
      const errorMessage = "Invalid Username!";
      setData(errorMessage);
    }

    if (error.emailError === true) {
      const errorMessage = "Invalid Email!";
      setData(errorMessage);
    }
  };

  async function fetchData() {
    try {
      const res = await fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify(inputValue),
      });

      const response = await res.json();
    } catch (error) {}
    setData("Successfully Submitted");
  }

  return (
    <div className={styles.wrap__signup}>
      <div className={styles.input__wrap}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            handleInput(e, "name");
          }}
          value={inputValue.name}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            handleInput(e, "email");
          }}
          value={inputValue.email}
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
          Sign Up
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
