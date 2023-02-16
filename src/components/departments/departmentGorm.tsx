import { Input, Loader } from "@mantine/core";
import type { Dispatch, SetStateAction } from "react";
import { api } from "../../utils/api";

interface DepartmentFormProps {
  setName: Dispatch<SetStateAction<string>>;
  departmentId?: number;
  type: "add" | "edit";
  Button: React.ReactNode
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({
  setName,
  type,
  departmentId,
  Button
}) => {
  const department = api.department.getSingle.useQuery(
    { id: departmentId || -1 },
    { enabled: type === "edit" }
  );
  return (
    <div className="flex flex-col gap-8">
      {department.isLoading && type === "edit" ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Input.Wrapper label="Name of department">
          <Input
            placeholder="Name of department"
            defaultValue={department?.data?.name}
            onChange={(e) => setName(e.target.value)}
          />
        </Input.Wrapper>
      )}
      {Button}
    </div>
  );
};
