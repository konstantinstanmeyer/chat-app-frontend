import { useState, useEffect, useRef, SyntheticEvent } from "react"
import { io } from "socket.io-client"
const socket = io('http://localhost:3001');

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [incomingValue, setIncomingValue] = useState<string | null>(null);
  const [checkId, setCheckId] = useState<string>("")
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<string>("");
  const [messages, setMessages] = useState<Array<any>>([])
  const username = "clown"

  useEffect(() => {
    socket.emit('client-ready');

    socket.on('incomingMessage', (state) => {
      setIncomingValue(state);
    });

    socket.on('error', (error) => {
      setError(error);
    })
  }, [])

  async function handleChange(name: string){
    setValue(name);
    socket.emit('outgoing-message', name);
  }

  // const time = ((new Date()).toString()).split(' ')[4].slice(0, -3);

  async function sendMessage(e: SyntheticEvent){
    e.preventDefault();

    
  }

  async function createRoom(){
    const randomNum = Math.floor( Math.random() * 9 )
    setRoom("room1");
    socket.emit('joinRoom', { username, room: randomNum });
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
          <form onSubmit={sendMessage}>
            <input value={checkId} onChange={e => setCheckId(e.target.value)} />
            <button type="submit">submit</button>
          </form>
          {messages.map((message, index) => (
              <div key={index}>
                <p>{message.text}</p>
                <p>{message.user}</p>
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
            <input value={checkId} onChange={e => setCheckId(e.target.value)} />
            <button type="submit">submit</button>
          </form>
        </div>
      </>
      }
      {error}
    </>
  )
}
