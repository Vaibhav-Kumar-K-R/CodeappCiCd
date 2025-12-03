import { useCallStateHooks } from "@stream-io/video-react-sdk"

const MyMicButton = () => {
    const { useMicrophoneState, useLocalParticipant } = useCallStateHooks()
    const { microphone, isMute } = useMicrophoneState()
    const localParticipant = useLocalParticipant()
    const callRole = localParticipant?.roles
    console.log(callRole)

    return (
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
    )
}

export default MyMicButton
