import { formatTime } from "@lib/format";
import { useTimerTime } from "@lib/timers";

import { Controls } from "./Controls";
import { Reps } from "./Reps";
import { useRepsTimer } from "./useRepsTimer";




export interface TimerProps {
    running?: boolean;
}

export function Timer(props: TimerProps) {
    const { current, reps, ...repsTimer } = useRepsTimer({
        running: props.running
    });

    const currentTime = formatTime(useTimerTime(current || { time: 0 }))

    return (<div style={{margin:"auto", width:"fit-content"}}>
        <h1 style={{fontSize:"120pt"}}>{currentTime}</h1> 
        <Reps reps={reps} />

        <Controls {...repsTimer} current={current} />
    </div>);
}

export default Timer;