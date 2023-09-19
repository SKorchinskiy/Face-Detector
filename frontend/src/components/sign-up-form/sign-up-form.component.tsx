"use client";

import styles from "./sign-up-form.module.css";

import Button from "../button/button.component";
import { useState } from "react";
import Field from "../field/field.component";

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
    fetch("http://localhost:8000/api/v1/sign-up", {
      method: "post",
      body: JSON.stringify(formFields),
    });
  };

  return (
    <form className={styles["form-container"]}>
      <Field
        id="name"
        type="text"
        placeholder="enter name"
        value={formFields.name}
        className="form-field"
        onFieldChange={handleFormFieldChange}
      />
      <Field
        id="email"
        type="email"
        placeholder="enter email"
        value={formFields.email}
        className="form-field"
        onFieldChange={handleFormFieldChange}
      />
      <Field
        id="password"
        type="password"
        placeholder="enter password"
        value={formFields.password}
        className="form-field"
        onFieldChange={handleFormFieldChange}
      />
      <Button
        className="btn-container"
        btnType="submit"
        clickHandler={handleSignUp}
      >
        Sign Up
      </Button>
    </form>
  );
}
