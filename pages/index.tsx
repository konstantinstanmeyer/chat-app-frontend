import { useState, useEffect, useRef, SyntheticEvent } from "react"
import { Message } from "@/util/types/home";
import { io } from "socket.io-client"

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<Array<any>>([]);
  const socket = io('http://localhost:3001');
  const username = "clown";

  useEffect(() => {
    socket.emit('client-ready');

    socket.on('message', (state) => {
      console.log("yes")
      setMessages([...messages, state])
      console.log(messages)
    });

    socket.on('error', (error) => {
      setError(error);
    })

    socket.on('receiveMessage', (message: Message) => {
      console.log(message);
      setMessages(messages => [...messages, message])
    })

    return () => {
      socket.off('message')
      socket.off('error');
      socket.off('receiveMessage');
    }
  }, [])

  // const time = ((new Date()).toString()).split(' ')[4].slice(0, -3);

  async function sendMessage(e: SyntheticEvent){
    e.preventDefault();

    await socket.emit('sendMessage', { username: username, message: value, room: room })
  }

  async function createRoom(){
    const randomNum = Math.floor( Math.random() * 9 )
    setRoom("room" + randomNum);
    socket.emit('joinRoom', { username, room: "room" + randomNum });
  }

  async function joinRoom(e: SyntheticEvent){
    e.preventDefault()
    if(roomId !== ""){
      socket.emit('joinRoom', { username, room: roomId })
      setRoom(roomId);
    }
  }

  return (
    <>
      {room ? 
      <>
        {room}
        <div>
          <form onSubmit={sendMessage}>
            <p>send message</p>
            <input value={value} onChange={e => setValue(e.target.value)} />
            <button type="submit">submit</button>
          </form>
          {messages.map((message, index) => (
              <div key={index}>
                <p>{message.username}</p>
                <p>{message.message}</p>
              </div>
          ))}
        </div>
      </> : 
      <>
        <button onClick={() => createRoom()}>
          create room
        </button>
        <div>
          <form onSubmit={joinRoom}>
            <p>join room</p>
            <input value={roomId} onChange={e => setRoomId(e.target.value)} />
            <button type="submit">submit</button>
          </form>
        </div>
      </>
      }
      {error}
    </>
  )
}
