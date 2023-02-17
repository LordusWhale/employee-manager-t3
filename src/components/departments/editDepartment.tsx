import { useState } from "react";
import { api } from "../../utils/api";
import type { Dispatch, SetStateAction } from "react";
import { UpdateButton } from "../updateButton";
import { DepartmentForm } from "./departmentForm";

type EditDepartmentProps = {
  departmentId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditDepartment: React.FC<EditDepartmentProps> = ({
  departmentId,
  setOpen,
}) => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const refetch = api.department.getAll.useQuery().refetch;
  const editDepartmentDb = api.department.update.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
      setLoading(false);
      setOpen(false);
    },
  });
  const updateDepartment = () => {
    setLoading(true);
    editDepartmentDb.mutateAsync({
      id: departmentId,
      name: name || undefined,
    });
  };
  return (
    <DepartmentForm
      setName={setName}
      type="edit"
      departmentId={departmentId}
      Button={
        <UpdateButton loading={loading} updateMethod={updateDepartment} />
      }
    />
  );
};
