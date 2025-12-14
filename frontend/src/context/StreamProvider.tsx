// StreamProvider.tsx
import {
    Call,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    type User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { ReactNode, useEffect, useState } from "react";
import { useAppContext } from "./AppContext";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

interface StreamVideoProviderProps {
    children: ReactNode;
}

export default function StreamVideoProvider({
    children,
}: StreamVideoProviderProps) {
    const { currentUser } = useAppContext();

    const [streamToken, setStreamToken] = useState<string | null>(null);
    const [call, setCall] = useState<Call | undefined>(undefined);
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const callId = currentUser.roomId;

    // 1. ⚙️ EFFECT: Fetch Token (Depends on currentUser)
    useEffect(() => {
        // Only fetch if user data is ready AND we don't already have a token
        if (!currentUser.username || !currentUser.roomId || streamToken) return;

        const fetchStreamToken = async () => {
            const userId = `${currentUser.roomId}-${currentUser.username}`;
            
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/stream-token`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user_id: userId,
                            name: currentUser.username,
                            image: `https://getstream.io/random_svg/?id=${currentUser.roomId}&name=${currentUser.username}`,
                        }),
                    }
                );

                if (!response.ok) throw new Error("Failed to fetch Stream token from backend");

                const data = await response.json();
                setStreamToken(data.token);
                console.log("Stream token successfully fetched.");
            } catch (error) {
                console.error("Error fetching Stream token:", error);
            }
        };

        fetchStreamToken();
    }, [currentUser.username, currentUser.roomId]); // Removed streamToken from dependencies to avoid loop, it's checked in the guard clause.

    // 2. 🤝 EFFECT: Initialize Client (Depends on streamToken)
    useEffect(() => {
        const { username, roomId } = currentUser;

        // Check 1: User data and token must be available
        // Check 2: Client hasn't been created yet
        if (apiKey && username && roomId && streamToken && !client) {
            const userId = `${roomId}-${username}`;
            const user: User = {
                id: userId,
                name: username,
                image: `https://getstream.io/random_svg/?id=${roomId}&name=${username}`,
            };

            console.log("Initializing StreamVideoClient with dynamic data.");
            console.log(streamToken);
            
            const newClient = new StreamVideoClient({
                apiKey,
                user,
                token: streamToken,
            });
            setClient(newClient); // Set client state, which triggers next effect
        }
        
        // Cleanup function for client (if needed, but usually Stream SDK handles disconnection)
        // return () => { 
        //     client?.disconnectUser(); 
        // };
    }, [apiKey, currentUser, streamToken, client]); // client in deps ensures we only run once

    // 3. 📞 EFFECT: Create and Join Call (Depends on client)
    useEffect(() => {
        // Wait for both client and call to be ready
        if (!client) {
            console.log("Client not ready, skipping call setup.");
            return;
        }

        const newCall = client.call("audio_room", callId);
        setCall(newCall);

        const joinCall = async () => {
            try {
                await newCall.join({
                    create: true,
                    data: {
                        members: [],
                        custom: {
                            title: "",
                            description: "",
                        },
                        settings_override:{
                          backstage:{
                            enabled:false
                          }
                        }
                    },
                });
                console.log("Call joined successfully");
            } catch (error) {
                console.error("Failed to join call", error);
            }
        };

        joinCall();

        // Cleanup: Leave the call when the component unmounts or client/call changes
        return () => {
            newCall.leave();
            console.log("Call left on cleanup");
        };
    }, [client, callId]); // DEPENDS ON client being stable

    // 4. Render State
    if (!client || !call) { // Now waits for BOTH client and call to be ready
        return <div>Connecting to Stream...</div>;
    }

    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>{children}</StreamCall>
        </StreamVideo>
    );
}