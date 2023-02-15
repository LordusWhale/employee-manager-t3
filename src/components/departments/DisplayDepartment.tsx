import { Loader } from "@mantine/core";
import { department, role } from "@prisma/client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { api } from "../../utils/api";

type DisplayDepartmentProps = {
  department: department & {
    role: (role & {
      _count: {
        employee: number;
      };
    })[];
  };
  total: number;
  setDepartmentId: Dispatch<SetStateAction<number>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const DisplayDepartment: React.FC<DisplayDepartmentProps> = ({
  department,
  total,
  setDepartmentId,
  setOpen,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const refetch = api.department.getAll.useQuery().refetch;
  const deleteDepartmentDb = api.department.delete.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
      setIsDeleting(false);
    },
  });
  const deleteDepartment = (id: number) => {
    setIsDeleting(true);
    deleteDepartmentDb.mutateAsync({ id });
  };
  return (
    <tr key={department.id}>
      <td>{department.id}</td>
      <td>{department.name}</td>
      <td>
        <ul>
          {department.role.map((role) => {
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
          {isDeleting ? (
            <Loader w={20} />
          ) : (
            <>
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
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
