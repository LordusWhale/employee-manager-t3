import type { department, employee, role } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { api } from "../../utils/api";
import { UpdateIcons } from "../updateIcons";

type DisplayEmployeeProps = {
  employee: employee & {
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
  };
  setEmployeeId: Dispatch<SetStateAction<number>>;
  setEditEmployee: Dispatch<SetStateAction<boolean>>;
};

export const DisplayEmployee: React.FC<DisplayEmployeeProps> = ({
  employee,
  setEmployeeId,
  setEditEmployee,
}) => {
  const deleteEmp = api.employee.delete.useMutation();
  const refetch = api.employee.getAll.useQuery().refetch;
  const deleteEmployee = async (id: number) => {
    setIsDeleting(true);
    await deleteEmp.mutateAsync({ id }).catch((err) => {
      console.log(err);
    });
    await refetch().catch((err) => {
      console.log(err);
    });
    setIsDeleting(false);
  };

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
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
        <UpdateIcons
          isDeleting={isDeleting}
          deleteMethod={deleteEmployee}
          employeeId={employee.id}
          setEdit={setEditEmployee}
          setId={setEmployeeId}
        />
      </td>
    </tr>
  );
};
