import { Badge, Button, Stack } from "@mantine/core";
import { z } from "zod";
import { useMemo } from "react";
import useParsedParams from "@hooks/useParsedParams";
import { useInterval } from "@/app/hooks/intervals";
import SectionsBar from "@components/intervals/SectionsBar";
import IntervalDetails from "@components/intervals/IntervalDetails";
import useIntervalSections from "@components/intervals/useIntervalSections";
import { getCurrentSet, getCurrentRep } from "@components/intervals/helpers";
import useTimer from "@lib/timers/useTimer";

import { formatTime } from "@lib/format";

const paramsSchema = z.object({
  id: z.string(),
  backUrl: z.string().optional(),
});

export const ShowInterval = () => {
  const { params } = useParsedParams(paramsSchema.parse);
  const { data: interval } = useInterval(params?.id);
  const { start, stop, reset, time, running } = useTimer();
  const [currentSet, currentRep] = useMemo(
    () => [
      interval && time && getCurrentSet(interval, time / 1000.0),
      interval && time && getCurrentRep(interval, time / 1000.0),
    ],
    [interval, time],
  );
  const overall = useIntervalSections({
    interval,
    time: time ? time / 1000.0 : undefined,
  });

  const set = useIntervalSections({
    interval,
    time: time ? time / 1000.0 : undefined,
    zoomSet: currentSet,
  });

  return (
    interval && (
      <Stack>
        <IntervalDetails interval={interval} />
        {currentSet !== undefined && (
          <>
            Set
            <SectionsBar sections={set.sections} progress={set.progress} />
          </>
        )}
        Total
        <SectionsBar sections={overall.sections} progress={overall.progress} />
        {time && formatTime(time)}
        {currentRep !== undefined && running && (
          <Badge>rep:{currentRep + 1}</Badge>
        )}
        {currentSet !== undefined && running && (
          <Badge>set:{currentSet + 1}</Badge>
        )}
        {!running && <Button onClick={start}>Start</Button>}
        {running && <Button onClick={stop}>Stop</Button>}
        {!running && <Button onClick={reset}>Reset</Button>}
      </Stack>
    )
  );
};

export default ShowInterval;
