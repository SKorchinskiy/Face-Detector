"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import Button from "../../../../_components/button/button.component";
import FieldComponent from "../../../_components/ui/field/field.component";
import { Field } from "../../page";

type SignInFormProps = {
  authHandler: Function;
};

const initialState: Field = {
  email: "",
  password: "",
};

export default function SignInForm({ authHandler }: SignInFormProps) {
  const [signInInput, setSignInInput] = useState<Field>(initialState);

  const signInHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    authHandler(signInInput);
  };

  const fieldUpdateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setSignInInput((prevInput) => ({ ...prevInput, [key]: value }));
  };

  return (
    <>
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
      <Button
        className="btn-container-mini"
        // disabled
        clickHandler={signInHandler}
      >
        <span>Sign In</span>
      </Button>
    </>
  );
}
