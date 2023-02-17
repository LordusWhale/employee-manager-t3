import { Input, Loader, Select } from "@mantine/core";
import type { Dispatch, SetStateAction } from "react";
import { api } from "../../utils/api";
interface EmployeeEditProps {
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setEmpRole: Dispatch<SetStateAction<string | null>>;
  setManager: Dispatch<SetStateAction<string | null>>;
  empId?: number;
  type: "edit" | "create";
  Button: React.ReactNode
}

export const EmployeeForm: React.FC<EmployeeEditProps> = ({
  setFirstName,
  setLastName,
  setEmpRole,
  setManager,
  empId,
  type,
  Button,
}) => {
  const employee = api.employee.getSingle.useQuery(
    { id: empId || -1 },
    { enabled: type === "edit" }
  );
  const managers = api.employee.getAll.useQuery();
  const roles = api.role.getAll.useQuery();
  return (
    <div className="flex flex-col gap-8">
      {roles.isLoading ||
      managers.isLoading ||
      (employee.isLoading && type === "edit") ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <h1 className="text-center text-lg">
            {type === "edit" ? "Edit employee" : "Add Employee"}
          </h1>
          <Input.Wrapper label="First Name">
            <Input
              placeholder="First Name"
              defaultValue={employee?.data?.first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Input.Wrapper>

          <Input.Wrapper label="Last Name">
            <Input
              placeholder="Last Name"
              defaultValue={employee?.data?.last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Input.Wrapper>

          {roles.data && (
            <Select
              placeholder="Role"
              onChange={setEmpRole}
              defaultValue={employee?.data?.role?.id.toString()}
              label="Role"
              data={[
                ...roles.data.map((role) => {
                  return {
                    label: role.title,
                    value: `${role.id}`,
                  };
                }),
              ]}
            ></Select>
          )}
          {managers.data && (
            <Select
              searchable
              nothingFound="No employees found"
              placeholder="Manager"
              label="Manager"
              defaultValue={employee?.data?.manager?.id.toString()}
              onChange={()=>setManager}
              data={[
                { value: "None", label: "No Manager" },
                ...managers.data.map((manager) => {
                  if (manager.id === empId) {
                    return {
                      value: `${manager.id}`,
                      label: `${manager.first_name} ${manager.last_name} (Self)`,
                    };
                  }
                  return {
                    value: `${manager.id}`,
                    label: `${manager.first_name} ${manager.last_name} (${manager.role?.title})`,
                  };
                }),
              ]}
            ></Select>
          )}
        </div>
      )}
      {Button}
    </div>
  );
};
