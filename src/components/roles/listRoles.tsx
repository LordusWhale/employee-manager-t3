import { Modal, Table } from "@mantine/core";
import { api } from "../../utils/api";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { EditRole } from "./editRole";
import { roleSortMethods, RoleSortMethods } from "../../utils/sort/roleSort";
import type { department, role } from "@prisma/client";
import { DisplayRole } from "./displayRole";
type ListRoleProps = {
  roles:
    | (role & {
        department: department;
        _count: {
          employee: number;
        };
      })[]
    | undefined;
};

export const ListRoles: React.FC<ListRoleProps> = ({ roles }) => {
  const [roleId, setRoleId] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [sortMethod, setSortMethod] = useState<RoleSortMethods>("none");

 

  return (
    <>
      <Table withColumnBorders>
        <thead>
          <tr className="font-bold">
            <th
              className="hover:bg-indigo-200"
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev == "idAcending") return "idDecending";
                  return "idAcending";
                });
              }}
            >
              Id
            </th>
            <th
              className="hover:bg-indigo-200"
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev == "titleAcending") return "titleDecending";
                  return "titleAcending";
                });
              }}
            >
              Name
            </th>
            <th
              className="hover:bg-indigo-200"
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev == "departmentAcending")
                    return "departmentDecending";
                  return "departmentAcending";
                });
              }}
            >
              Department
            </th>
            <th
              className="hover:bg-indigo-200"
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev == "salaryAcending") return "salaryDecending";
                  return "salaryAcending";
                });
              }}
            >
              Salary
            </th>
            <th
              className="hover:bg-indigo-200"
              onClick={() => {
                setSortMethod((prev) => {
                  if (prev == "numberOfEmployeesAcending")
                    return "numberOfEmployeesDecending";
                  return "numberOfEmployeesAcending";
                });
              }}
            >
              Number of employees
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles?.sort(roleSortMethods[sortMethod].method).map((role) => (
           <DisplayRole role={role} setRoleId={setRoleId} setOpen={setOpen} />
          ))}
        </tbody>
      </Table>
      <Modal opened={open} centered onClose={() => setOpen(false)}>
        <EditRole roleId={roleId} setOpen={setOpen} />
      </Modal>
    </>
  );
};
