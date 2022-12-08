import { React, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeToMentor, changeToStudent } from "../HomeSlice";
import {
  FormGroup,
  FormLabel,
  FormControl,
  Fab,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
} from "@mui/material";

const BASE_URL = "http://localhost:5001/user/";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const getUserRole = async (userEmail) => {
    const { data } = await axios.get(BASE_URL + "role/" + userEmail);
    if (data.users[0].role === "mentor") {
      localStorage.setItem("role", "mentor");
    } else {
      localStorage.setItem("role", "student");
    }
  };
  const loginUser = async (userEmail) => {
    axios
      .post(BASE_URL + "login", {
        email: email,
        password: password,
      })
      .then((data) => {
        if (data.data.message === "Auth Successfull") {
          navigate("/codeBlock");
        }
      });
  };

  //Sending 2 requests : 1) username and password validation
  // 2) dispacth the user role in store in order to check authrazation later
  const handleSubmit = (e) => {
    e.preventDefault();
    getUserRole(email);
    loginUser();
  };

  return (
    <div>
      <h1>Login Page</h1>
      <br></br>
      <Grid width={200} right={40}>
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
            <FormLabel></FormLabel>
            <FormLabel></FormLabel>
            <FormControl onChange={(e) => setPassword(e.target.value)}>
              <InputLabel htmlFor="my-input">Password</InputLabel>
              <Input
                type="password"
                id="my-input"
                aria-describedby="my-helper-text"
              />
              <FormHelperText id="my-helper-text"></FormHelperText>
            </FormControl>
          </FormGroup>
          <br></br>
          {/* Login button */}
          <Fab
            color="success"
            variant="primary"
            type="submit"
            onSubmit={(e) => handleSubmit(e)}
            sx={{ textTransform: "none" }}
          >
            Login
          </Fab>
        </Form>
      </Grid>
    </div>
  );
}
