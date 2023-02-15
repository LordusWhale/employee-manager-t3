import { Input, Loader, Select, Slider } from "@mantine/core";
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
  const [loading, setLoading] = useState<boolean>(false);
  const departments = api.department.getAll.useQuery();
  const refetch = api.role.getAll.useQuery().refetch;
  const createRoleDb = api.role.add.useMutation({
    onSuccess: async () => {
      await refetch()
      .catch(err=>{
        console.log(err)
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
    <div className="flex flex-col gap-8">
      {departments.isLoading  ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
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
          <div className="flex w-full items-center justify-center">
          {loading ? (
              <Loader />
            ) : (
              <button
                className="w-full bg-indigo-500 p-2 text-white"
                onClick={createRole}
              >
                Save
              </button>
            )}
            </div>
        </>
      )}
    </div>
  );
};
