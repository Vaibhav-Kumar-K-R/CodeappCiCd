import {
    useCallStateHooks,
    ParticipantsAudio,
} from "@stream-io/video-react-sdk"

const MyMicButton = () => {
    const { useMicrophoneState, useLocalParticipant, useParticipants } =
        useCallStateHooks()
    const { microphone, isMute } = useMicrophoneState()
    const localParticipant = useLocalParticipant()
    const participants = useParticipants()
    const callRole = localParticipant?.roles
    console.log(callRole)

    return (
        <div>
            <ParticipantsAudio participants={participants} />
            <button
                className="mic-button"
                onClick={async () => {
                    if (isMute) {
                        await microphone.enable()
                    } else {
                        await microphone.disable()
                    }
                }}
            >
                {isMute ? "Unmute" : "Mute"}
            </button>
        </div>
    )
}

export default MyMicButton
