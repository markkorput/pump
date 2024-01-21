import { type Timer, isRunning, getCurrentTime } from ".";
import { useTime } from "../frames";

export function useTimerTime(timer: Timer) {
  const t = useTime();
  return isRunning(timer) ? getCurrentTime(timer, t) : timer.time;
}
