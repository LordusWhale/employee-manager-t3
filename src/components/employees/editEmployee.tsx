import { Input, Select } from "@mantine/core";
import { useState } from "react";
import { api } from "../../utils/api";

export const EditEmployee = ({
  id,
  revalidate,
  setOpen,
}: {
  id: number;
  revalidate: any;
  setOpen: Function;
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [empRole, setEmpRole] = useState<string | null>("");
  const [manager, setManager] = useState<string | null>("");
  const roles = api.role.getAll.useQuery();
  const employee = api.employee.getSingle.useQuery({ id });
  const managers = api.employee.getAll.useQuery();

  const createEmpDb = api.employee.update.useMutation({
    onSuccess: () => {
      revalidate.refetch();
      employee.refetch();
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const updateEmp = () => {
    let managerId = undefined;
    if (manager) {
      if (!isNaN(parseInt(manager))) {
        managerId = parseInt(manager);
      } else {
        managerId = null;
      }
    }
    console.log(managerId);

    createEmpDb.mutateAsync({
      id: id,
      firstName: firstName ? firstName : undefined,
      lastName: lastName ? lastName : undefined,
      role: empRole ? parseInt(empRole) : undefined,
      manager: managerId,
    });
  };
  return (
    <div className="flex flex-col gap-8">
      {roles.isLoading || managers.isLoading || employee.isLoading ? (
        <p>Loading...</p>
      ) : (
        employee.data && (
          <>
            <h1 className="text-center text-lg">Update Employee</h1>
            <Input.Wrapper label="First Name">
              <Input
                placeholder="First Name"
                defaultValue={employee.data?.first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Input.Wrapper>

            <Input.Wrapper label="Last Name">
              <Input
                placeholder="Last Name"
                defaultValue={employee.data?.last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Input.Wrapper>

            {roles.data && (
              <Select
                placeholder="Role"
                onChange={setEmpRole}
                defaultValue={employee.data?.role?.id.toString()}
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
                defaultValue={employee.data?.manager?.id.toString()}
                onChange={setManager}
                data={[
                  { value: "None", label: "No Manager" },
                  ...managers.data.map((manager) => {
                    if (manager.id === id) {
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
            <button
              className="bg-indigo-500 p-2 text-white"
              onClick={() => updateEmp()}
            >
              Save
            </button>
          </>
        )
      )}
    </div>
  );
};
