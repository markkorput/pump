import { formatTime } from "@lib/format";
import { useTimerTime } from "@lib/timers";

import { Controls } from "./Controls";
import { Reps } from "./Reps";
import { useRepsTimer } from "./useRepsTimer";




export interface TimerProps {
    running?: boolean;
}

export function Timer(props: TimerProps) {
    const { current, ...repsTimer } = useRepsTimer({
        running: props.running
    });

    const currentTime = formatTime(useTimerTime(current || { time: 0 }))

    return (<div style={{margin:"auto", width:"80%"}}>
        <h1 style={{fontSize:"120pt", margin:"auto", width:"fit-content"}}>{currentTime}</h1> 
        <Controls {...repsTimer} current={current} />
        <Reps {...repsTimer} />
       
    </div>);
}

export default Timer;