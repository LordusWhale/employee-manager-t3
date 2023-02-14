import { Input, Select } from "@mantine/core";
import { useState } from "react";
import { api } from "../../utils/api";

export const AddEmployee = ({
  setOpen,
  revalidate,
}: {
  setOpen: Function;
  revalidate: any;
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [empRole, setEmpRole] = useState<string | null>("");
  const [manager, setManager] = useState<string | null>("");
  const roles = api.role.getAll.useQuery();
  const managers = api.employee.getAll.useQuery();

  const createEmpDb = api.employee.add.useMutation({
    onSuccess: () => {
      revalidate.refetch();
      setOpen(false);
    },
  });
  const createEmp = () => {
    if (!empRole) return;
    createEmpDb.mutateAsync({
      firstName: firstName,
      lastName: lastName,
      role: parseInt(empRole),
      manager: manager ? parseInt(manager) : undefined,
    });
  };
  return (
    <div className="flex flex-col gap-8">
      {roles.isLoading || managers.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-center text-lg">Add Employee</h1>
          <Input.Wrapper label="First Name">
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Input.Wrapper>

          <Input.Wrapper label="Last Name">
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Input.Wrapper>

          {roles.data && (
            <Select
              placeholder="Role"
              onChange={setEmpRole}
              label="Role"
              data={[
                ...roles.data.map((role) => {
                  return {
                    value: `${role.id}`,
                    label: role.title,
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
              onChange={setManager}
              data={[
                { value: "", label: "No Manager" },
                ...managers.data.map((manager) => {
                  return {
                    value: `${manager.id}`,
                    label: `${manager.first_name} ${manager?.last_name} (${manager?.role?.title})`,
                  };
                }),
              ]}
            ></Select>
          )}
          <button className="bg-indigo-500 p-2 text-white" onClick={createEmp}>
            Save
          </button>
        </>
      )}
    </div>
  );
};
