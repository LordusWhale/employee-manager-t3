import { Input, Select, Slider } from "@mantine/core";
import { useState } from "react";
import { api } from "../../utils/api";

export const AddRole = ({
  setOpen,
  revalidate,
}: {
  setOpen: Function;
  revalidate: any;
}) => {
  const [title, setTitle] = useState<string>("");
  const [department, setDepartment] = useState<string | null>("");
  const [salary, setSalary] = useState<number>(50000);
  const departments = api.department.getAll.useQuery();

  const createRoleDb = api.role.add.useMutation({
    onSuccess: () => {
      revalidate.refetch();
      setOpen(false);
    },
  });
  const createRole = () => {
    if (!department) return;
    createRoleDb.mutateAsync({
      department: parseInt(department),
      title: title,
      salary: salary,
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
