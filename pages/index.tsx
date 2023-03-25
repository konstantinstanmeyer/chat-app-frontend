import { useState, useEffect } from "react"
import { io } from "socket.io-client"
const socket = io('http://localhost:3001');

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [incomingValue, setIncomingValue] = useState<string>("");

  useEffect(() => {
    socket.emit('client-ready')

    socket.on('outgoing-message', (state) => {
      setIncomingValue(state);
    })
  }, [])

  async function handleChange(name: string){
    setValue(name);
    socket.emit('incoming-message', name);
  }

  return (
    <>
      <div>hello</div>
      <input type="text" value={value} onChange={e => handleChange(e.target.value)}/>
      <p>{incomingValue !== "" ? incomingValue : "nothing"}</p>
    </>
  )
}
