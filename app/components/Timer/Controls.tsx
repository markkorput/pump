import { RepsTimer } from "./useRepsTimer";
import { isRunning } from "@lib/timers";

export type ControlsProps = Pick<RepsTimer, "current" | "running" | "pause" | "resume" | "next" | "continue" | "reset">

export function Controls({ current, running, pause, resume, next, reset, continue: continu }: ControlsProps) {
    const resetable = !!current && (isRunning(current) || current.time > 0);
    return (
        <div style={{position: "fixed", left: 0, bottom: 0, width: "100%", height:"50%", maxHeight:400}}>
            {<button style={{width:"33%", height:"50%"}} onClick={reset} disabled={!resetable}>Reset</button>}
            {<button style={{width:"34%", height:"50%"}} onClick={continu}>Continue</button>}
            {<button style={{width:"33%", height:"50%"}} onClick={next}>Next Rep</button>}
            {running && <button style={{width:"100%", height:"50%"}} onClick={pause}>Pause</button>}
            {!running && <button style={{width:"100%", height:"50%"}} onClick={resume}>Resume</button>}
        </div>
    );
}
