import { useState, useEffect, useCallback } from "react";
import { getCurrentFrameTime } from "@lib/frames";
import { type Timer, StoppedTimer, getCurrentTime, isRunning, startTimer, stopTimer, toggleTimer } from "@lib/timers";

export interface RepsTimer {
    running: boolean,
    current?: Timer,
    reps: StoppedTimer[],
    pause: () => void,
    resume: () => void,
    next: () => void,
    reset: () => void,
    continue: () => void
}

export interface UseRepsTimerProps {
    running?: boolean;
}

export function useRepsTimer(props: UseRepsTimerProps): RepsTimer {
    const [running, setRunning] = useState(props.running === true);
    const [reps, setReps] = useState<StoppedTimer[]>([]);
    const [current, setCurrent] = useState<Timer>();

    const pause = useCallback(() => setRunning(false), [setRunning]);
    const resume = useCallback(() => setRunning(true), [setRunning]);

    const shift = useCallback(async (nextStartTime: number) => { 
        const t = await getCurrentFrameTime();
        const rep = (current || {time: 0});
        setReps((currentReps) => [
            ...currentReps,
            isRunning(rep) ? stopTimer(rep, t) : rep
        ]);
        const nextTimer = {time: nextStartTime};
        setCurrent(running ? startTimer(nextTimer, t) : nextTimer);
    }, [running, current, setReps]);

    const next = useCallback(async () => shift(0), [shift]);

    const continu = useCallback(async () => {
        shift(current
            ? isRunning(current)
                ? await getCurrentTime(current, await getCurrentFrameTime())
                : current.time
            : 0);
    }, [shift, current]);

    const reset = useCallback(async () => {
        const t = await getCurrentFrameTime();
        setCurrent((cur) =>
            cur && isRunning(cur)
                ? startTimer({ time: 0}, t)
                : {time: 0})
    }, []);

    useEffect(() => {
        if (current && isRunning(current) === running) return;

        getCurrentFrameTime().then((t) => {
            if (current) {
                setCurrent(toggleTimer(current, t));
                return;
            }

            setCurrent(running ? { systemStartTime: t} : {time: 0});
        })
    }, [running, current]);

    return {
        running,
        current,
        reps,
        pause,
        resume,
        next,
        reset,
        continue: continu
    };
}

export default useRepsTimer;