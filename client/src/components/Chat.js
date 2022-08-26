import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";
import io from "socket.io-client";
const socket = io("http://localhost:5000", { transports: ["websocket"] });

const Chat = () => {
  const { socket } = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Get list of users
    socket.on("roomUsers", ({ users }) => {
      setUsers(users);
    });

    // Get a message
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    return () => {
      socket.off("roomUsers");
      socket.off("message");
    };
  }, []);

  const handleSubmit = () => {
    socket.emit("chatMessage", message);
    setMessage("");
  };

  return (
    <>
      <h1>This is chat</h1>
      <h2>List of users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message.time}>
            {message.username}: {message.text} at {message.time}
          </li>
        ))}
      </ul>
      <label htmlFor="message">Write a message:</label>
      <input id="message" value={message} onChange={e => setMessage(e.target.value)}></input>
      <button onClick={handleSubmit}>Send</button>
    </>
  );
};

export default Chat;
