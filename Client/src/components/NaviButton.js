import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import { useEffect, useState } from "react";
// Custom component that gets:
// Name of the Button
// Path to navigate to
// Type of the button

function NaviButton({ name, path, type }) {
  let navigate = useNavigate();
  const [currPath, setCurrPath] = useState(`/${path}`);
  const [currName, setCurrName] = useState(name);

  const updatePath = () => {
    // setCurrName(currName.name);
    if (currPath === "/textSession") setCurrPath("textSession/" + currName);
  };

  useEffect(() => {
    updatePath();
  }, []);

  return (
    <>
      <Fab
        color="success"
        variant="extended"
        onClick={(e) => navigate(currPath)}
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
