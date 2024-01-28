import Router from "next/router";
import { Stack, Button } from "@mantine/core";
import IntervalList from "@components/intervals/IntervalList";
import { useIntervals, useDeleteInterval } from "@hooks/intervals";

export const Intervals = () => {
  const { data: intervals } = useIntervals();
  const { mutate: deleteInterval } = useDeleteInterval();

  return (
    <Stack>
      {intervals && (
        <IntervalList
          intervals={intervals}
          onSelect={(interval) =>
            Router.push(
              `./intervals/show?id=${interval.id}&backUrl=${"/interval"}`,
            )
          }
          onEdit={(interval) =>
            Router.push(
              `./intervals/edit?id=${interval.id}&backUrl=${"/interval"}`,
            )
          }
          onDelete={(interval) => deleteInterval(interval.id)}
        />
      )}
      <Button onClick={() => Router.push("./intervals/new")}>
        New Interval
      </Button>
    </Stack>
  );
};

export default Intervals;
