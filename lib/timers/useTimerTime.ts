import { useState } from "react";
import { useFrame } from "@lib/frames";
import { type Timer, getTime } from ".";

export function useTimerTime(timer: Timer) {
  const [time, setTime] = useState(0);
  useFrame(() => setTime(getTime(timer)));
  return time;
}
