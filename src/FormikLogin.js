import React from "react";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import styled from "styled-components";

const Basic = () => {
  const navigate = useNavigate();
  const [eye, setEye] = useState("password");
  const [error, setError] = useState("");

  const handlePass = () => {
    setEye(eye === "password" ? "text" : "password");
  };

  const PasswordInput = styled.span`
    color: ${(props) => (props.eye === "password" ? "#4CAF50" : "#FFC107")};
  `;

  return (
    <div className={styles.wrap__signup}>
      <h2>Sign Up!</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/i.test(
              values.password
            )
          ) {
            errors.password = "Invalid password";
          }

          if (!values.username) {
            errors.username = "Required";
          } else if (
            !/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i.test(
              values.username
            )
          ) {
            errors.username = "invalid username";
          }

          if (!values.name) {
            errors.name = "Required";
          } else if (!/^[a-zA-Z0-9\s]+$/i.test(values.name)) {
            errors.name = "invalid name";
          }

          // Function to check if the user is at least 18 years old
          function isUserAbove18(dob) {
            // dob format: yyyy-mm-dd
            const today = new Date();
            const birthDate = new Date(dob);

            // Calculate age
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (
              monthDiff < 0 ||
              (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
              // If the current month is before the birth month or if it's the birth month but the day hasn't been reached yet
              age--;
            }

            return age >= 8;
          }

          // Example usage
          const isUserAdult = isUserAbove18(values.dob);

          if (!isUserAdult) {
            errors.dob = "User is under 8 years old.";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          fetchData();
          async function fetchData() {
            const res = await fetch("https://api.jungleroam.com/api/signup/", {
              method: "POST",
              body: JSON.stringify(values),
              headers: { "Content-Type": "application/json" },
            });
            const response = await res.json();


            if (response.error === "user already exists") {
              setTimeout(() => {
                navigate("/fail");
              }, 400);
            } else if (response.name) {
              setTimeout(() => {
                navigate("/success");
              }, 400);
            } else {
              setError(response.errors[0].message);
            }
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className={styles.form__signup} onSubmit={handleSubmit}>
            <div className={styles.input__wrap}>
              <span className={styles.error__msg}>
                {errors.username && errors.username}
              </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={values.username}
              />
            </div>
            <div className={styles.input__wrap}>
              <span className={styles.error__msg}>
                {errors.name && touched.name && errors.name}
              </span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </div>

            <div className={styles.input__wrap}>
              <span className={styles.error__msg}>
                {errors.email && touched.email && errors.email}
              </span>
              <input
                type="email"
                name="email"
                placeholder="Name or Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>

            <div className={styles.input__wrap}>
              <span className={styles.error__msg}>
                {errors.dob && touched.dob && errors.dob}
              </span>
              <input
                type="date"
                name="dob"
                placeholder="dob"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dob}
              />
            </div>
            <div className={styles.input__wrap}>
              <span className={styles.error__msg}>
                {errors.password && touched.password && errors.password}
              </span>
              <input
                className={styles.pass}
                type={eye}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <PasswordInput
                eye={eye}
                className={styles.btn__visibility}
                onClick={() => {
                  handlePass();
                }}
              >
                {eye === "password" ? "Show" : "Hide"}
              </PasswordInput>
            </div>

            <button className={styles.btn__submit} type="submit">
              Submit
            </button>
            <div className={styles.validation__error}>{error}</div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Basic;
