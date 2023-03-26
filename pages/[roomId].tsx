import { useRouter } from "next/router"
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../util/types/socket-io"

interface Props {
    socket: Socket<any>;
}

export default function Chat({ socket }: Props){
    const router = useRouter();
    const { query = {} } = router || {};
    const { roomId = undefined } = query || {};
    const username = "clown"

    useEffect(() => {
        if(router.isReady){
            socket.emit('joinRoom', { username, roomId });
        }
    }, [router.isReady])

    return(
        <div>

        </div>
    )
}