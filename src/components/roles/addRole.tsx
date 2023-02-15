import { Input, Select, Slider } from "@mantine/core";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { api } from "../../utils/api";

type AddRoleProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddRole: React.FC<AddRoleProps> = ({ setOpen }) => {
  const [title, setTitle] = useState<string>("");
  const [department, setDepartment] = useState<string | null>("");
  const [salary, setSalary] = useState<number>(50000);
  const departments = api.department.getAll.useQuery();
  const refetch = api.role.getAll.useQuery().refetch;
  const createRoleDb = api.role.add.useMutation({
    onSuccess: async () => {
      await refetch()
      .catch(err=>{
        console.log(err)
      });
      setOpen(false);
    },
  });
  const createRole = async () => {
    if (!department) return;
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
    <div className="flex flex-col gap-8">
      {departments.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Input.Wrapper label="Name of department">
            <Input
              placeholder="Title of role"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Input.Wrapper>
          {departments.data && (
            <Select
              label="Department"
              placeholder="Select department"
              onChange={setDepartment}
              data={departments.data.map((department) => {
                return { label: department.name, value: `${department.id}` };
              })}
            ></Select>
          )}
          <div>
            <label className="text-sm">Salary</label>
            <Slider
              value={salary}
              onChange={setSalary}
              placeholder="Salary"
              min={50000}
              max={200000}
            />
          </div>

          <button className="bg-indigo-500 p-2 text-white" onClick={createRole}>
            Save
          </button>
        </>
      )}
    </div>
  );
};
