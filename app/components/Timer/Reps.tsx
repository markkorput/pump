import { useMemo } from "react";
import { type StoppedTimer } from "@lib/timers";
import { formatTime } from "@lib/format";

export interface RepsProps {
    reps: StoppedTimer[];
}

export function Reps({ reps }: RepsProps) {
    const lines = useMemo(() => [...reps].reverse().map((rep, idx) => {
        const no = reps.length - idx;
        return (
            <div key={`rep-${no}`}>
                #{no.toString().padStart(2, '0')} - {formatTime(rep.time)}s
            </div>);
    }), [reps]);

    return (<>
        {lines}       
    </>);
}
