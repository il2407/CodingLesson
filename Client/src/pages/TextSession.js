import io from "socket.io-client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    createSession();
    joinRoom();
  }, []);

  // const handleOnClick = () => {
  //   createSession();
  //   joinRoom();
  // };

  return (
    <div className="App">
      <p>Sharable link is: {link}</p>

      {logged ? (
        <Chat socket={socket} room={id} />
      ) : (
        <>
          First Login and then join the room
          <br></br>
          <Login path={"/codeBlock/textSession/" + id} />
          <br></br>
        </>
      )}
    </div>
  );
}

export default TextSession;
