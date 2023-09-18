import styles from "./field.module.css";
import { ChangeEventHandler, Fragment } from "react";

type FieldProps = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  className: string;
  onFieldChange: ChangeEventHandler<HTMLInputElement>;
};

export default function Field({
  id,
  type = "text",
  placeholder = "",
  value = "",
  className = "",
  onFieldChange = () => {},
}: FieldProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <label htmlFor={id} />
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        className={styles[className]}
        onChange={onFieldChange}
      />
    </div>
  );
}
