import { useState, useEffect, useRef, SyntheticEvent } from "react"
import { io } from "socket.io-client"

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [incomingValue, setIncomingValue] = useState<string | null>(null);
  const [checkId, setCheckId] = useState<string>("")
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<string>("");
  const [messages, setMessages] = useState<Array<any>>([])
  const socket = io('http://localhost:3001');
  const username = "clown"

  useEffect(() => {
    socket.emit('client-ready');

    socket.on('message', (state) => {
      console.log("yes")
      setMessages([...messages, state])
    });

    socket.on('error', (error) => {
      setError(error);
    })
  }, [socket])

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
    socket.emit('joinRoom', { username, room: room })
  }

  return (
    <>
      {room ? 
      <>
        {room}
        <div>
          <form onSubmit={joinRoom}>
            <input value={room} onChange={e => setRoom(e.target.value)} />
            <button type="submit">submit</button>
          </form>
          <form onSubmit={sendMessage}>
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
          <p>join room</p>
          <form onSubmit={joinRoom}>
            <input value={room} onChange={e => setRoom(e.target.value)} />
            <button type="submit">submit</button>
          </form>
          <form onSubmit={sendMessage}>
            <input value={value} onChange={e => setValue(e.target.value)} />
            <button type="submit">submit</button>
          </form>
        </div>
      </>
      }
      {error}
    </>
  )
}
