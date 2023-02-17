import { useState } from "react";
import { Modal, Table } from "@mantine/core";
import {
  employeeSortMethods,
  EmployeeSortMethods,
} from "../../utils/sort/employeeSort";
import { EditEmployee } from "./editEmployee";
import type { department, employee, role } from "@prisma/client";
import { DisplayEmployee } from "./displayEmployee";

type ListEmployeeProps = {
  employees:
    | (employee & {
        role:
          | (role & {
              department: department;
            })
          | null;
        manager:
          | (employee & {
              role: role | null;
            })
          | null;
      })[]
    | undefined;
};

export const ListEmployees: React.FC<ListEmployeeProps> = ({ employees }) => {
  const [sortMethod, setSortMethod] = useState<EmployeeSortMethods>("none");
  const [search, setSearch] = useState<string>("");
  const [editEmployee, setEditEmployee] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<number>(0);

  const searchData = (input: string) => {
    if (input === "") return employees;
    return employees?.filter((employee) => {
      const name = `${employee.first_name} ${employee.last_name}`;
      return name.toLowerCase().includes(input.toLowerCase());
    });
  };
  

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <input
          placeholder="Search"
          className="mb-8 border-b-2 border-indigo-700 p-2  text-xl placeholder:text-indigo-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Modal
        centered
        opened={editEmployee}
        onClose={() => setEditEmployee(false)}
      >
        <EditEmployee id={employeeId} setOpen={setEditEmployee} />
      </Modal>
      <Table withColumnBorders>
        <thead className="font-bold">
          <tr>
            <th
              className="hover:bg-indigo-200"
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev === "idAcending") return "idDecending";
                  return "idAcending";
                });
              }}
            >
              ID
            </th>
            <th
              className="hover:bg-indigo-200"
              onClick={() =>
                setSortMethod((prev) => {
                  if (prev === "nameAcending") return "nameDecending";
                  return "nameAcending";
                })
              }
            >
              Name
            </th>
            <th
              className="hover:bg-indigo-200"
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev === "roleAcending") return "roleDecending";
                  return "roleAcending";
                });
              }}
            >
              Role
            </th>
            <th
              className="hover:bg-indigo-200"
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev === "departmentAcending")
                    return "departmentDecending";
                  return "departmentAcending";
                });
              }}
            >
              Department
            </th>
            <th>Manager Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        {employees && (
          <tbody>
            {searchData(search)
              ?.sort(employeeSortMethods[sortMethod].method)
              .map((employee) => {
                return (
                 <DisplayEmployee employee={employee} setEditEmployee={setEditEmployee} setEmployeeId={setEmployeeId} />
                );
              })}
          </tbody>
        )}
      </Table>
    </>
  );
};
