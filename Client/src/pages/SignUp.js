import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SignForm from "../components/SignForm";

const BASE_URL = "http://localhost:5001/user/signup";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  let navigate = useNavigate();

  const signUpUser = async () => {
    axios
      .post(BASE_URL, {
        email: email,
        password: password,
        role: role,
      })
      .then((data) => {
        if (data.data.message === "User added successfully") {
          navigate("/login");
        } else alert("User register failed");
      });
  };

  //Sending a POST request to submit a user to database
  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser();
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      <br></br>
      <SignForm
        firstFunc={setEmail}
        firstText="Email address"
        secondFunc={setPassword}
        secondText="password"
        thirdFunc={setRole}
        thirdText="Role- mentor/student"
        submitFunc={handleSubmit}
        login={false}
        buttonText="Sign Up"
      />
    </div>
  );
}
