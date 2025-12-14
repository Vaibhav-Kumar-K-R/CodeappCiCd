import SidebarButton from "@/components/sidebar/sidebar-views/SidebarButton"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { useViews } from "@/context/ViewContext"
import useResponsive from "@/hooks/useResponsive"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ACTIVITY_STATE } from "@/types/app"
import { SocketEvent } from "@/types/socket"
import { VIEWS } from "@/types/view"
import cn from "classnames"
import {
    useCallStateHooks,
    ParticipantsAudio,
} from "@stream-io/video-react-sdk"
import { IoCodeSlash } from "react-icons/io5"
import { Tooltip } from "react-tooltip"
import { tooltipStyles } from "./tooltipStyles"
import { MdOutlineDraw } from "react-icons/md"
import { useState } from "react"
import { PiMicrophone } from "react-icons/pi"
import { BiMicrophoneOff } from "react-icons/bi"

function Sidebar() {
    const {
        activeView,
        isSidebarOpen,
        viewComponents,
        viewIcons,
        setIsSidebarOpen,
    } = useViews()
    const { minHeightReached } = useResponsive()
    const { activityState, setActivityState } = useAppContext()
    const { useMicrophoneState, useParticipants } = useCallStateHooks()
    const { microphone, isMute } = useMicrophoneState()
    const participants = useParticipants()

    const { socket } = useSocket()
    const { isMobile } = useWindowDimensions()
    const [callMuted, setCallMuted] = useState(isMute)

    //@ts-ignore
    const [showTooltip, setShowTooltip] = useState(true)
    //@ts-ignore
    const changeState = () => {
        setShowTooltip(false)
        if (activityState === ACTIVITY_STATE.CODING) {
            setActivityState(ACTIVITY_STATE.DRAWING)
            socket.emit(SocketEvent.REQUEST_DRAWING)
        } else {
            setActivityState(ACTIVITY_STATE.CODING)
        }

        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    return (
        <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
            <div
                className={cn(
                    "fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-4 self-end overflow-hidden border-t bg-[#252526] p-2 text-white    md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:justify-between md:border-r md:border-t-0 md:p-2 md:pt-4",
                    {
                        hidden: minHeightReached,
                    },
                )}
            >
                <ParticipantsAudio participants={participants} />
                <div>
                    <SidebarButton
                        viewName={VIEWS.FILES}
                        icon={viewIcons[VIEWS.FILES]}
                    />
                    <SidebarButton
                        viewName={VIEWS.CHATS}
                        icon={viewIcons[VIEWS.CHATS]}
                    />
                    <SidebarButton
                        viewName={VIEWS.COPILOT}
                        icon={viewIcons[VIEWS.COPILOT]}
                    />
                    <SidebarButton
                        viewName={VIEWS.RUN}
                        icon={viewIcons[VIEWS.RUN]}
                    />
                    <SidebarButton
                        viewName={VIEWS.CLIENTS}
                        icon={viewIcons[VIEWS.CLIENTS]}
                    />
                    {/* <div className="flex h-fit items-center justify-center">
                    <button
                        className="justify-cente flex items-center  rounded p-1.5 transition-colors duration-200 ease-in-out hover:bg-[#3D404A]"
                        onClick={changeState}
                        onMouseEnter={() => setShowTooltip(true)}
                        data-tooltip-id="activity-state-tooltip"
                        data-tooltip-content={
                            activityState === ACTIVITY_STATE.CODING
                                ? "Switch to Drawing Mode"
                                : "Switch to Coding Mode"
                        }
                    >
                        {activityState === ACTIVITY_STATE.CODING ? (
                            <MdOutlineDraw size={30} />
                        ) : (
                            <IoCodeSlash size={30} />
                        )}
                    </button>
                    {showTooltip && (
                        <Tooltip
                            id="activity-state-tooltip"
                            place="right"
                            offset={15}
                            className="!z-50"
                            style={tooltipStyles}
                            noArrow={false}
                            positionStrategy="fixed"
                            float={true}
                        />
                    )}
                </div> */}
                </div>
                <div>
                    <div className="rounded text-center text-3xl hover:bg-[#3D404A] ">
                        <button
                            className="mic-button"
                            onClick={async () => {
                                if (isMute) {
                                    await microphone.enable()
                                    setCallMuted(false)
                                } else {
                                    await microphone.disable()
                                    setCallMuted(true)
                                }
                            }}
                        >
                            {!callMuted ? (
                                <PiMicrophone />
                            ) : (
                                <BiMicrophoneOff />
                            )}
                        </button>
                    </div>
                    <SidebarButton
                        viewName={VIEWS.SETTINGS}
                        icon={viewIcons[VIEWS.SETTINGS]}
                    />
                </div>
                {/* Button to change activity state coding or drawing */}
            </div>
            <div
                className="absolute left-0 top-0 z-20 w-full flex-col bg-[#252526] text-white md:static md:min-w-[300px]"
                style={isSidebarOpen ? {} : { display: "none" }}
            >
                {viewComponents[activeView]}
            </div>
        </aside>
    )
}

export default Sidebar
