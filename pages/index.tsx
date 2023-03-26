import { useState, useEffect, useRef, SyntheticEvent } from "react"
import { io } from "socket.io-client"
import crypto from 'crypto'
import Link from "next/link";
const socket = io('http://localhost:3001');

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [incomingValue, setIncomingValue] = useState<string | null>(null);
  const [checkId, setCheckId] = useState<string>("")
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<string>("");
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

  async function handleMessage(message: String){

  }

  async function createRoom(){
    const randomHex = crypto.randomBytes(20).toString('hex')
    setRoom("room1");
    socket.emit('joinRoom', { username, room: "room1" });
  }

  async function joinRoom(e: SyntheticEvent){
    e.preventDefault()
    
    socket.emit('joinRoom', { username, room: "room1" })
  }

  return (
    <>
      {room ? room : 
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
