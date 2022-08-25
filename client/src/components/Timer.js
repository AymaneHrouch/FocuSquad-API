import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000", { transports: ["websocket"] });

const Timer = () => {
  const [count, setCount] = useState(0);

  const startCountdown = () => {
    socket.emit("countdown");
  };

  const stopCountdown = () => {
    socket.emit("stopCountdown");
  };

  useEffect(() => {
    console.log("rendered");

    socket.on("countdown", count => {
      setCount(count);
    });
  }, []);
  return (
    <>
      <h1>Hello I'm timer</h1>
      <button onClick={startCountdown}>Start Countdown</button>
      <button onClick={stopCountdown}>Stop Countdown</button>
      <span>{count || "Nothing yet"}</span>
    </>
  );
};

export default Timer;
