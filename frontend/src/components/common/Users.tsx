import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { RemoteUser, User, USER_CONNECTION_STATUS } from "@/types/user"
import Avatar from "react-avatar"

function Users() {
    const { users, currentUser } = useAppContext()

    return (
        <div className="flex min-h-[200px] flex-grow justify-center overflow-y-auto py-2">
            <div className="flex h-full w-full flex-wrap items-start gap-x-2 gap-y-6">
                {users.map((user) => {
                    return (
                        <RoomUser
                            key={user.socketId}
                            user={user}
                            currentUser={currentUser}
                        />
                    )
                })}
            </div>
        </div>
    )
}

const RoomUser = ({
    user,
    currentUser,
}: {
    user: RemoteUser
    currentUser: User
}) => {
    const { username, status, socketId } = user
    const title = `${username} - ${status === USER_CONNECTION_STATUS.ONLINE ? "online" : "offline"}`
    const { socket } = useSocket()

    return (
        <div
            className="relative flex w-full flex-row items-center justify-around gap-2 text-black"
            title={title}
        >
            <Avatar name={username} size="50" round={"12px"} title={title} />
            <p className="line-clamp-2 max-w-full text-ellipsis break-words">
                {username}
            </p>
            {currentUser.isAdmin && currentUser.username != username && (
                <div>
                    <button
                        className="m-1 bg-yellow-100 p-1"
                        onClick={() => {
                            socket.emit(SocketEvent.ALLOW_WRITE, {
                                socketId,
                            })
                        }}
                    >
                        Allow
                    </button>
                    <button
                        className="m-1 bg-slate-100 p-1"
                        onClick={() => {
                            socket.emit(SocketEvent.DISALLOW_WRITE, {
                                socketId,
                            })
                        }}
                    >
                        Disallow
                    </button>
                    <button className="m-1 bg-red-300 p-1">3</button>
                </div>
            )}
            <div
                className={`absolute left-10 top-0 h-3 w-3 rounded-full ${
                    status === USER_CONNECTION_STATUS.ONLINE
                        ? "bg-green-500"
                        : "bg-danger"
                }`}
            ></div>
        </div>
    )
}

export default Users
