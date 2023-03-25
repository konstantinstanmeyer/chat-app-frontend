import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { randomUUID } from 'crypto'
const socket = io('http://localhost:3001');

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [incomingValue, setIncomingValue] = useState<string>("");
  const room = useRef<string>();

  useEffect(() => {
    socket.emit('client-ready');

    socket.on('incomingMessage', (state) => {
      setIncomingValue(state);
    });

    socket.on('createRoom', ({ username }) => {
      let randomID = randomUUID();
      socket.emit("joinRoom" + { username, randomID } );
      socket.emit('room-' + randomID);
    });

    socket.on('existingRoom', ({ username, messagerUsername }) => {

    });
  }, [])

  async function handleChange(name: string){
    setValue(name);
    socket.emit('outgoing-message', name);
  }

  return (
    <>
      <div>hello</div>
      <input type="text" value={value} onChange={e => handleChange(e.target.value)}/>
      <p>{incomingValue !== "" ? incomingValue : "nothing"}</p>
    </>
  )
}
