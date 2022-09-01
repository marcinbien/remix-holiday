import { Form } from "@remix-run/react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { json } from "@remix-run/node";
import { Combobox } from "~/components/combobox";

const people = [
  { id: "1", value: "Wade Cooper" },
  { id: "2", value: "Arlene Mccoy" },
  { id: "3", value: "Devon Webb" },
  { id: "4", value: "Tom Cook" },
  { id: "5", value: "Tanya Fox" },
  { id: "6", value: "Hellen Schmidt" },
  { id: "7", value: "Caroline Schultz" },
  { id: "8", value: "Mason Heaney" },
  { id: "9", value: "Claudie Smitham" },
  { id: "10", value: "Emil Schaefer" },
];

export function loader() {
  return json({ status: "ok" });
}

// const customStyles = {
//   input: (provided, state) => ({
//     ...provided,
//     boxShadow: "none",
//   }),
// };

export default function AddHolidayRequest() {
  const [selected, setSelected] = useState();

  // <Combobox items={people} onChange={console.log} />
  return (
    <Form method="post">
      {/*  */}
      <div className="shadow shadow-gray-400 sm:overflow-hidden  sm:rounded-md">
        <div className="overflow-visible">
          <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add holiday
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Add holiday request for employee
              </p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              {/*   <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div> */}

              <div className="col-span-6 sm:col-span-4">
                <Combobox
                  items={people}
                  onChange={console.log}
                  label="Employee"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <Combobox
                  items={people}
                  onChange={console.log}
                  label="Holiday type"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className=" bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}
