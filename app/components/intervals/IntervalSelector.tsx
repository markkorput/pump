import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CloseButton,
  useCombobox,
  Combobox,
  Group,
  InputBase,
} from "@mantine/core";
import { IntervalDefinition } from "./types";

interface IntervalSelectorProps {
  intervals: IntervalDefinition[];
  onSelect?: (interval: IntervalDefinition) => void;
  onDelete?: (interval: IntervalDefinition) => void;
}

const IntervalSelector = ({
  intervals,
  onSelect,
  onDelete,
}: IntervalSelectorProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<IntervalDefinition | null>(null);
  const [search, setSearch] = useState<string>("");

  const options = useMemo(() => {
    const perfectMatch = !!intervals.find(
      (interval) => interval.name === search,
    );

    const filteredOptions = perfectMatch
      ? intervals
      : intervals.filter((interval) =>
          interval.name.toLowerCase().includes(search.toLowerCase().trim()),
        );

    return filteredOptions.map((interval) => (
      <Combobox.Option
        value={interval.id}
        key={`interval-option-${interval.id}`}
      >
        <Group justify="space-between">
          {interval.name}
          <CloseButton
            size="xs"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (
                confirm(
                  `Are you sure you want to delete the interval "${interval.name}"`,
                )
              ) {
                onDelete?.(interval);
              }
            }}
          />
        </Group>
      </Combobox.Option>
    ));
  }, [intervals, search, onDelete]);

  useEffect(() => {
    if (value && onSelect) {
      onSelect(value);
    }
  }, [value, onSelect]);

  const onOptionSubmit = useCallback(
    (val: string) => {
      const selected = intervals.find((int) => int.id === val);
      if (selected) {
        setValue(selected);
        setSearch(selected.name);
      }
      combobox.closeDropdown();
    },
    [intervals, combobox],
  );

  return (
    <Combobox store={combobox} onOptionSubmit={onOptionSubmit}>
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            if (value) setSearch(value.name);
          }}
          placeholder="Search for saved interval"
          value={search}
          onChange={(event) => {
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default IntervalSelector;
