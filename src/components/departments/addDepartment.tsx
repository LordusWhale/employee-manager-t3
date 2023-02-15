import { Input, Loader } from "@mantine/core";
import { useState } from "react";
import type { SetStateAction, Dispatch } from "react";
import { api } from "../../utils/api";

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
    <div className="flex flex-col gap-8">
      <Input.Wrapper label="Name of department">
        <Input
          placeholder="Name of department"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Input.Wrapper>
      <div className="flex w-full items-center justify-center">
        {loading ? (
          <Loader />
        ) : (
          <button
            className="w-full bg-indigo-500 p-2 text-white"
            onClick={createDepartment}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};
