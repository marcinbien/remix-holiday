import classNames from "classnames";
import { useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox as ComboboxHeadless } from "@headlessui/react";

type Item = { id: string; value: string };
type OnChangeEvent = (item: Item) => void;
type ComboboxProps = {
  items: Item[];
  onChange: OnChangeEvent;
  label: string;
};

export function Combobox({ items, onChange, label }: ComboboxProps) {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedItem] = useState<Item>(items[0]);

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.value.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <ComboboxHeadless
      as="div"
      value={selectedPerson}
      onChange={(item: Item) => {
        setSelectedItem(item);
        if (onChange) {
          onChange(item);
        }
      }}
    >
      <ComboboxHeadless.Label className="block text-sm font-medium text-gray-700">
        {label}
      </ComboboxHeadless.Label>
      <div className="relative mt-1">
        <ComboboxHeadless.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item: Item) => item.value}
        />
        <ComboboxHeadless.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxHeadless.Button>

        {filteredItems.length > 0 && (
          <ComboboxHeadless.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.map((item) => (
              <ComboboxHeadless.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {item.value}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxHeadless.Option>
            ))}
          </ComboboxHeadless.Options>
        )}
      </div>
    </ComboboxHeadless>
  );
}
