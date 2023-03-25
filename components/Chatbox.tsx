import { Socket } from "socket.io-client"
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "../util/types/socket-io"

// use generic types from socket.io documentation: https://socket.io/docs/v4/typescript/
interface Props {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

// holds logic for handling socket events, including emitting and receiving signals, also for displaying user-to-user communication
export default function Chatbox({ socket }: Props){

    return(
        <div>
            hello
        </div>
    )
}