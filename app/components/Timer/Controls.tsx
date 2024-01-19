import { RepsTimer } from "./useRepsTimer";
import { isRunning } from "@lib/timers";

export type ControlsProps = Pick<RepsTimer, "current" | "running" | "pause" | "resume" | "next" | "continue" | "reset">

export function Controls({ current, running, pause, resume, next, reset, continue: continu }: ControlsProps) {
    const resetable = !!current && (isRunning(current) || current.time > 0);
    return (
        <div>
            {<button onClick={reset} disabled={!resetable}>Reset</button>}
            {<button onClick={continu}>Continue</button>}
            {<button onClick={next}>Next Rep</button>}
            {running && <button onClick={pause}>Pause</button>}
            {!running && <button onClick={resume}>Resume</button>}
        </div>
    );
}
