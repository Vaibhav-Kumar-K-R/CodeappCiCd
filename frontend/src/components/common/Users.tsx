import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { RemoteUser, User, USER_CONNECTION_STATUS } from "@/types/user"
import Avatar from "react-avatar"

function Users() {
    const { users, currentUser } = useAppContext()

    return (
        <div className="flex min-h-[200px] flex-grow flex-col overflow-y-auto px-2 py-2">
            <div className="flex h-full w-full flex-col gap-3">
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
    const { username, status, socketId, canWrite } = user
    const title = `${username} - ${status === USER_CONNECTION_STATUS.ONLINE ? "online" : "offline"}`
    const { socket } = useSocket()
    const { setUsers, users } = useAppContext()

    const statusColor =
        status === USER_CONNECTION_STATUS.ONLINE ? "bg-green-500" : "bg-red-500"

    // Helper function to update the user's canWrite status locally for instant UI update
    const updateLocalUserWriteStatus = (newCanWrite: boolean) => {
        setUsers(
            users.map((u) =>
                u.socketId === socketId ? { ...u, canWrite: newCanWrite } : u,
            ) as RemoteUser[],
        )
    }

    const handleAllowWrite = () => {
        socket.emit(SocketEvent.ALLOW_WRITE, { socketId })
        updateLocalUserWriteStatus(true)
    }

    const handleDisallowWrite = () => {
        socket.emit(SocketEvent.DISALLOW_WRITE, { socketId })
        updateLocalUserWriteStatus(false)
    }

    const handleKickUser = () => {
        socket.emit(SocketEvent.KICK_USER, { socketId })
    }

    return (
        <div
            className="flex w-full items-center justify-between rounded-lg bg-gray-100 p-2 transition duration-150 hover:bg-gray-200"
            title={title}
        >
            <div className="flex min-w-0 items-center gap-3">
                <div className="relative">
                    <Avatar
                        name={username}
                        size="40"
                        round={"8px"}
                        title={title}
                    />
                    <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${statusColor}`}
                        title={
                            status === USER_CONNECTION_STATUS.ONLINE
                                ? "Online"
                                : "Offline"
                        }
                    ></div>
                </div>

                <p
                    className="truncate font-medium text-gray-800"
                    style={{ maxWidth: "120px" }}
                >
                    {username}
                </p>
            </div>

            {currentUser.isAdmin && currentUser.username !== username && (
                <div className="flex space-x-1.5">
                    <button
                        className={`rounded-full p-2 text-white shadow-md transition duration-150 ${
                            canWrite
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-green-500 hover:bg-green-600"
                        }`}
                        onClick={
                            canWrite ? handleDisallowWrite : handleAllowWrite
                        }
                        title={canWrite ? "Disallow Writing" : "Allow Writing"}
                    >
                        {canWrite ? "🚫" : "✏️"}
                    </button>

                    <button
                        className="rounded-full bg-red-500 p-2 text-white shadow-md transition duration-150 hover:bg-red-600"
                        onClick={handleKickUser}
                        title="Kick User"
                    >
                        {"🥾"}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Users
