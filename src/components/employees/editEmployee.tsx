import { Input, Loader, Select } from "@mantine/core";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { api } from "../../utils/api";

type EditEmployeeProps = {
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditEmployee: React.FC<EditEmployeeProps> = ({ id, setOpen }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [empRole, setEmpRole] = useState<string | null>("");
  const [manager, setManager] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const roles = api.role.getAll.useQuery();
  const employee = api.employee.getSingle.useQuery({ id });
  const managers = api.employee.getAll.useQuery();
  const refetch = api.employee.getAll.useQuery().refetch;
  const createEmpDb = api.employee.update.useMutation({
    onSuccess: async () => {
      await refetch().catch((err) => {
        console.log(err);
      });
      setLoading(false);
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
    setLoading(true);
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
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
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
            <div className="flex w-full items-center justify-center">
              {loading ? (
                <Loader />
              ) : (
                <button
                  className="w-full bg-indigo-500 p-2 text-white"
                  onClick={updateEmp}
                >
                  Save
                </button>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};
