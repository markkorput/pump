import {
  Box,
  Modal,
  CloseButton,
  Group,
  Text,
  Input,
  Button,
  Space,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useCallback, useMemo, useState } from "react";
import { formatTime } from "@lib/format";
import { RepsTimer, type Rep } from "./useRepsTimer";

interface RepFormProps {
  submit?: (name: string) => void;
  cancel?: () => void;
  defaultValue?: string;
}

const RepForm = ({ submit, cancel, defaultValue }: RepFormProps) => {
  const [name, setName] = useState<string>("");
  const onSubmit = useCallback(() => submit?.(name), [submit, name]);

  return (
    <Box>
      <Input
        placeholder="Give the rep a name..."
        defaultValue={defaultValue}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        onSubmit={onSubmit}
      />

      <Space h="md" />

      <Group justify="flex-end" gap="md">
        <Button onClick={cancel}>cancel</Button>
        <Button onClick={onSubmit} variant="primary">
          Save
        </Button>
      </Group>
    </Box>
  );
};

export type RepsProps = Pick<RepsTimer, "reps" | "remove" | "updateRep">;

export const Reps = ({ reps, remove, updateRep }: RepsProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [formRep, setFormRep] = useState<Rep>();

  const updateName = useCallback(
    (name: string) => {
      if (formRep) updateRep(formRep, { name });
      close();
    },
    [updateRep, formRep, close],
  );

  const editRep = useCallback(
    (rep: Rep) => {
      setFormRep(rep);
      open();
    },
    [open],
  );

  const removeRep = useCallback((rep: Rep) => remove(rep), [remove]);

  const lines = useMemo(
    () =>
      [...reps].reverse().map((rep, idx) => (
        <Group key={`rep-${idx}`} justify="flex-end">
          <Text onClick={() => editRep(rep)}>
            {rep.name} - {formatTime(rep.time)}s
          </Text>
          <CloseButton onClick={() => removeRep(rep)} />
        </Group>
      )),
    [reps, editRep, removeRep],
  );

  return (
    <>
      <Stack>{lines}</Stack>

      <Modal opened={opened} onClose={close} title="Edit Rep">
        <RepForm
          defaultValue={formRep?.name}
          submit={updateName}
          cancel={close}
        />
      </Modal>
    </>
  );
};
