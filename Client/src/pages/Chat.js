import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useStore } from "react-redux";

function Chat({ socket }) {
  const [currentMessage, setCurrentMessage] = useState("abc");
  const [isMentor, setIsMentor] = useState(false);

  const store = useStore();
  let auth = { token: true };
  const reductStore = store.getState().role;
  console.log("reductStore.value is : ", reductStore.value);
  console.log("iS MENTOR cureent : ", { isMentor });
  console.log("iS MENTOR : ", { isMentor });

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
    sendMessage();
  };
  const sendMessage = () => {
    socket.emit("send_message", { message: currentMessage });
  };

  useEffect(() => {
    if (reductStore.value === "mentor") {
      setIsMentor(true);
    }
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setCurrentMessage(data.message);
    });
  }, [socket]);

  return isMentor ? (
    <CodeEditor
      readOnly
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
  ) : (
    <CodeEditor
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
  );
}

export default Chat;
