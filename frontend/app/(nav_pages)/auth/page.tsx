import styles from "./page.module.css";
import SignUpForm from "./_components/sign-up-form/sign-up-form.component";

export default function Auth() {
  return (
    <div className={styles["auth-container"]}>
      <SignUpForm />
    </div>
  );
}
