import { ActionArgs, LoaderArgs, redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { getUsers, updateUser } from "~/models/user.server";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getUserById } from "~/models/user.server";
import { getUserFromFormData } from "~/models/user.helpers";

export async function loader({ request, params }: LoaderArgs) {
  const userId = params.userId;
  if (!userId) {
    return json({ user: null });
  }

  const user = await getUserById(userId);

  return json({ user });
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const user = getUserFromFormData({ formData });
  if (!params.userId) {
    return null;
  }

  const result = await updateUser({ ...user, id: params.userId });

  return redirect("/admin/employees");
}

export default function Example() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <h1>
        Employee edit {user?.firstName} {user?.lastName}
      </h1>
      <Form method="post">
        <div className="shadow shadow-gray-400 sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Edit employee
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Employee detail information.
              </p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
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
                  defaultValue={user?.firstName || ""}
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
                  defaultValue={user?.lastName || ""}
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  defaultValue={user?.email || ""}
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                  defaultValue={user?.title || ""}
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}
