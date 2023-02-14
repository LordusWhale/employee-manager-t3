import { Input, Select, Slider } from "@mantine/core";
import { useState } from "react";
import { api } from "../../utils/api";

export const EditRole = ({
  roleId,
  revalidate,
  setOpen,
}: {
  roleId: number;
  revalidate: any;
  setOpen: Function;
}) => {
  const role = api.role.getSingleRole.useQuery({ id: roleId });
  const addRole = api.role.update.useMutation({
    onSuccess: () => {
      revalidate.refetch();
      role.refetch();
      setOpen(false);
    },
  });
  const departments = api.department.getAll.useQuery();
  const [title, setTitle] = useState<string>("");
  const [department, setDepartment] = useState<string | null>("");
  const [salary, setSalary] = useState<number>(50000);
  const editRole = () => {
    let departmentId = undefined;
    if (department) {
      if (!isNaN(parseInt(department))) {
        departmentId = parseInt(department);
      }
    }
    addRole.mutateAsync({
      id: roleId,
      title: title || undefined,
      department: departmentId,
      salary: salary || undefined,
    });
  };
  return (
    <>
      {role.data && (
        <div className="flex flex-col gap-8">
          <Input.Wrapper label="Name of department">
            <Input
              placeholder="Title of role"
              defaultValue={role.data.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Input.Wrapper>
          {departments.data && (
            <Select
              label="Department"
              placeholder="Select department"
              defaultValue={role.data.department.id.toString()}
              onChange={setDepartment}
              data={departments.data.map((department) => {
                return { label: department.name, value: `${department.id}` };
              })}
            ></Select>
          )}
          <div>
            <label className="text-sm">Salary</label>
            <Slider
              defaultValue={parseInt(role.data.salary.toString())}
              onChange={setSalary}
              placeholder="Salary"
              min={50000}
              max={200000}
            />
          </div>

          <button
            className="bg-indigo-500 p-2 text-white"
            onClick={() => {
              editRole();
            }}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};
