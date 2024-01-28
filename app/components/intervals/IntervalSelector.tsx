import { useEffect, useMemo, useState } from "react";
import { useCombobox, Combobox, InputBase } from "@mantine/core";
import { IntervalDefinition } from "./types";

interface IntervalSelectorProps {
  intervals: IntervalDefinition[];
  onSelect?: (interval: IntervalDefinition) => void;
}

const IntervalSelector = ({ intervals, onSelect }: IntervalSelectorProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
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
        {interval.name}
      </Combobox.Option>
    ));
  }, [intervals, search]);

  useEffect(() => {
    if (value && onSelect) {
      const selected = intervals.find((interval) => interval.id === value);
      if (selected) onSelect(selected);
    }
  }, [intervals, value, onSelect]);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);

        const selected = intervals.find((interval) => interval.id === val);
        if (selected) setSearch(selected.name);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
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
