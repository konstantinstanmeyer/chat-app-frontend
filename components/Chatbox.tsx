import { Socket } from "socket.io-client"
import { ServerToClientEvents, ClientToServerEvents } from "../util/types/socket-io"

interface Props {
    server: Socket<ServerToClientEvents, ClientToServerEvents>;

}

export default function Chatbox({}){
    return(
        <div>
            hello
        </div>
    )
}