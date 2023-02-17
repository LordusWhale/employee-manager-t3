import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { api } from "../../utils/api";
import { UpdateButton } from "../updateButton";
import { EmployeeForm } from "./employeeForm";

type AddEmployeeProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddEmployee: React.FC<AddEmployeeProps> = ({ setOpen }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [empRole, setEmpRole] = useState<string | null>("");
  const [manager, setManager] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const refetch = api.employee.getAll.useQuery().refetch;
  const createEmpDb = api.employee.add.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
      setLoading(false);
      setOpen(false);
    },
  });
  const createEmp = () => {
    if (!empRole) return;
    setLoading(true);
    createEmpDb
      .mutateAsync({
        firstName: firstName,
        lastName: lastName,
        role: parseInt(empRole),
        manager: manager ? parseInt(manager) : undefined,
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <EmployeeForm
      setEmpRole={setEmpRole}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setManager={setManager}
      type="create"
      Button={<UpdateButton loading={loading} updateMethod={createEmp} />}
    />
  );
};
