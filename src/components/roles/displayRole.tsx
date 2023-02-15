import type { department, role } from "@prisma/client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { api } from "../../utils/api";
import { useState } from "react";
import { Loader } from "@mantine/core";
type DisplayRoleProps = {
  role: role & {
    department: department;
    _count: {
      employee: number;
    };
  };
  setRoleId: Dispatch<SetStateAction<number>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const DisplayRole = ({ role, setRoleId, setOpen }: DisplayRoleProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const refetch = api.role.getAll.useQuery().refetch;
  const deleteRoleDb = api.role.delete.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
      setIsDeleting(false);
    },
  });
  const deleteRole = (id: number) => {
    setIsDeleting(true);
    deleteRoleDb.mutateAsync({ id });
  };
  return (
    <tr key={role.id}>
      <td>{role.id}</td>
      <td>{role.title}</td>
      <td>{role.department.name}</td>
      <td>{role.salary.toString()}</td>
      <td>{role._count.employee}</td>

      <td>
        <div className="flex items-center justify-center gap-4 text-sm">
          {isDeleting ? (
            <Loader w={20} />
          ) : (
            <>
              <IconTrash
                cursor={"pointer"}
                onClick={() => {
                  deleteRole(role.id);
                }}
              />
              <IconEdit
                cursor="pointer"
                onClick={() => {
                  setRoleId(role.id);
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
