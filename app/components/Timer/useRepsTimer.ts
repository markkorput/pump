import { useState, useEffect, useCallback } from "react";
import { getCurrentFrameTime } from "@lib/frames";
import {
  type Timer,
  StoppedTimer,
  getCurrentTime,
  isRunning,
  startTimer,
  stopTimer,
  toggleTimer,
} from "@lib/timers";

export type Rep = StoppedTimer & { name: string };

export interface RepsTimer {
  running: boolean;
  current?: Timer;
  reps: Rep[];
  pause: () => void;
  resume: () => void;
  next: () => void;
  reset: () => void;
  continue: () => void;
  remove: (timer: Timer) => void;
  updateRep: (rep: Rep, timer: Partial<Rep>) => void;
}

export interface UseRepsTimerProps {
  running?: boolean;
}

export function useRepsTimer(props: UseRepsTimerProps): RepsTimer {
  const [running, setRunning] = useState(props.running === true);
  const [reps, setReps] = useState<Rep[]>([]);
  const [current, setCurrent] = useState<Timer>();

  const pause = useCallback(() => setRunning(false), [setRunning]);
  const resume = useCallback(() => setRunning(true), [setRunning]);

  const shift = useCallback(
    async (nextStartTime: number) => {
      const t = await getCurrentFrameTime();
      const rep = current || { time: 0 };
      setReps((currentReps) => [
        ...currentReps,
        {
          ...(isRunning(rep) ? stopTimer(rep, t) : rep),
          name: `Rep #${currentReps.length + 1}`,
        },
      ]);
      const nextTimer = { time: nextStartTime };
      setCurrent(running ? startTimer(nextTimer, t) : nextTimer);
    },
    [running, current, setReps],
  );

  const next = useCallback(async () => shift(0), [shift]);

  const continu = useCallback(async () => {
    shift(
      current
        ? isRunning(current)
          ? await getCurrentTime(current, await getCurrentFrameTime())
          : current.time
        : 0,
    );
  }, [shift, current]);

  const reset = useCallback(async () => {
    const t = await getCurrentFrameTime();
    setCurrent((cur) =>
      cur && isRunning(cur) ? startTimer({ time: 0 }, t) : { time: 0 },
    );
  }, []);

  const remove = useCallback(
    (timer: Timer) => setReps((reps) => [...reps.filter((r) => r !== timer)]),
    [],
  );

  const updateRep = useCallback((rep: Rep, updates: Partial<Rep>) => {
    setReps((reps) =>
      reps.map((r) => ({ ...r, ...(rep === r ? updates : {}) })),
    );
  }, []);

  useEffect(() => {
    if (current && isRunning(current) === running) return;

    getCurrentFrameTime().then((t) => {
      if (current) {
        setCurrent(toggleTimer(current, t));
        return;
      }

      setCurrent(running ? { systemStartTime: t } : { time: 0 });
    });
  }, [running, current]);

  return {
    running,
    current,
    reps,
    pause,
    resume,
    next,
    reset,
    continue: continu,
    remove,
    updateRep,
  };
}

export default useRepsTimer;
