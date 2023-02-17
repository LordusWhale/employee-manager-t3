import { useState } from "react";
import { api } from "../../utils/api";
import type { Dispatch, SetStateAction } from "react";
import { UpdateButton } from "../updateButton";
import { RoleForm } from "./roleForm";
type EditRoleProps = {
  roleId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditRole: React.FC<EditRoleProps> = ({ roleId, setOpen }) => {
  const role = api.role.getSingleRole.useQuery({ id: roleId });
  const refetch = api.role.getAll.useQuery().refetch;
  const editRole = api.role.update.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
      role.refetch();
      setLoading(false);
      setOpen(false);
    },
  });
  const [title, setTitle] = useState<string>("");
  const [department, setDepartment] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [salary, setSalary] = useState<number>(50000);
  const updateRole = () => {
    let departmentId = undefined;
    setLoading(true);
    if (department) {
      if (!isNaN(parseInt(department))) {
        departmentId = parseInt(department);
      }
    }
    editRole.mutateAsync({
      id: roleId,
      title: title || undefined,
      department: departmentId,
      salary: salary || undefined,
    });
  };
  return (
    <RoleForm
      Button={<UpdateButton updateMethod={updateRole} loading={loading} />}
      setDepartment={setDepartment}
      setSalary={setSalary}
      setTitle={setTitle}
      type="edit"
      roleId={roleId}
    />
  );
};
