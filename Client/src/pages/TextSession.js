import io from "socket.io-client";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import Chat from "../components/Chat";
import axios from "axios";
import uuid from "react-uuid";
import { Login } from "./Login";

const socket = io.connect("http://localhost:5001");
const BASE_URL = "http://localhost:5001/session/createsession";

function TextSession(props) {
  const [showChat, setShowChat] = useState(false);
  let { id } = useParams();
  const [link, setLink] = useState(
    "http://localhost:3000/codeBlock/textSession/" + id
  );

  // const [userId, setUserId] = useState(id);
  // const role = sessionStorage.getItem("role");
  const logged = sessionStorage.getItem("logged");
  console.log(logged);

  const createSession = async () => {
    //generate uuid and pull username
    const { data } = await axios.post(BASE_URL, {
      uuid: uuid(),
      user: id,
    });
  };

  const joinRoom = () => {
    console.log("joim room activated");
    if (id !== "") {
      socket.emit("join_room", id);
      setShowChat(true);
    }
  };

  const handleOnClick = () => {
    createSession();
    joinRoom();
  };

  return (
    <div className="App">
      <p>Sharable link is: {link}</p>
      {!logged ? (
        <Login path={"/codeBlock/textSession/" + id} />
      ) : (
        <div>
          <br></br>
          <p>Welcome to text session</p>
        </div>
      )}

      {showChat ? (
        <Chat socket={socket} room={id} />
      ) : (
        <button onClick={handleOnClick}>Join A Room</button>
      )}
    </div>
  );
}

export default TextSession;
