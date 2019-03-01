import * as React from "react";

const { useState, useRef, useEffect } = React;
const io = require("socket.io-client");
const socket = io("http://127.0.0.1:8080");

export const App: React.FC<{}> = () => {
  const inputRef = useRef(null);
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("new message", data => {
      console.log(data);
      setMessageList([...messageList, data]);
    });
  });

  const sendMessage = () => {
    const data = inputRef.current.value;
    inputRef.current.value = "";
    socket.emit("new message", data);
    setMessageList([...messageList, data]);
  };

  return (
    <div>
      <h2>Simple Chat ver.1</h2>
      <input type="text" ref={inputRef} />
      <button onClick={sendMessage}>送信</button>
      <ul>
        {messageList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
