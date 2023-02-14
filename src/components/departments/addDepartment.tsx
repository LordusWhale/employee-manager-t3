import { Input, Select } from "@mantine/core";
import { useState } from "react";
import { api } from "../../utils/api";

export const AddDepartment = ({
  setOpen,
  revalidate,
}: {
  setOpen: Function;
  revalidate: any;
}) => {
  const [name, setName] = useState<string>("");
  const createDepartmentDb = api.department.add.useMutation({
    onSuccess: () => {
      revalidate.refetch();
      setOpen(false);
    },
  });
  const createDepartment = () => {
    if (!name) return;
    createDepartmentDb.mutateAsync({
      name: name,
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
      <button
        className="bg-indigo-500 p-2 text-white"
        onClick={createDepartment}
      >
        Save
      </button>
    </div>
  );
};
