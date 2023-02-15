import { Input, Loader } from "@mantine/core";
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
  const [loading, setLoading] = useState<boolean>(false);
  const department = api.department.getSingle.useQuery({ id: departmentId });
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
    <div className="flex flex-col gap-8">
      {department.isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      )}
      <Input.Wrapper label="Name of department">
        <Input
          placeholder="Name of department"
          defaultValue={department.data?.name}
          onChange={(e) => setName(e.target.value)}
        />
      </Input.Wrapper>
      <div className="flex w-full items-center justify-center">
        {loading ? (
          <Loader />
        ) : (
          <button
            className="w-full bg-indigo-500 p-2 text-white"
            onClick={updateDepartment}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};
