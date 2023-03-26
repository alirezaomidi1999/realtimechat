import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
function App() {

  const [username, setUsername] = useState("");
  // const [userList,setUserList] = useState([])
  const [showChat, setShowChat] = useState(false);
  const [room, setRoom] = useState("");

  // const [userList,setUserList] = useState([])

  return (
    <div className="container">
    
    
      {!showChat ? (
        <Login
          setRoom={setRoom}
          room={room}
          setUsername={setUsername}
          socket={socket}
          username={username}
          setShowChat={setShowChat}
          
          // setUserList={setUserList}
         
        />
      ) : (
        <Chat
          setRoom={setRoom}
          room={room}
          setUsername={setUsername}
          socket={socket}
          username={username}
        />
      )}
        </div>
    
  );
}

export default App;
