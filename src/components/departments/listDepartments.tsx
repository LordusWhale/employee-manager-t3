import { Modal, Table } from "@mantine/core";
import { EditDepartment } from "./editDepartment";
import { useState } from "react";
import type { department, role } from "@prisma/client";
import type { DepartmentSortMethods } from "../../utils/sort/departmentSort";
import { departmentSortMethods } from "../../utils/sort/departmentSort";
import { DisplayDepartment } from "./displayDepartment";
type ListDepartmentsProps = {
  departments:
    | (department & {
        role: (role & {
          _count: {
            employee: number;
          };
        })[];
      })[]
    | undefined;
};

export const ListDepartments: React.FC<ListDepartmentsProps> = ({
  departments,
}) => {
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [sortMethod, setSortMethod] =
    useState<DepartmentSortMethods>("idAcending");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Table withColumnBorders>
        <thead className="font-bold">
          <tr>
            <th
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev == "idAcending") return "idDecending";
                  return "idAcending";
                });
              }}
              className="hover:bg-indigo-200"
            >
              Id
            </th>
            <th
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev == "nameAcending") return "nameDecending";
                  return "nameAcending";
                });
              }}
              className="hover:bg-indigo-200"
            >
              Name
            </th>
            <th>Roles</th>
            <th
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev == "numberOfEmployeesAcending")
                    return "numberOfEmployeesDecending";
                  return "numberOfEmployeesAcending";
                });
              }}
              className="hover:bg-indigo-200"
            >
              Number of employees
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments
            ?.sort(departmentSortMethods[sortMethod].method)
            .map((department) => {
              let total = department.role.reduce(
                (sum, role) => sum + role._count.employee,
                0
              );
              return (
                <DisplayDepartment
                  department={department}
                  total={total}
                  setOpen={setOpen}
                  setDepartmentId={setDepartmentId}
                />
              );
            })}
        </tbody>
      </Table>
      <Modal centered opened={open} onClose={() => setOpen(false)}>
        <EditDepartment departmentId={departmentId} setOpen={setOpen} />
      </Modal>
    </>
  );
};
