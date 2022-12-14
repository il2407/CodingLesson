import React, { useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

function Chat({ socket, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isMentor, setIsMentor] = useState(false);

  let auth = { token: true };
  const role = sessionStorage.getItem("role");

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
    joinRoom();
    sendMessage();
  };
  const sendMessage = () => {
    socket.emit("send_message", { message: currentMessage, room });
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    if (role === "mentor") {
      setIsMentor(true);
    } else setIsMentor(false);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setCurrentMessage(data.message);
    });
  }, [socket]);

  return (
    <>
      {isMentor ? <>Read Only</> : <>Read and Write</>}
      <CodeEditor
        readOnly={isMentor}
        value={currentMessage}
        language="js"
        placeholder="Please enter JS code."
        onChange={handleChange}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </>
  );
}

export default Chat;
