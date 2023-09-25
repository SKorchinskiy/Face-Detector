import Link from "next/link";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(60, 64, 72, 0.8)",
        height: "50px",
        color: "white",
        textTransform: "uppercase",
      }}
    >
      <div
        style={{
          width: "50%",
          marginLeft: "50px",
        }}
      >
        <Link href={"/"} style={{ color: "white", textDecoration: "none" }}>
          <span>Face Detector</span>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "50%",
        }}
      >
        <Link
          href={"/detect"}
          style={{
            color: "white",
            textDecoration: "none",
            width: "fit-content",
          }}
        >
          <span>Detect</span>
        </Link>
        <Link
          href={"/images"}
          style={{ color: "white", textDecoration: "none" }}
        >
          <span>Images</span>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "50px",
          width: "50%",
        }}
      >
        <span>Sign In</span>
      </div>
    </div>
  );
}
