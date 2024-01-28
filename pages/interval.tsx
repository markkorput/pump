import { Stack } from "@mantine/core";
import IntervalEditor from "@components/intervals/IntervalEditor";
import IntervalList from "@components/intervals/IntervalList";

export const Intervals = () => {
  return (
    <Stack>
      <IntervalList />
      <IntervalEditor />
    </Stack>
  );
};

export default Intervals;
