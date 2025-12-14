import Select from "@/components/common/Select"
import { useSettings } from "@/context/SettingContext"
import useResponsive from "@/hooks/useResponsive"
import { editorFonts } from "@/resources/Fonts"
import { editorThemes } from "@/resources/Themes"
import { langNames } from "@uiw/codemirror-extensions-langs"
import { ChangeEvent, useEffect, useState } from "react"
import {
    ParticipantsAudio,
    useCallStateHooks,
} from "@stream-io/video-react-sdk"
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { GiSpeakerOff } from "react-icons/gi";

function SettingsView() {
    const {
        theme,
        setTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,

        resetSettings,
    } = useSettings()
    const { viewHeight } = useResponsive()

    const [callAudio, setCallAudio] = useState(true)

    const { useParticipants } = useCallStateHooks()
    const participants = useParticipants()

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontFamily(e.target.value)
    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setTheme(e.target.value)
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setLanguage(e.target.value)
    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontSize(parseInt(e.target.value))

    useEffect(() => {
        // Set editor font family
        const editor = document.querySelector(
            ".cm-editor > .cm-scroller",
        ) as HTMLElement
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])
    
    return (
        <div
        className="flex flex-col  items-center gap-2 p-4"
        style={{ height: viewHeight }}
        >
             <ParticipantsAudio participants={participants} />
            <h1 className="view-title">Settings</h1>
            {/* Choose Font Family option */}
            <div className="flex w-full items-end gap-2">
                <Select
                    onChange={handleFontFamilyChange}
                    value={fontFamily}
                    options={editorFonts}
                    title="Font Family"
                />
                {/* Choose font size option */}
                <select
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="bg-darkHover rounded-md border-none px-4 py-2 text-black outline-none"
                    title="Font Size"
                >
                    {[...Array(13).keys()].map((size) => {
                        return (
                            <option key={size} value={size + 12}>
                                {size + 12}
                            </option>
                        )
                    })}
                </select>
            </div>
            {/* Choose theme option */}
            <Select
                onChange={handleThemeChange}
                value={theme}
                options={Object.keys(editorThemes)}
                title="Theme"
            />
            {/* Choose language option */}
            <Select
                onChange={handleLanguageChange}
                value={language}
                options={langNames}
                title="Language"
            />
            <br />
            <div className="flex flex-row justify-start gap-2 items-center  w-full">
                <p>Call Audio</p>
                <button
                className="text-3xl"
                    onClick={() => {
                        setCallAudio((prev) => !prev)
                    }}
                >
                    {callAudio ? <HiMiniSpeakerWave></HiMiniSpeakerWave> : <GiSpeakerOff></GiSpeakerOff>}
                </button>
            </div>

            <button
                className="bg-darkHover mt-auto w-full rounded-md border-none px-4 py-2 text-white outline-none"
                onClick={resetSettings}
            >
                Reset to default
            </button>
        </div>
    )
}

export default SettingsView
