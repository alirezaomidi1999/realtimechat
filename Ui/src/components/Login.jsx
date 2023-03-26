import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./Login.css";

function Login({ socket, setUsername, username, room, setRoom, setShowChat }) {
  const [showUserExist, setShowUserExist] = useState(false);
  const joinRoom = async () => {
    if (username !== "" && room !== "") {
      socket.off("username").on("username", (data) => {
        console.log("data: ", data);
        if (data) {
          setShowUserExist(true);
        } else {
          setShowChat(true);
        }
      });

      await socket.emit("join_room", { room, username });
    }
  };
  return (
    <>
      {showUserExist ? (
        <div className="container__show__userexist">
          <p className="text__show_userexist">
            someone is exist with this username in this room
          </p>
          <CloseOutlinedIcon
            className="icon__closemodal__userexist"
            onClick={() => setShowUserExist(false)}
          ></CloseOutlinedIcon>
        </div>
      ) : (
        <div className="container__login">
          <span className="login__title">Login</span>
          <div className="container__login__inputs">
            <input
              value={username}
              className="login__username__input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              value={room}
              className="login__room__input"
              type="text"
              placeholder="Room"
              onChange={(e) => setRoom(e.target.value)}
            ></input>
          </div>
          <button onClick={joinRoom} className="login__button__join">
            join
          </button>
        </div>
      )}
    </>
  );
}

export default Login;
