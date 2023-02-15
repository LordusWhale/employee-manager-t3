import { Input, Loader, Select, Slider } from "@mantine/core";
import { useState } from "react";
import { api } from "../../utils/api";
import type { Dispatch, SetStateAction } from "react";
type EditRoleProps = {
  roleId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditRole: React.FC<EditRoleProps> = ({ roleId, setOpen }) => {
  const role = api.role.getSingleRole.useQuery({ id: roleId });
  const refetch = api.role.getAll.useQuery().refetch;
  const addRole = api.role.update.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
      role.refetch();
      setLoading(false);
      setOpen(false);
    },
  });
  const departments = api.department.getAll.useQuery();
  const [title, setTitle] = useState<string>("");
  const [department, setDepartment] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [salary, setSalary] = useState<number>(50000);
  const updateRole = () => {
    let departmentId = undefined;
    setLoading(true);
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
      {role.isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      )}
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
          <div className="flex w-full items-center justify-center">
            {loading ? (
              <Loader />
            ) : (
              <button
                className="w-full bg-indigo-500 p-2 text-white"
                onClick={updateRole}
              >
                Save
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
