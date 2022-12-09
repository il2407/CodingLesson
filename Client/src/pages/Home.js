import NaviButton from "../components/NaviButton";
import Typography from "@mui/material/Typography";

export function Home() {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "block",
        height: "100vh",
        position: "fixed",
        top: "30%",
        left: "45%",
      }}
    >
      <Typography variant="h4">Home</Typography>
      <br></br>
      <div>
        {" "}
        <NaviButton name="Sign In" path="login"></NaviButton>
        <NaviButton name="Sign Up" path="signup"></NaviButton>
      </div>
    </div>
  );
}
