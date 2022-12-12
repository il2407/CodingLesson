import axios from "axios";
const BASE_URL = "http://localhost:5001/user/";

const userLogin = (userEmail, userPassword) => {
  return axios.post(BASE_URL + "login", {
    email: userEmail,
    password: userPassword,
  });
};

export default { userLogin };
