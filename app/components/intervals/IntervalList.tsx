import { useMemo } from "react";

import { Table, Group, CloseButton } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

import { IntervalDefinition } from "./types";

export interface IntervalListProps {
  intervals: IntervalDefinition[];
  onSelect?: (interval: IntervalDefinition) => void;
  onEdit?: (interval: IntervalDefinition) => void;
  onDelete?: (interval: IntervalDefinition) => void;
  confirmDelete?: boolean;
}

export const IntervalList = ({
  intervals,
  onSelect,
  onEdit,
  onDelete,
  confirmDelete = true,
}: IntervalListProps) => {
  const rows = useMemo(() => {
    return intervals?.map((interval) => (
      <Table.Tr
        key={`interval-row-${interval.id}`}
        onClick={() => onSelect?.(interval)}
      >
        <Table.Td>{interval.name}</Table.Td>
        <Table.Td>
          <Group justify="flex-end" gap="xs">
            {onEdit && (
              <IconEdit
                size={18}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit?.(interval);
                }}
              ></IconEdit>
            )}
            {onDelete && (
              <CloseButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (
                    !confirmDelete ||
                    confirm(
                      `Are you sure yopu want to remove interval "${interval.name}"`,
                    )
                  )
                    onDelete(interval);
                }}
              />
            )}
          </Group>
        </Table.Td>
      </Table.Tr>
    ));
  }, [intervals, onSelect, onEdit, onDelete, confirmDelete]);

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
