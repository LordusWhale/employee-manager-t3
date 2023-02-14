import { useState } from "react";
import { Modal, Table } from "@mantine/core";
import {
  employeeSortMethods,
  EmployeeSortMethods,
} from "../../utils/sort/employeeSort";
import { api } from "../../utils/api";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EditEmployee } from "./editEmployee";
export const ListEmployees = ({
  employees,
  revalidate,
}: {
  employees: any;
  revalidate: any;
}) => {
  const [sortMethod, setSortMethod] = useState<EmployeeSortMethods>("none");
  const [search, setSearch] = useState<string>("");
  const [editEmployee, setEditEmployee] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<number>(0);
  const deleteEmp = api.employee.delete.useMutation();
  const deleteEmployee = async (id: number) => {
    await deleteEmp.mutateAsync({ id }).catch((err) => {
      console.log(err);
    });
    revalidate.refetch();
  };
  const searchData = (input: string) => {
    if (input === "") return employees;
    return employees.filter((employee: any) => {
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
        <EditEmployee
          id={employeeId}
          revalidate={revalidate}
          setOpen={setEditEmployee}
        />
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
        <tbody>
          {searchData(search)
            .sort(employeeSortMethods[sortMethod].method)
            .map((employee: any) => {
              return (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>
                    {employee.first_name} {employee.last_name}
                  </td>
                  <td>{employee.role?.title}</td>
                  <td>{employee.role?.department.name}</td>
                  <td>
                    {employee.manager &&
                      `${employee.manager?.first_name} ${employee.manager?.last_name} (${employee.manager?.role?.title})`}
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <IconTrash
                        onClick={() => {
                          deleteEmployee(employee.id);
                        }}
                        cursor={"pointer"}
                      />
                      <IconEdit
                        cursor={"pointer"}
                        onClick={() => {
                          setEmployeeId(employee.id);
                          setEditEmployee(true);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
