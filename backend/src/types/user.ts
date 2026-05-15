enum USER_CONNECTION_STATUS {
  OFFLINE = "Offline",
  ONLINE = "Online",
}

interface User {
  username: string;
  roomId: string;
  socketId: string;
  status: USER_CONNECTION_STATUS;
  typing: boolean;
  currentFile: string | null;
  cursorPosition: number;
  isAdmin?: boolean;
  canWrite?: boolean;
  canDraw?: boolean;
  token?: string;
}

export { USER_CONNECTION_STATUS, User };
