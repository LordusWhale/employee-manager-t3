import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { api } from "../../utils/api";
import { UpdateButton } from "../updateButton";
import { EmployeeForm } from "./employeeForm";

type EditEmployeeProps = {
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditEmployee: React.FC<EditEmployeeProps> = ({ id, setOpen }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [empRole, setEmpRole] = useState<string | null>("");
  const [manager, setManager] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const refetch = api.employee.getAll.useQuery().refetch;
  const createEmpDb = api.employee.update.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
      setLoading(false);
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const updateEmp = () => {
    let managerId = undefined;
    if (manager) {
      if (!isNaN(parseInt(manager))) {
        managerId = parseInt(manager);
      } else {
        managerId = null;
      }
    }
    setLoading(true);
    console.log(managerId);
    createEmpDb.mutateAsync({
      id: id,
      firstName: firstName ? firstName : undefined,
      lastName: lastName ? lastName : undefined,
      role: empRole ? parseInt(empRole) : undefined,
      manager: managerId,
    });
  };
  return (
    <EmployeeForm
      empId={id}
      setEmpRole={setEmpRole}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setManager={setManager}
      type="edit"
      Button={<UpdateButton loading={loading} updateMethod={updateEmp} />}
    />
  );
};
