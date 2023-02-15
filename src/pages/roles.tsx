import { Modal } from "@mantine/core";
import { NextPage } from "next";
import { api } from "../utils/api";
import { useState } from "react";
import { ListRoles } from "../components/roles/listRoles";
import { AddRole } from "../components/roles/addRole";

const Roles: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const roles = api.role.getAll.useQuery();
  return (
    <div>
      <button
        className="absolute right-0 mt-8 mr-8 rounded-md bg-indigo-400 px-10 py-4 text-white"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add role
      </button>
      <div className="flex w-full flex-col justify-center py-2 px-10 ">
        {roles.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full py-20">
            {" "}
            <ListRoles roles={roles.data} />
          </div>
        )}
      </div>
      <Modal
        centered
        opened={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <AddRole setOpen={setOpen} />
      </Modal>
    </div>
  );
};

export default Roles;
