import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSocket } from "@/context/SocketContext" // adjust connection URL as needed
//@ts-ignore
interface WaitingRoomProps {
    roomId: string
    userName: string
}

const WaitingRoom = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { socket } = useSocket()
    const state = location.state as {
        roomId?: string
        userName?: string
    } | null
    const roomId = state?.roomId
    const userName = state?.userName

    useEffect(() => {
        // Listen for acceptance from server (admin)
        socket.on("joinAccepted", (roomIdAccepted: string) => {
            if (roomIdAccepted === roomId) {
                // Redirect user to the room page, e.g. /room/roomId
                navigate(`/room/${roomId}`)
            }
        })

        socket.on("joinRejected", () => {
            alert("Your request to join was rejected by the admin.")
            // Optional: redirect to home or elsewhere
            navigate("/")
        })

        // Cleanup listeners on unmount
        return () => {
            socket.off("joinAccepted")
            socket.off("joinRejected")
        }
    }, [roomId, userName, navigate])

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Waiting for approval to join room: {roomId}</h2>
            <p>
                Hello {userName}, please wait for the admin to approve your
                request...
            </p>
            <div>
                <small>
                    This page will redirect automatically once approved.
                </small>
            </div>
        </div>
    )
}

export default WaitingRoom
