import styles from "./field.module.css";

import {
  ChangeEvent,
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
} from "react";

type FieldProps = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  className: string;
  onFieldChange: ChangeEventHandler<HTMLInputElement>;
};

const defaultProps: FieldProps = {
  id: `input-${Math.round(Math.random() * 1e6)}`,
  type: "text",
  placeholder: "",
  value: "",
  className: "",
  onFieldChange: (e: ChangeEvent<HTMLInputElement>) => {},
};

function Field(
  { id, type, placeholder, value, className, onFieldChange } = defaultProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={styles["field-container"]}>
      <label htmlFor={id} />
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        className={styles[className]}
        onChange={onFieldChange}
        ref={ref}
      />
    </div>
  );
}

export default forwardRef<HTMLInputElement, FieldProps>(Field);
