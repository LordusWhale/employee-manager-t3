import { Modal, Table } from "@mantine/core";
import { api } from "../../utils/api";
import { EditDepartment } from "./editDepartment";
import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { department, role } from "@prisma/client";

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
      await refetch()
      .catch(err=>{
        console.log(err)
      })
    },
  });
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const deleteDepartment = (id: number) => {
    deleteDepartmentDb.mutateAsync({ id });
  };
  return (
    <>
      <Table withColumnBorders>
        <thead className="font-bold">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Roles</th>
            <th>Number of employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments?.map((department) => {
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
                        <li>
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
        <EditDepartment
          departmentId={departmentId}
          setOpen={setOpen}
        />
      </Modal>
    </>
  );
};
