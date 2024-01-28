import { useMemo, useState } from "react";
import { useFrame } from "@lib/frames";
import { Timer } from "./types";
import { isRunning, getTime, stopTimer, startTimer } from "./helpers";
export interface TimerProps {
  duration: number;
}

export function useTimer() {
  const [timer, setTimer] = useState<Timer>({ time: 0 });
  const [time, setTime] = useState<number>();

  useFrame(() => {
    if (isRunning(timer)) {
      setTime(getTime(timer));
    }
  });

  return useMemo(
    () => ({
      start: () => {
        if (!isRunning(timer)) setTimer(startTimer(timer));
      },
      stop: () => {
        if (isRunning(timer)) setTimer(stopTimer(timer));
      },
      reset: () => {
        setTimer({ time: 0 });
        setTime(0);
      },
      time,
      running: isRunning(timer),
    }),
    [timer, time],
  );
}

export default useTimer;
