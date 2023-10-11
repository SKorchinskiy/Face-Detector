"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import Button from "../../../../_components/button/button.component";
import FieldComponent from "../../../_components/ui/field/field.component";
import { Field } from "../../page";

type SignUpFormProps = {
  authHandler: Function;
};

const initialState: Field = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm({ authHandler }: SignUpFormProps) {
  const [signUpInput, setSignUpInput] = useState<Field>(initialState);

  const signUpHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    authHandler(signUpInput);
  };

  const fieldUpdateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setSignUpInput((prevInput) => ({ ...prevInput, [key]: value }));
  };

  return (
    <>
      <FieldComponent
        type="text"
        name="name"
        className="form-field"
        placeholder="enter your name"
        onFieldChange={fieldUpdateHandler}
      />
      <FieldComponent
        type="email"
        name="email"
        className="form-field"
        placeholder="enter an email"
        onFieldChange={fieldUpdateHandler}
      />
      <FieldComponent
        type="password"
        name="password"
        className="form-field"
        placeholder="enter a password"
        onFieldChange={fieldUpdateHandler}
      />
      <FieldComponent
        type="password"
        name="confirmPassword"
        className="form-field"
        placeholder="confirm a password"
        onFieldChange={fieldUpdateHandler}
      />
      <Button className="btn-container-mini" clickHandler={signUpHandler}>
        <span>Sign Up</span>
      </Button>
    </>
  );
}
