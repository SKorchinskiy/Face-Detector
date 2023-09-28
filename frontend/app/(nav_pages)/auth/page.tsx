import SignUpForm from "./_components/sign-up-form/sign-up-form.component";

export default function Auth() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <SignUpForm />
    </div>
  );
}
