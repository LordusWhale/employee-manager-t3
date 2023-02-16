import { Input, Loader, Select, Slider } from "@mantine/core";
import { api } from "../../utils/api";
import type { Dispatch, SetStateAction } from "react";

interface RoleFormProps {
  setTitle: Dispatch<SetStateAction<string>>;
  setDepartment: Dispatch<SetStateAction<string | null>>;
  setSalary: Dispatch<SetStateAction<number>>;
  type: "add" | "edit";
  roleId?: number;
  Button: React.ReactNode;
}

export const RoleForm: React.FC<RoleFormProps> = ({
  setTitle,
  setSalary,
  setDepartment,
  Button,
  type,
  roleId,
}) => {
  const role = api.role.getSingleRole.useQuery(
    { id: roleId || -1 },
    { enabled: type === "edit" }
  );
  const departments = api.department.getAll.useQuery();
  return (
    <div className="flex flex-col gap-8">
      {departments.isLoading && type === "edit" ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <Input.Wrapper label="Name of department">
            <Input
              defaultValue={role?.data?.title}
              placeholder="Title of role"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Input.Wrapper>
          {departments.data && (
            <Select
              label="Department"
              defaultValue={role?.data?.department.id.toString()}
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
              defaultValue={
                role.data ? parseInt(role?.data?.salary?.toString()) : 50000
              }
              onChange={setSalary}
              placeholder="Salary"
              min={50000}
              max={200000}
            />
          </div>
          {Button}
        </>
      )}
    </div>
  );
};
