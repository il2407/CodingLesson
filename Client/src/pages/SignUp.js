import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Fab,
} from "@mui/material";

const BASE_URL = "http://localhost:5001/user/signup";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState("");
  const [role, setRole] = useState("");

  let navigate = useNavigate();

  //Sending a POST request to submit a user to database
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(BASE_URL, {
        email: email,
        password: password,
        role: role,
      })
      .then((data) => {
        setRegister(data.data.message);

        if (data.data.message === "User added successfully") {
          navigate("/login");
        }
      });
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      <br></br>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <FormGroup controlId="formBasicEmail">
          <FormControl onChange={(e) => setEmail(e.target.value)}>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
        </FormGroup>
        <br></br>

        {/* password */}
        <FormGroup controlId="formBasicPassword">
          <FormControl onChange={(e) => setPassword(e.target.value)}>
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
        </FormGroup>
        <br></br>

        {/* role */}
        <FormGroup controlId="formBasicRole">
          <FormControl onChange={(e) => setRole(e.target.value)}>
            <InputLabel htmlFor="my-input">Role - mentor or student</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
        </FormGroup>
        <br></br>

        {/* submit button */}
        <Fab
          color="success"
          variant="primary"
          type="submit"
          onSubmit={(e) => handleSubmit(e)}
          sx={{ textTransform: "none" }}
        >
          Sign Up
        </Fab>

        <p className="text-danger">{register}</p>
      </Form>
    </div>
  );
}
