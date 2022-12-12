import io from "socket.io-client";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import Chat from "../components/Chat";
import axios from "axios";
import uuid from "react-uuid";
import { Login } from "./Login";

const BASE_URL = process.env.REACT_APP_API_KEY;
const socket = io.connect(BASE_URL);

function TextSession(props) {
  const [showChat, setShowChat] = useState(false);
  let { id } = useParams();
  const [link, setLink] = useState(process.env.REACT_APP_LINK_BASE + id);

  const logged = sessionStorage.getItem("logged");
  console.log(logged);

  const createSession = async () => {
    //generate uuid and pull username
    const { data } = await axios.post(
      BASE_URL + "/session/createsession/",
      {
        uuid: uuid(),
        user: id,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
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
