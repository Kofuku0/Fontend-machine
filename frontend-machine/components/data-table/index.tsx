import React, { useState } from "react";
import users from "@/frontend-machine/constants/user";

type User = (typeof users)[number];

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Occupation", key: "occupation" },
] as const;

const PAGE_SIZE = 5;

function paginatedUser(userList: Array<User>, page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageUsers = userList.slice(start, end);
  const totalPages = Math.ceil(userList.length / pageSize);
  return { pageUsers, totalPages };
}

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const { pageUsers, totalPages } = paginatedUser(users, page, pageSize);

  return (
    <div className="min-h-dvh w-full flex items-center justify-center text-black p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-center">
            <thead className="bg-gray-100">
              <tr>
                {columns.map(({ label, key }) => (
                  <th
                    key={key}
                    className="border px-4 py-3 font-semibold text-gray-700"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {pageUsers.map(({ id, name, age, occupation }, index) => (
                <tr
                  key={id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border px-4 py-2">{id}</td>
                  <td className="border px-4 py-2">{name}</td>
                  <td className="border px-4 py-2">{age}</td>
                  <td className="border px-4 py-2">{occupation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col items-center gap-4">
          {/* Page size */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select
              aria-label="page size"
              className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => {
                if (page > 0) {
                  setPage((prev) => Math.max(prev - 1, 1));
                }
              }}
              className="rounded-md border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-100"
            >
              Prev
            </button>

            <div className="rounded-md border bg-gray-100 px-4 py-2 text-sm font-medium">
              {page}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => {
                if (page < totalPages)
                  setPage((prev) => Math.min(prev + 1, totalPages));
              }}
              className="rounded-md border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-100"
            >
              Next
            </button>

            <div className="text-sm text-gray-600">
              of <span className="font-medium">{totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
