import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";

// Custom component that gets:
// Name of the Button
// Path to navigate to
// Type of the button

function NaviButton({ name, path, type }) {
  let navigate = useNavigate();
  const curr = `/${path}`;

  return (
    <>
      <Fab
        color="success"
        variant="extended"
        onClick={(e) => navigate(curr)}
        type={type}
        sx={{ textTransform: "none" }}
      >
        {name}{" "}
      </Fab>
      <br></br>
    </>
  );
}

export default NaviButton;
