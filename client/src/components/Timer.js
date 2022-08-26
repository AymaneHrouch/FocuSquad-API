import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../contexts/SocketContext";
import Chat from "./Chat";

const Timer = () => {
  const { socket } = useContext(SocketContext);

  const location = useLocation();
  const room = location.pathname.substring(1);

  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(60);
  const username = new URLSearchParams(location.search).get("username");

  const startCountdown = () => {
    socket.emit("startCountdown", { room, duration: duration });
  };

  const stopCountdown = () => {
    socket.emit("stopCountdown");
  };

  const resumeCountdown = () => {
    socket.emit("startCountdown", { room, duration: count });
  };

  useEffect(() => {
    console.log("rendered");
    socket.emit("joinRoom", { username: username, room });
    socket.on("countdown", count => {
      setCount(count);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = count;
  }, [count]);
  return (
    <>
      <ul>
        <li>room: {room}</li>
        <li>username: {username}</li>
        <li>
          <label htmlFor="duration">duration</label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
          ></input>
        </li>
      </ul>
      <br />
      <button onClick={startCountdown}>Start Countdown</button>
      <button onClick={stopCountdown}>Stop Countdown</button>
      <button onClick={resumeCountdown}>Resume Countdown</button>
      <Chat />
      <div>{count || ""}</div>
    </>
  );
};

export default Timer;
