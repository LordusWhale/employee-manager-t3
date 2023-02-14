import { Modal, Table } from "@mantine/core";
import { api } from "../../utils/api";
import { EditDepartment } from "./editDepartment";
import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
export const ListDepartments = ({
  departments,
  revalidate,
}: {
  departments: any;
  revalidate: any;
}) => {
  const deleteDepartmentDb = api.department.delete.useMutation({
    onSuccess: () => {
      revalidate.refetch();
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
          {departments.map((department: any) => {
            let total = 0;
            return (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.name}</td>
                <td>
                  <ul>
                    {department.role.map((role: any) => {
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
          revalidate={revalidate}
          setOpen={setOpen}
        />
      </Modal>
    </>
  );
};
