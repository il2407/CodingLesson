import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignForm from "../components/SignForm";

const BASE_URL = "http://localhost:5001/user/";

export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const getUserRole = async (userEmail) => {
    const { data } = await axios.get(BASE_URL + "role/" + userEmail);
    if (data.users[0].role === "mentor") {
      sessionStorage.setItem("role", "mentor");
    } else {
      sessionStorage.setItem("role", "student");
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
          sessionStorage.setItem("logged", true);
          const role = sessionStorage.getItem("role");
          if (role === "mentor") navigate("/codeBlock");
          console.log("props is ", props.path);
          if (props.path == undefined) navigate("/codeBlock");
          else navigate(props.path);
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
      <SignForm
        firstFunc={setEmail}
        firstText="Email address"
        secondFunc={setPassword}
        secondText="Password"
        submitFunc={handleSubmit}
        login={true}
        buttonText="Login"
      />
    </div>
  );
}
