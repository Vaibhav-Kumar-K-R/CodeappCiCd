import { User } from "@stream-io/video-react-sdk"
import jwt from "jsonwebtoken"

export function getToken(user: User): string {
    const token = jwt.sign(
        user,
        import.meta.env.VITE_STREAM_SECRET_KEY as string,
    )
    return token
}
