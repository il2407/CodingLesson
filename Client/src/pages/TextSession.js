import io from "socket.io-client";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Chat from "./Chat";
import axios from "axios";
import uuid from "react-uuid";

const socket = io.connect("http://localhost:5001");
const BASE_URL = "http://localhost:5001/session/createsession";

function TextSession(props) {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  let { id } = useParams();
  const [link, setLink] = useState(
    "http://localhost:3000/codeBlock/textSession/" + id
  );

  const [userId, setuserId] = useState(id);
  const role = sessionStorage.getItem("role");

  const createSession = async () => {
    //generate uuid and pull username
    const { data } = await axios.post(BASE_URL, {
      uuid: uuid(),
      user: userId,
    });
    console.log("chat is:", showChat);
  };
  const joinRoom = () => {
    console.log("room is:", userId);

    if (userId !== "") {
      socket.emit("join_room", userId);
      setShowChat(true);
    }
  };

  const handleOnClick = () => {
    createSession();
    joinRoom();
  };

  return (
    <div className="App">
      <p>Link is: {link}</p>
      {!showChat ? (
        <button onClick={handleOnClick}>Join A Room</button>
      ) : (
        <Chat socket={socket} room={userId} />
      )}
    </div>
  );
}

export default TextSession;
