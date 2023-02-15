import { Modal, Table } from "@mantine/core";
import { api } from "../../utils/api";
import { EditDepartment } from "./editDepartment";
import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { department, role } from "@prisma/client";
import type { DepartmentSortMethods } from "../../utils/sort/departmentSort";
import { departmentSortMethods } from "../../utils/sort/departmentSort";
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
  const refetch = api.department.getAll.useQuery().refetch;
  const deleteDepartmentDb = api.department.delete.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
    },
  });
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [sortMethod, setSortMethod] =
    useState<DepartmentSortMethods>("idAcending");
  const [open, setOpen] = useState<boolean>(false);
  const deleteDepartment = (id: number) => {
    deleteDepartmentDb.mutateAsync({ id });
  };
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
              let total = 0;
              return (
                <tr key={department.id}>
                  <td>{department.id}</td>
                  <td>{department.name}</td>
                  <td>
                    <ul>
                      {department.role.map((role) => {
                        total += role._count.employee;
                        return (
                          <li key={role.id}>
                            {role.title} ({role._count.employee})
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td>{total}</td>
                  <td>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <IconTrash
                        cursor={"pointer"}
                        onClick={() => {
                          deleteDepartment(department.id);
                        }}
                      />
                      <IconEdit
                        cursor="pointer"
                        onClick={() => {
                          setDepartmentId(department.id);
                          setOpen(true);
                        }}
                      />
                    </div>
                  </td>
                </tr>
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
