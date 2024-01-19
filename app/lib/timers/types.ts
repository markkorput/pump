export type StoppedTimer = {
    time: number;
}

export type RunningTimer = {
    systemStartTime: number;
    timerStartTime?: number;
}

export type Timer = StoppedTimer | RunningTimer;
