"use client";

import styles from "./sign-up-form.module.css";

import Button from "../button/button.component";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(initialState);

  const handleFormFieldChange = (event: any) => {
    const value = event.target.value;
    setFormFields({
      ...formFields,
      [event.target.id]: value,
    });
  };

  const handleSignUp = (event: any) => {
    event.preventDefault();
    console.log("here", event);
    fetch("http://localhost:8000/api/v1/sign-up", {
      method: "post",
      body: JSON.stringify(formFields),
    });
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "space-between",
        height: "300px",
        width: "300px",
      }}
    >
      <div className="form-field">
        <label htmlFor="name" />
        <input
          id="name"
          type="text"
          placeholder="enter name"
          className={styles["form-field"]}
          value={formFields.name}
          onChange={handleFormFieldChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="email" />
        <input
          id="email"
          type="email"
          placeholder="enter email"
          className={styles["form-field"]}
          value={formFields.email}
          onChange={handleFormFieldChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="password" />
        <input
          id="password"
          type="password"
          placeholder="enter password"
          className={styles["form-field"]}
          value={formFields.password}
          onChange={handleFormFieldChange}
        />
      </div>
      <Button btnType="submit" clickHandler={handleSignUp}>
        Sign Up
      </Button>
    </form>
  );
}
