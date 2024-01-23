import { type Timer, isRunning, getCurrentTime, getSystemTime } from ".";

export function useTimerTime(timer: Timer) {
  return isRunning(timer) ? getCurrentTime(timer) : timer.time;
}
