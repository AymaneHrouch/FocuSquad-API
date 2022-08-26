import "./App.css";
import Timer from "./components/Timer";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketContext } from "./contexts/SocketContext";
import io from "socket.io-client";

function App() {
  console.log(process.env.REACT_APP_API_URL);
  const socket = io(process.env.REACT_APP_API_URL, { transports: ["websocket"] });

  return (
    <Router>
      <SocketContext.Provider value={{ socket }}>
        <Timer />
      </SocketContext.Provider>
    </Router>
  );
}

export default App;
