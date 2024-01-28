import { useMemo } from "react";
import Router from "next/router";
import { Table, Group, CloseButton } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useIntervals, useDeleteInterval } from "@hooks/intervals";

// import { createLogger } from "@lib/logging";

// const log = createLogger("interval-list");

export const IntervalList = () => {
  const { data: intervals } = useIntervals();
  const { mutate: deleteInterval } = useDeleteInterval();

  const rows = useMemo(() => {
    return intervals?.map((interval) => (
      <Table.Tr key={`interval-row-${interval.id}`}>
        <Table.Td>{interval.name}</Table.Td>
        <Table.Td>
          <Group justify="flex-end" gap="xs">
            <IconEdit
              size={18}
              onClick={() => Router.push(`./intervals/${interval.id}/edit`)}
            ></IconEdit>
            <CloseButton onClick={() => deleteInterval(interval.id)} />
          </Group>
        </Table.Td>
      </Table.Tr>
    ));
  }, [intervals, deleteInterval]);

  return (
    <Table highlightOnHover>
      {/* <Table.Thead>
        <Table.Tr>
          <Table.Td>Interval Name</Table.Td>
          <Table.Td width={100}>&nbsp;</Table.Td>
        </Table.Tr>
      </Table.Thead> */}
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default IntervalList;
