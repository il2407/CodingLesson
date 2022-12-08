import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import uuid from "react-uuid";

const socket = io.connect("http://localhost:5001");
const BASE_URL = "http://localhost:5001/session/createsession";

function TextSession() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const createSession = async () => {
    //generate uuid and pull username
    const { data } = await axios.post(BASE_URL, {
      uuid: uuid(),
      user: "a",
    });
  };
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const handleOnClick = () => {
    createSession();
    joinRoom();
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={handleOnClick}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default TextSession;
