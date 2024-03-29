export type { StoppedTimer, RunningTimer, Timer } from "./types";

export {
  isStopped,
  isRunning,
  getCurrentTime,
  getTime,
  stopTimer,
  startTimer,
  toggleTimer,
  getSystemTime,
} from "./helpers";

export { useTimerTime } from "./useTimerTime";
