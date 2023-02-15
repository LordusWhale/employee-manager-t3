import { Input } from "@mantine/core";
import { useState } from "react";
import type {SetStateAction, Dispatch} from "react";
import { api } from "../../utils/api";

type AddDepartmentProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddDepartment: React.FC<AddDepartmentProps> = ({ setOpen }) => {
  const [name, setName] = useState<string>("");
  const refetch = api.department.getAll.useQuery().refetch;
  const createDepartmentDb = api.department.add.useMutation({
    onSuccess: async () => {
      await refetch()
      .catch(err=>{
        console.log(err)
      })
      setOpen(false);
    },
  });
  const createDepartment = async () => {
    if (!name) return;
    await createDepartmentDb.mutateAsync({
      name: name,
    })
    .catch(err=>{
      console.log(err)
    })
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
