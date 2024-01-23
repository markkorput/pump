import { Button, Grid } from "@mantine/core";
import { RepsTimer } from "./useRepsTimer";
import { isRunning } from "@lib/timers";

const buttonSize = { height: "20vh", maxHeight: 150 };
const buttonProps = { fullWidth: true, size: "xl", style: buttonSize };

export type ControlsProps = Pick<
  RepsTimer,
  | "current"
  | "running"
  | "pause"
  | "resume"
  | "next"
  | "continue"
  | "reset"
  | "clear"
>;

export const Controls = ({
  current,
  running,
  pause,
  resume,
  next,
  reset,
  clear,
  continue: continu,
}: ControlsProps) => {
  const resetable = !!current && (isRunning(current) || current.time > 0);
  const clearable = !resetable;

  return (
    <Grid gutter="xs" grow>
      <Grid.Col span={4}>
        {clearable && (
          <Button
            {...buttonProps}
            variant={clearable ? "danger" : undefined}
            onClick={clear}
            disabled={!clearable}
          >
            Clear
          </Button>
        )}
        {resetable && (
          <Button
            {...buttonProps}
            variant={resetable ? "danger" : undefined}
            onClick={reset}
            disabled={!resetable}
          >
            Reset
          </Button>
        )}
      </Grid.Col>
      <Grid.Col span={4}>
        <Button {...buttonProps} color="gray" onClick={continu}>
          Continue
        </Button>
      </Grid.Col>
      <Grid.Col span={4}>
        <Button {...buttonProps} color="gray" onClick={next}>
          Next Rep
        </Button>
      </Grid.Col>
      {running && (
        <Grid.Col span={12}>
          <Button {...buttonProps} onClick={pause}>
            Pause
          </Button>
        </Grid.Col>
      )}
      {!running && (
        <Grid.Col span={12}>
          <Button {...buttonProps} onClick={resume}>
            Go
          </Button>
        </Grid.Col>
      )}
    </Grid>
  );
};
