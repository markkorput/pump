import type { Timer, StoppedTimer, RunningTimer } from "./types";

export function isRunning(timer: Timer): timer is RunningTimer {
  return "systemStartTime" in timer;
}

export function isStopped(timer: Timer): timer is StoppedTimer {
  return !isRunning(timer);
}

export function getCurrentTime(
  timer: RunningTimer,
  systemTime: number,
): number {
  return systemTime - timer.systemStartTime + (timer.timerStartTime || 0);
}

export function getTime(timer: Timer, systemTime: number): number {
  return isRunning(timer) ? getCurrentTime(timer, systemTime) : timer.time;
}

export function stopTimer(
  timer: RunningTimer,
  systemTime: number,
): StoppedTimer {
  return {
    time: getCurrentTime(timer, systemTime),
  };
}

export function startTimer(
  timer: StoppedTimer,
  systemTime: number,
): RunningTimer {
  return {
    systemStartTime: systemTime,
    timerStartTime: timer.time,
  };
}

export function toggleTimer(timer: Timer, systemTime: number): Timer {
  return isRunning(timer)
    ? stopTimer(timer, systemTime)
    : startTimer(timer, systemTime);
}
