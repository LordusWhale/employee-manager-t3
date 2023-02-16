import { Input, Loader, Select, Slider } from "@mantine/core";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { api } from "../../utils/api";
import { UpdateButton } from "../updateButton";
import { RoleForm } from "./roleForm";

type AddRoleProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddRole: React.FC<AddRoleProps> = ({ setOpen }) => {
  const [title, setTitle] = useState<string>("");
  const [department, setDepartment] = useState<string | null>("");
  const [salary, setSalary] = useState<number>(50000);
  const [loading, setLoading] = useState<boolean>(false);
  const refetch = api.role.getAll.useQuery().refetch;
  const createRoleDb = api.role.add.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
      setLoading(false);
      setOpen(false);
    },
  });
  const createRole = async () => {
    if (!department) return;
    setLoading(true);
    await createRoleDb
      .mutateAsync({
        department: parseInt(department),
        title: title,
        salary: salary,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <RoleForm
      Button={<UpdateButton loading={loading} updateMethod={createRole} />}
      setDepartment={setDepartment}
      setSalary={setSalary}
      setTitle={setTitle}
      type="add"
    />
  );
};
//
