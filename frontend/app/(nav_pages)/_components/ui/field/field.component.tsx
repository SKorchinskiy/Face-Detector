import styles from "./field.module.css";

import {
  ChangeEvent,
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
} from "react";

type FieldProps = Partial<{
  id: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  className: string;
  onFieldChange: ChangeEventHandler<HTMLInputElement>;
}>;

const defaultProps: FieldProps = {
  id: `input-${Math.round(Math.random() * 1e6)}`,
  type: "text",
  placeholder: "",
  name: "",
  value: "",
  className: "",
  onFieldChange: (e: ChangeEvent<HTMLInputElement>) => {},
};

function Field(
  {
    id,
    type,
    placeholder,
    name,
    value,
    className,
    onFieldChange,
  } = defaultProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={styles["field-container"]}>
      <label htmlFor={id} />
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={className ? styles[className] : ""}
        onChange={onFieldChange}
        ref={ref}
      />
    </div>
  );
}

export default forwardRef<HTMLInputElement, FieldProps>(Field);
