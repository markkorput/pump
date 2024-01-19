import { Button, Grid } from '@mantine/core';
import { RepsTimer } from "./useRepsTimer";
import { isRunning } from "@lib/timers";

export type ControlsProps = Pick<RepsTimer, "current" | "running" | "pause" | "resume" | "next" | "continue" | "reset">

export function Controls({ current, running, pause, resume, next, reset, continue: continu }: ControlsProps) {
    const resetable = !!current && (isRunning(current) || current.time > 0);
    return (
        <Grid gutter="xs" grow>
            <Grid.Col span={4}><Button fullWidth variant={resetable ? "danger" : undefined} size="xl" onClick={reset} disabled={!resetable}>Reset</Button></Grid.Col>
            <Grid.Col span={4}><Button fullWidth size="xl" onClick={continu}>Continue</Button></Grid.Col>
            <Grid.Col span={4}><Button fullWidth size="xl" onClick={next}>Next Rep</Button></Grid.Col>
            {running && <Grid.Col span={12}><Button fullWidth size="xl" onClick={pause}>Pause</Button></Grid.Col>}
            {!running && <Grid.Col span={12}><Button fullWidth size="xl" onClick={resume}>Go</Button></Grid.Col>}
        </Grid>
  );
}
