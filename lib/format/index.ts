import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function formatTime(ms: number) {
  const dur = dayjs.duration(ms);
  return (
    dur.format("mm:ss:") + dur.format("SSS").split(".")[0].padStart(3, "0")
  );
}
