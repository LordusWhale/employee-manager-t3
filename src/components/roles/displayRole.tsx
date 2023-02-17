import type { department, role } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { api } from "../../utils/api";
import { useState } from "react";
import { UpdateIcons } from "../updateIcons";
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
  const deleteRole = async (id: number) => {
    setIsDeleting(true);
    await deleteRoleDb.mutateAsync({ id });
  };
  return (
    <tr key={role.id}>
      <td>{role.id}</td>
      <td>{role.title}</td>
      <td>{role.department.name}</td>
      <td>{role.salary.toString()}</td>
      <td>{role._count.employee}</td>

      <td>
        <UpdateIcons
          deleteMethod={deleteRole}
          employeeId={role.id}
          isDeleting={isDeleting}
          setEdit={setOpen}
          setId={setRoleId}
        />
      </td>
    </tr>
  );
};
