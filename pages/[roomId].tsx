import { useRouter } from "next/router"
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../util/types/socket-io"

interface Props {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

export default function Chat({ socket }: Props){
    const router = useRouter();
    const { query = {} } = router || {};
    const { roomId = undefined } = query || {};

    useEffect(() => {
        if(router.isReady){

        }
    }, [router.isReady])

    return(
        <div>

        </div>
    )
}