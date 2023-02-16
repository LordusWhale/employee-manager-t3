import { useState } from "react";
import type { SetStateAction, Dispatch } from "react";
import { api } from "../../utils/api";
import { UpdateButton } from "../updateButton";
import { DepartmentForm } from "./departmentGorm";

type AddDepartmentProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddDepartment: React.FC<AddDepartmentProps> = ({ setOpen }) => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const refetch = api.department.getAll.useQuery().refetch;
  const createDepartmentDb = api.department.add.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
      setLoading(false);
      setOpen(false);
    },
  });
  const createDepartment = async () => {
    if (!name) return;
    setLoading(true);
    await createDepartmentDb
      .mutateAsync({
        name: name,
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <DepartmentForm
      setName={setName}
      type="add"
      Button={
        <UpdateButton loading={loading} updateMethod={createDepartment} />
      }
    />
  );
};
