import React, { useEffect, useState,useRef } from "react";
import "./Chat.css";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList,setMessageList] = useState([])
  const messageEl = useRef(null)
  
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
         
      };
   
     await socket.emit("send_message", messageData);
   
     setMessageList((list) => [...list,messageData])
     setCurrentMessage("")
    }

    
  };

  useEffect(() => {
 
     socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((list) => [...list,data])
      console.log("data: " + data.message)
      console.log("messagelist: ",messageList)
     
    });

  }, [socket]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

 

  return (
    <div className="container__chat" ref={messageEl}>
      <div className="header__chat">Live Chat</div>
      {messageList.map((messageContent,index) => <div key={index} className= {`container__textbox ${username === messageContent.author ? 'you':'else'}`}>
     
      <div className="textbox__message">{messageContent.message}</div>
       <div className="textbox__option">
       <p className="textbox__option__showtime">{messageContent.time}</p>
       <p className="text-box__option__showauthor">{messageContent.author}</p>
     </div>
     </div>)
      }{console.log(messageList)}
      <div className="container__chat__sendmessage">
        <input
        onKeyDown={(e) => e.key ==='Enter' && sendMessage()}
        value={currentMessage}
          className="chat__input__sendmessage"
          placeholder="Message..."
          onChange={(e) => setCurrentMessage(e.target.value)}
        ></input>
        <button onClick={sendMessage} className="chat__button__sendmessage">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
