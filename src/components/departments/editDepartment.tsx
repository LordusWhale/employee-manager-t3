import { Input } from "@mantine/core";
import { useState } from "react";
import { api } from "../../utils/api";
import type { Dispatch, SetStateAction } from "react";

type EditDepartmentProps = {
  departmentId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditDepartment: React.FC<EditDepartmentProps> = ({
  departmentId,
  setOpen,
}) => {
  const [name, setName] = useState<string>("");
  const department = api.department.getSingle.useQuery({ id: departmentId });
  const refetch = api.department.getAll.useQuery().refetch;
  const editDepartmentDb = api.department.update.useMutation({
    onSuccess: async () => {
      await refetch()
      .catch(err=>{
        console.log(err)
      });
      setOpen(false);
    },
  });
  const editDepartment = () => {
    editDepartmentDb.mutateAsync({
      id: departmentId,
      name: name || undefined,
    });
  };
  return (
    <div className="flex flex-col gap-8">
      <Input.Wrapper label="Name of department">
        <Input
          placeholder="Name of department"
          defaultValue={department.data?.name}
          onChange={(e) => setName(e.target.value)}
        />
      </Input.Wrapper>
      <button className="bg-indigo-500 p-2 text-white" onClick={editDepartment}>
        Save
      </button>
    </div>
  );
};
