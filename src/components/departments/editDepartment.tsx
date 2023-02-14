import { Input } from "@mantine/core";
import { useState } from "react";
import { api } from "../../utils/api";

export const EditDepartment = ({
  departmentId,
  setOpen,
  revalidate,
}: {
  departmentId: number;
  setOpen: Function;
  revalidate: any;
}) => {
  const [name, setName] = useState<string>("");
  const department = api.department.getSingle.useQuery({ id: departmentId });
  const editDepartmentDb = api.department.update.useMutation({
    onSuccess: () => {
      revalidate.refetch();
      department.refetch();
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
