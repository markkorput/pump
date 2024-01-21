import { Stack, AppShell } from "@mantine/core";
import { formatTime } from "@lib/format";
import { useTimerTime } from "@lib/timers";

import { Controls } from "./Controls";
import { Reps } from "./Reps";
import { useRepsTimer } from "./useRepsTimer";
import { Center, Title } from "@mantine/core";

export interface TimerProps {
  running?: boolean;
}

export const Timer = (props: TimerProps) => {
  const { current, ...repsTimer } = useRepsTimer({
    running: props.running,
  });

  const currentTime = formatTime(useTimerTime(current || { time: 0 }));

  return (
    <AppShell header={{ height: 200 }}>
      <AppShell.Header withBorder={false}>
        {/* <Stack h="100%" align="center"> */}
        <Center>
          <Title>{currentTime}</Title>
        </Center>
        {/* </Stack> */}
      </AppShell.Header>
      <AppShell.Main>
        <Center>
          <Reps {...repsTimer} />
        </Center>
      </AppShell.Main>
      <AppShell.Footer>
        <Controls {...repsTimer} current={current} />
      </AppShell.Footer>
    </AppShell>
  );
};

export default Timer;
