import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import crypto from 'crypto'
import Link from "next/link";
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
      let randomID = crypto.randomBytes(20).toString('hex');
      socket.emit("createRoom", { username, randomID } );
      socket.emit('room-' + randomID);
    });

    socket.on('existingRoom', ({ username, messagerUsername }) => {

    });
  }, [])

  async function handleChange(name: string){
    setValue(name);
    socket.emit('outgoing-message', name);
  }

  // const time = ((new Date()).toString()).split(' ')[4].slice(0, -3);

  async function handleMessage(message: String){

  }

  return (
    <>
      <div>hello</div>
      <input type="text" value={value} onChange={e => handleChange(e.target.value)}/>
      <p>{incomingValue !== "" ? incomingValue : "nothing"}</p>
      <Link href={'/' + crypto.randomBytes(20).toString('hex')}>
        create room
      </Link>
    </>
  )
}
