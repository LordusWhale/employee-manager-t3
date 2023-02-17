import { department, role } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { api } from "../../utils/api";
import { UpdateIcons } from "../updateIcons";

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
  const deleteDepartment = async (id: number) => {
    setIsDeleting(true);
    await deleteDepartmentDb.mutateAsync({ id });
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
        <UpdateIcons
          deleteMethod={deleteDepartment}
          isDeleting={isDeleting}
          employeeId={department.id}
          setId={setDepartmentId}
          setEdit={setOpen}
        />
      </td>
    </tr>
  );
};
